import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle, FileText, Shield, Zap } from "lucide-react";

export const Hero = () => {
  return (
    <section className="relative py-20 md:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/5" />
      
      <div className="container relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
                <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  AI-Powered
                </span>
                <br />
                Tax Filing Made
                <br />
                <span className="text-foreground">Simple</span>
              </h1>
              
              <p className="text-xl text-muted-foreground max-w-lg">
                Upload your documents, let our AI handle the rest. Get your ITR filed in minutes, not hours.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-gradient-to-r from-primary to-accent hover:shadow-lg transition-all duration-300">
                Start Filing Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button variant="outline" size="lg">
                Watch Demo
              </Button>
            </div>

            <div className="flex items-center space-x-6 text-sm text-muted-foreground">
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span>100% Secure</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span>Expert Reviewed</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span>E-Filing Ready</span>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="bg-card p-6 rounded-xl border shadow-sm">
                  <FileText className="h-8 w-8 text-primary mb-3" />
                  <h3 className="font-semibold mb-2">Upload Documents</h3>
                  <p className="text-sm text-muted-foreground">
                    PAN, Aadhar, Form 16 & Bank Statements
                  </p>
                </div>
                
                <div className="bg-card p-6 rounded-xl border shadow-sm">
                  <Zap className="h-8 w-8 text-accent mb-3" />
                  <h3 className="font-semibold mb-2">AI Processing</h3>
                  <p className="text-sm text-muted-foreground">
                    Automatic data extraction & validation
                  </p>
                </div>
              </div>
              
              <div className="space-y-4 mt-8">
                <div className="bg-card p-6 rounded-xl border shadow-sm">
                  <Shield className="h-8 w-8 text-green-500 mb-3" />
                  <h3 className="font-semibold mb-2">Secure & Compliant</h3>
                  <p className="text-sm text-muted-foreground">
                    Bank-grade security & IT dept compliance
                  </p>
                </div>
                
                <div className="bg-primary p-6 rounded-xl text-white">
                  <div className="text-2xl font-bold mb-1">5 Min</div>
                  <p className="text-primary-foreground/80">Average filing time</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};