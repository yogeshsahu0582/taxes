import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Upload, 
  FileText, 
  CreditCard, 
  Building2, 
  Eye,
  CheckCircle,
  Clock,
  User
} from "lucide-react";
import { toast } from "sonner";

interface UploadedFile {
  id: string;
  name: string;
  type: string;
  file: File;
  uploadDate: Date;
}

export const Dashboard = () => {
  const { user, signOut } = useAuth();
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [selectedFile, setSelectedFile] = useState<UploadedFile | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const documentTypes = [
    {
      id: "aadhar",
      name: "Aadhar Card",
      icon: CreditCard,
      description: "Upload your Aadhar Card PDF",
      color: "text-blue-500"
    },
    {
      id: "bank",
      name: "Bank Statements / Passbook",
      icon: Building2,
      description: "Upload bank statements or passbook PDF",
      color: "text-green-500"
    },
    {
      id: "form16",
      name: "Form-16",
      icon: FileText,
      description: "Upload your Form-16 PDF",
      color: "text-orange-500"
    }
  ];

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>, docType: string) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (file.type !== "application/pdf") {
      toast.error("Please upload only PDF files");
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      toast.error("File size should be less than 10MB");
      return;
    }

    const newFile: UploadedFile = {
      id: Date.now().toString(),
      name: file.name,
      type: docType,
      file,
      uploadDate: new Date()
    };

    setUploadedFiles(prev => [...prev, newFile]);
    toast.success("File uploaded successfully!");
  };

  const handlePreview = (file: UploadedFile) => {
    const url = URL.createObjectURL(file.file);
    setPreviewUrl(url);
    setSelectedFile(file);
  };

  const handleSignOut = async () => {
    const { error } = await signOut();
    if (error) {
      toast.error("Error signing out");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/10 to-accent/5">
      {/* Header */}
      <header className="border-b bg-background/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              TaxES
            </h1>
            <Badge variant="secondary">Dashboard</Badge>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <User className="h-4 w-4" />
              <span className="text-sm text-muted-foreground">
                Welcome, {user?.email}
              </span>
            </div>
            <Button variant="outline" size="sm" onClick={handleSignOut}>
              Sign Out
            </Button>
          </div>
        </div>
      </header>

      <div className="container py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Upload Section */}
          <div className="lg:col-span-2 space-y-6">
            <div>
              <h2 className="text-3xl font-bold mb-2">Upload Documents</h2>
              <p className="text-muted-foreground">
                Upload your tax documents to get started with automated ITR filing
              </p>
            </div>

            <div className="grid gap-6">
              {documentTypes.map((docType) => {
                const uploadedFile = uploadedFiles.find(f => f.type === docType.id);
                
                return (
                  <Card key={docType.id} className="group hover:shadow-lg transition-all duration-300">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className={`p-3 rounded-lg bg-gradient-to-br from-primary/10 to-accent/10`}>
                            <docType.icon className={`h-6 w-6 ${docType.color}`} />
                          </div>
                          <div>
                            <CardTitle className="text-lg">{docType.name}</CardTitle>
                            <CardDescription>{docType.description}</CardDescription>
                          </div>
                        </div>
                        
                        {uploadedFile ? (
                          <div className="flex items-center space-x-2">
                            <CheckCircle className="h-5 w-5 text-green-500" />
                            <Badge variant="secondary" className="bg-green-100 text-green-700">
                              Uploaded
                            </Badge>
                          </div>
                        ) : (
                          <Badge variant="outline">
                            <Clock className="h-3 w-3 mr-1" />
                            Pending
                          </Badge>
                        )}
                      </div>
                    </CardHeader>
                    
                    <CardContent>
                      {uploadedFile ? (
                        <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                          <div>
                            <p className="font-medium text-sm">{uploadedFile.name}</p>
                            <p className="text-xs text-muted-foreground">
                              Uploaded on {uploadedFile.uploadDate.toLocaleDateString()}
                            </p>
                          </div>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handlePreview(uploadedFile)}
                            className="flex items-center space-x-2"
                          >
                            <Eye className="h-4 w-4" />
                            <span>Preview</span>
                          </Button>
                        </div>
                      ) : (
                        <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center group-hover:border-primary/50 transition-colors">
                          <Upload className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                          <p className="text-sm font-medium mb-2">Upload PDF Document</p>
                          <p className="text-xs text-muted-foreground mb-4">
                            Click to browse or drag and drop (Max 10MB)
                          </p>
                          <label htmlFor={`upload-${docType.id}`} className="cursor-pointer">
                            <Button variant="outline" size="sm" asChild>
                              <span>Choose File</span>
                            </Button>
                          </label>
                          <input
                            id={`upload-${docType.id}`}
                            type="file"
                            accept=".pdf"
                            className="hidden"
                            onChange={(e) => handleFileUpload(e, docType.id)}
                          />
                        </div>
                      )}
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {uploadedFiles.length > 0 && (
              <Card className="mt-8">
                <CardHeader>
                  <CardTitle>Ready to Process</CardTitle>
                  <CardDescription>
                    All documents uploaded successfully. Ready for ITR processing.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button size="lg" className="w-full bg-gradient-to-r from-primary to-accent">
                    Start ITR Processing
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Preview Section */}
          <div className="space-y-6">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Eye className="h-5 w-5" />
                  <span>Document Preview</span>
                </CardTitle>
                <CardDescription>
                  {selectedFile ? `Viewing: ${selectedFile.name}` : "Select a document to preview"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {previewUrl ? (
                  <div className="space-y-4">
                    <iframe
                      src={previewUrl}
                      className="w-full h-96 border rounded-lg"
                      title="Document Preview"
                    />
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full"
                      onClick={() => {
                        setPreviewUrl(null);
                        setSelectedFile(null);
                      }}
                    >
                      Close Preview
                    </Button>
                  </div>
                ) : (
                  <div className="h-96 flex items-center justify-center border-2 border-dashed border-muted-foreground/25 rounded-lg">
                    <div className="text-center">
                      <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <p className="text-sm text-muted-foreground">
                        Upload and select a document to preview
                      </p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};