import { Button } from "@/components/ui/button";
import { useState } from "react";
import { AuthDialog } from "./AuthDialog";
import { Menu, X, LogOut } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

export const Header = () => {
  const [showAuth, setShowAuth] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, signOut } = useAuth();

  const handleAuthClick = (mode: 'login' | 'signup') => {
    setAuthMode(mode);
    setShowAuth(true);
    setIsMobileMenuOpen(false);
  };

  const handleSignOut = async () => {
    await signOut();
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <span className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent hover:from-accent hover:to-primary transition-all duration-500">
              TaxES
            </span>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors duration-300 font-medium">
              Home
            </a>
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors duration-300 font-medium">
              Automate ITR Data Extract
            </a>
            <a href="#services" className="text-muted-foreground hover:text-primary transition-colors duration-300 font-medium">
              Services
            </a>
          </nav>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-4">
                <span className="text-sm text-muted-foreground">
                  Welcome, {user.email}
                </span>
                <Button 
                  variant="outline" 
                  onClick={handleSignOut}
                  className="hover:bg-destructive hover:text-destructive-foreground transition-all duration-300"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Sign Out
                </Button>
              </div>
            ) : (
              <>
                <Button 
                  variant="ghost" 
                  onClick={() => handleAuthClick('login')}
                  className="hover:bg-primary/10 transition-all duration-300"
                >
                  Login
                </Button>
                <Button 
                  onClick={() => handleAuthClick('signup')}
                  className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white transition-all duration-300 hover:shadow-lg"
                >
                  Sign Up
                </Button>
              </>
            )}
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
            <nav className="px-4 pt-2 pb-6 space-y-2">
              <a href="#" className="block px-3 py-2 text-base font-medium text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-md transition-all duration-300">
                Home
              </a>
              <a href="#" className="block px-3 py-2 text-base font-medium text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-md transition-all duration-300">
                Automate ITR Data Extract
              </a>
              <a href="#services" className="block px-3 py-2 text-base font-medium text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-md transition-all duration-300">
                Services
              </a>
            </nav>

            {/* Mobile Auth Buttons */}
            <div className="px-4 py-4 border-t border-border space-y-2">
              {user ? (
                <div className="space-y-2">
                  <div className="px-3 py-2 text-sm text-muted-foreground">
                    Welcome, {user.email}
                  </div>
                  <Button 
                    variant="outline" 
                    onClick={handleSignOut}
                    className="w-full justify-start hover:bg-destructive hover:text-destructive-foreground transition-all duration-300"
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Sign Out
                  </Button>
                </div>
              ) : (
                <>
                  <Button 
                    variant="ghost" 
                    onClick={() => handleAuthClick('login')}
                    className="w-full justify-start hover:bg-primary/10 transition-all duration-300"
                  >
                    Login
                  </Button>
                  <Button 
                    onClick={() => handleAuthClick('signup')}
                    className="w-full bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white transition-all duration-300"
                  >
                    Sign Up
                  </Button>
                </>
              )}
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