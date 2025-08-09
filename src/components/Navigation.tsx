import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import { Menu, X, FileText, Calculator, Users, Phone, Home, Upload } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { AuthDialog } from "./AuthDialog";
import taxesLogo from "@/assets/taxes-logo.png";

export const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showAuthDialog, setShowAuthDialog] = useState(false);
  const location = useLocation();
  const { user, signOut } = useAuth();

  const handleAuthClick = () => {
    if (user) {
      signOut();
    } else {
      setShowAuthDialog(true);
    }
  };

  const navItems = [
    { name: "Home", href: "/", icon: Home },
    {
      name: "Automate ITR Data Extract",
      href: "/automate-itr",
      icon: Calculator,
      subItems: [
        { name: "ITR-1 Form", href: "/automate-itr/itr-1" },
        { name: "ITR-2 Form", href: "/automate-itr/itr-2" },
        { name: "ITR-3 Form", href: "/automate-itr/itr-3" },
        { name: "ITR-4 Form", href: "/automate-itr/itr-4" },
      ]
    },
    {
      name: "Services",
      href: "/services",
      icon: Users,
      subItems: [
        { name: "Tax Filing", href: "/services/tax-filing" },
        { name: "Tax Planning", href: "/services/tax-planning" },
        { name: "Business Registration", href: "/services/business-registration" },
        { name: "GST Services", href: "/services/gst" },
      ]
    },
    { name: "Contact Us", href: "/contact", icon: Phone },
  ];

  return (
    <>
      <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur border-b">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2">
              <img src={taxesLogo} alt="TaxES" className="h-10 w-auto" />
            </Link>

            {/* Desktop Navigation */}
            <NavigationMenu className="hidden lg:flex">
              <NavigationMenuList>
                {navItems.map((item) => (
                  <NavigationMenuItem key={item.name}>
                    {item.subItems ? (
                      <>
                        <NavigationMenuTrigger className="flex items-center gap-2">
                          <item.icon className="h-4 w-4" />
                          {item.name}
                        </NavigationMenuTrigger>
                        <NavigationMenuContent>
                          <div className="grid w-[400px] gap-3 p-4">
                            {item.subItems.map((subItem) => (
                              <Link
                                key={subItem.name}
                                to={subItem.href}
                                className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                              >
                                <div className="text-sm font-medium leading-none">
                                  {subItem.name}
                                </div>
                              </Link>
                            ))}
                          </div>
                        </NavigationMenuContent>
                      </>
                    ) : (
                      <Link
                        to={item.href}
                        className="flex items-center gap-2 px-4 py-2 text-sm font-medium transition-colors hover:text-primary"
                      >
                        <item.icon className="h-4 w-4" />
                        {item.name}
                      </Link>
                    )}
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>

            {/* Auth Button */}
            <div className="hidden lg:flex items-center gap-4">
              {user && (
                <Link to="/dashboard">
                  <Button variant="outline" size="sm" className="flex items-center gap-2">
                    <Upload className="h-4 w-4" />
                    Dashboard
                  </Button>
                </Link>
              )}
              <Button onClick={handleAuthClick} size="sm">
                {user ? "Sign Out" : "Sign In"}
              </Button>
            </div>

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>

          {/* Mobile Navigation */}
          {isOpen && (
            <div className="lg:hidden border-t">
              <div className="px-2 pt-2 pb-3 space-y-1">
                {navItems.map((item) => (
                  <div key={item.name}>
                    <Link
                      to={item.href}
                      className="flex items-center gap-2 px-3 py-2 text-base font-medium rounded-md hover:bg-accent"
                      onClick={() => setIsOpen(false)}
                    >
                      <item.icon className="h-5 w-5" />
                      {item.name}
                    </Link>
                    {item.subItems && (
                      <div className="ml-6 space-y-1">
                        {item.subItems.map((subItem) => (
                          <Link
                            key={subItem.name}
                            to={subItem.href}
                            className="block px-3 py-2 text-sm font-medium rounded-md hover:bg-accent"
                            onClick={() => setIsOpen(false)}
                          >
                            {subItem.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
                <div className="pt-4 border-t">
                  {user && (
                    <Link
                      to="/dashboard"
                      className="flex items-center gap-2 px-3 py-2 text-base font-medium rounded-md hover:bg-accent"
                      onClick={() => setIsOpen(false)}
                    >
                      <Upload className="h-5 w-5" />
                      Dashboard
                    </Link>
                  )}
                  <Button 
                    onClick={handleAuthClick} 
                    className="w-full mt-2"
                    size="sm"
                  >
                    {user ? "Sign Out" : "Sign In"}
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>

      <AuthDialog 
        open={showAuthDialog} 
        onOpenChange={setShowAuthDialog}
        mode="login"
        onModeChange={() => {}}
      />
    </>
  );
};