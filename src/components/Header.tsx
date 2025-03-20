
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ThemeToggle } from "./ThemeToggle";
import { NeumorphButton } from "./NeumorphButton";
import { Menu, X } from "lucide-react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;
  
  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Features", path: "/features" },
    { name: "Pricing", path: "/pricing" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <span className="font-semibold text-xl text-primary">RentalAI</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <ul className="flex space-x-6">
            {navLinks.map((link) => (
              <li key={link.path}>
                <Link
                  to={link.path}
                  className={`relative py-2 text-base font-medium transition-colors duration-300 hover:text-primary ${
                    isActive(link.path)
                      ? "text-primary after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-primary"
                      : "text-foreground"
                  }`}
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
          
          <div className="flex items-center space-x-4">
            <ThemeToggle />
            <Link to="/login">
              <NeumorphButton variant="secondary" size="sm">
                Log in
              </NeumorphButton>
            </Link>
            <Link to="/signup">
              <NeumorphButton variant="primary" size="sm">
                Sign up
              </NeumorphButton>
            </Link>
          </div>
        </nav>

        {/* Mobile Navigation */}
        <div className="md:hidden flex items-center space-x-4">
          <ThemeToggle />
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="neumorph p-2 rounded-lg"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-background/95 backdrop-blur-md animate-fade-in">
          <div className="container mx-auto px-4 py-4">
            <ul className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className={`block py-2 text-lg font-medium transition-colors duration-300 ${
                      isActive(link.path) ? "text-primary" : "text-foreground"
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
              <li className="pt-4 flex flex-col space-y-3">
                <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                  <NeumorphButton variant="secondary" className="w-full">
                    Log in
                  </NeumorphButton>
                </Link>
                <Link to="/signup" onClick={() => setIsMenuOpen(false)}>
                  <NeumorphButton variant="primary" className="w-full">
                    Sign up
                  </NeumorphButton>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
