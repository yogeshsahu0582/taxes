import { Button } from "@/components/ui/button";
import { useState } from "react";
import { AuthDialog } from "./AuthDialog";
import { Menu, X } from "lucide-react";

export const Header = () => {
  const [showAuth, setShowAuth] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleAuthClick = (mode: 'login' | 'signup') => {
    setAuthMode(mode);
    setShowAuth(true);
  };

  return (
    <>
      <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          {/* Animated Logo */}
          <div className="flex items-center space-x-3 group cursor-pointer">
            <div className="relative h-10 w-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center transform transition-all duration-300 group-hover:scale-110 group-hover:rotate-3 shadow-lg group-hover:shadow-xl">
              <span className="text-white font-bold text-xl relative z-10">T</span>
              <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-primary to-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm"></div>
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                TaxES
              </span>
              <span className="text-xs text-muted-foreground -mt-1 hidden sm:block">AI Tax Filing</span>
            </div>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-foreground/70 hover:text-primary transition-colors duration-200 font-medium hover:scale-105 transform">
              Features
            </a>
            <a href="#pricing" className="text-foreground/70 hover:text-primary transition-colors duration-200 font-medium hover:scale-105 transform">
              Pricing
            </a>
            <a href="#about" className="text-foreground/70 hover:text-primary transition-colors duration-200 font-medium hover:scale-105 transform">
              About
            </a>
          </nav>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Button 
              variant="ghost" 
              onClick={() => handleAuthClick('login')}
              className="hover:bg-primary/10 hover:text-primary transition-all duration-200"
            >
              Login
            </Button>
            <Button 
              onClick={() => handleAuthClick('signup')}
              className="bg-gradient-to-r from-primary to-accent hover:shadow-lg hover:shadow-primary/25 transition-all duration-300 transform hover:scale-105"
            >
              Sign Up
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t bg-background/95 backdrop-blur">
            <div className="container py-4 space-y-4">
              <nav className="flex flex-col space-y-3">
                <a 
                  href="#features" 
                  className="text-foreground/70 hover:text-primary transition-colors duration-200 font-medium py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Features
                </a>
                <a 
                  href="#pricing" 
                  className="text-foreground/70 hover:text-primary transition-colors duration-200 font-medium py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Pricing
                </a>
                <a 
                  href="#about" 
                  className="text-foreground/70 hover:text-primary transition-colors duration-200 font-medium py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  About
                </a>
              </nav>
              
              <div className="flex flex-col space-y-2 pt-4 border-t">
                <Button 
                  variant="ghost" 
                  onClick={() => {
                    handleAuthClick('login');
                    setIsMobileMenuOpen(false);
                  }}
                  className="justify-start hover:bg-primary/10 hover:text-primary"
                >
                  Login
                </Button>
                <Button 
                  onClick={() => {
                    handleAuthClick('signup');
                    setIsMobileMenuOpen(false);
                  }}
                  className="bg-gradient-to-r from-primary to-accent hover:shadow-lg justify-start"
                >
                  Sign Up
                </Button>
              </div>
            </div>
          </div>
        )}
      </header>

      <AuthDialog 
        open={showAuth} 
        onOpenChange={setShowAuth}
        mode={authMode}
        onModeChange={setAuthMode}
      />
    </>
  );
};