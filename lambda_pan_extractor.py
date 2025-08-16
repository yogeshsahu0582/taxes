import json
import boto3
import re
import csv
from io import StringIO
from urllib.parse import unquote_plus

# Initialize AWS clients
textract = boto3.client('textract')
s3 = boto3.client('s3')

def lambda_handler(event, context):
    """Lambda function triggered by S3 upload"""
    
    try:
        # Get S3 event details
        bucket = event['Records'][0]['s3']['bucket']['name']
        key = unquote_plus(event['Records'][0]['s3']['object']['key'])
        
        # Check if file matches criteria: prefix 'pan_card' and suffix '.jpg'
        if not (key.startswith('pan_card') and key.endswith('.jpg')):
            return {
                'statusCode': 200,
                'body': json.dumps('File does not match criteria - skipping')
            }
        
        print(f"Processing file: {key} from bucket: {bucket}")
        
        # Extract text using Textract
        lines = extract_text_from_s3(bucket, key)
        
        # Extract PAN details
        details = extract_pan_details(lines)
        
        # Save as CSV
        csv_key = save_to_csv(bucket, key, details)
        
        return {
            'statusCode': 200,
            'body': json.dumps({
                'message': 'PAN extraction completed successfully',
                'source_file': key,
                'output_file': csv_key,
                'extracted_data': details
            })
        }
        
    except Exception as e:
        print(f"Error: {str(e)}")
        return {
            'statusCode': 500,
            'body': json.dumps(f'Error processing file: {str(e)}')
        }

def extract_text_from_s3(bucket, key):
    """Extract text from S3 document using Textract"""
    response = textract.detect_document_text(
        Document={'S3Object': {'Bucket': bucket, 'Name': key}}
    )
    
    lines = []
    for item in response['Blocks']:
        if item['BlockType'] == 'LINE':
            lines.append(item['Text'])
    
    return lines

def extract_pan_details(lines):
    """Extract PAN card details from text lines"""
    # PAN number
    pan = None
    for line in lines:
        match = re.search(r'\b[A-Z]{5}[0-9]{4}[A-Z]\b', line)
        if match:
            pan = match.group()
            break
    
    # Name
    name = None
    for i, line in enumerate(lines):
        if "Name" in line and i + 1 < len(lines):
            name = lines[i + 1].strip()
            break
    
    # Father's Name
    father_name = None
    for i, line in enumerate(lines):
        if "Father" in line and i + 1 < len(lines):
            father_name = lines[i + 1].strip()
            break
    
    # Date of Birth
    dob = None
    for i, line in enumerate(lines):
        if "Date of Birth" in line:
            for offset in range(1, 4):
                if i + offset < len(lines):
                    candidate = lines[i + offset]
                    match = re.search(r'\b(\d{2})[/-]?(\d{2})[/-]?(\d{4})\b', candidate)
                    if match:
                        day, month, year = match.groups()
                        dob = f"{day}/{month}/{year}"
                        break
            break
    
    return {
        'pan_number': pan,
        'name': name,
        'father_name': father_name,
        'date_of_birth': dob
    }

def save_to_csv(bucket, source_key, details):
    """Save extracted details to CSV in S3"""
    # Create CSV content
    csv_buffer = StringIO()
    writer = csv.writer(csv_buffer)
    
    # Write header
    writer.writerow(['Field', 'Value'])
    
    # Write data
    writer.writerow(['PAN Number', details.get('pan_number', '')])
    writer.writerow(['Name', details.get('name', '')])
    writer.writerow(['Father Name', details.get('father_name', '')])
    writer.writerow(['Date of Birth', details.get('date_of_birth', '')])
    writer.writerow(['Source File', source_key])
    
    # Generate CSV filename
    csv_key = source_key.replace('.jpg', '_extracted.csv')
    
    # Upload CSV to S3
    s3.put_object(
        Bucket=bucket,
        Key=csv_key,
        Body=csv_buffer.getvalue(),
        ContentType='text/csv'
    )
    
    print(f"CSV saved as: {csv_key}")
    return csv_key