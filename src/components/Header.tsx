import { Button } from "@/components/ui/button";
import { useState } from "react";
import { AuthDialog } from "./AuthDialog";

export const Header = () => {
  const [showAuth, setShowAuth] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');

  const handleAuthClick = (mode: 'login' | 'signup') => {
    setAuthMode(mode);
    setShowAuth(true);
  };

  return (
    <>
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <span className="text-white font-bold text-lg">T</span>
            </div>
            <span className="text-2xl font-bold text-primary">TaxES</span>
          </div>
          
          <nav className="hidden md:flex items-center space-x-6">
            <a href="#features" className="text-foreground/60 hover:text-foreground transition-colors">
              Features
            </a>
            <a href="#pricing" className="text-foreground/60 hover:text-foreground transition-colors">
              Pricing
            </a>
            <a href="#about" className="text-foreground/60 hover:text-foreground transition-colors">
              About
            </a>
          </nav>

          <div className="flex items-center space-x-4">
            <Button 
              variant="ghost" 
              onClick={() => handleAuthClick('login')}
              className="hidden sm:inline-flex"
            >
              Login
            </Button>
            <Button 
              onClick={() => handleAuthClick('signup')}
              className="bg-gradient-to-r from-primary to-accent hover:shadow-lg transition-all duration-300"
            >
              Sign Up
            </Button>
          </div>
        </div>
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