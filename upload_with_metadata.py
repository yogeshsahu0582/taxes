import boto3
import os
import json

s3 = boto3.client('s3')
bucket_name = 'ocrdocstorage'

def detect_doc_type(filename):
    """Detect document type based on filename"""
    filename_lower = filename.lower()
    
    if 'pan' in filename_lower:
        return 'pan'
    elif 'form16' in filename_lower or 'form_16' in filename_lower:
        return 'form16'
    elif 'salary' in filename_lower or 'payslip' in filename_lower:
        return 'salary'
    elif 'aadhar' in filename_lower or 'aadhaar' in filename_lower:
        return 'aadhar'
    else:
        # Default or ask user
        print(f"Cannot auto-detect type for: {filename}")
        doc_type = input("Enter document type (pan/form16/salary/aadhar): ").strip().lower()
        return doc_type if doc_type in ['pan', 'form16', 'salary', 'aadhar'] else 'unknown'

def upload_with_metadata(local_path, s3_key, doc_type):
    """Upload file with document type metadata"""
    try:
        # Upload with metadata
        s3.upload_file(
            local_path, 
            bucket_name, 
            s3_key,
            ExtraArgs={
                'Metadata': {
                    'doc-type': doc_type,
                    'original-filename': os.path.basename(local_path)
                }
            }
        )
        print(f"✅ Uploaded: {s3_key} (type: {doc_type})")
        return True
    except Exception as e:
        print(f"❌ Failed to upload {s3_key}: {e}")
        return False

def upload_document(local_path, custom_s3_key=None):
    """Upload single document with auto-detection"""
    if not os.path.exists(local_path):
        print(f"❌ File not found: {local_path}")
        return False
    
    # Use custom key or filename
    s3_key = custom_s3_key or os.path.basename(local_path)
    
    # Detect document type
    doc_type = detect_doc_type(os.path.basename(local_path))
    
    # Upload with metadata
    return upload_with_metadata(local_path, s3_key, doc_type)

def get_document_metadata(s3_key):
    """Get document metadata from S3"""
    try:
        response = s3.head_object(Bucket=bucket_name, Key=s3_key)
        metadata = response.get('Metadata', {})
        return metadata.get('doc-type', 'unknown')
    except Exception as e:
        print(f"Error getting metadata for {s3_key}: {e}")
        return 'unknown'

if __name__ == "__main__":
    # Example uploads
    documents = [
        r'D:\Programming\Major Project\Shivank_Data\pan_card_id32057.jpg'
    ]
    
    for doc_path in documents:
        if os.path.exists(doc_path):
            upload_document(doc_path)
        else:
            print(f"Skipping non-existent file: {doc_path}")
    
    # List files with their types
    print("\n📁 Uploaded documents:")
    try:
        response = s3.list_objects_v2(Bucket=bucket_name)
        for obj in response.get('Contents', []):
            doc_type = get_document_metadata(obj['Key'])
            print(f"  - {obj['Key']} (type: {doc_type})")
    except Exception as e:
        print(f"Error listing files: {e}")