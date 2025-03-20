
import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="w-full py-8 bg-background border-t border-muted/30">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="mb-6 md:mb-0">
            <Link to="/" className="flex items-center space-x-2">
              <span className="font-semibold text-xl text-primary">RentalAI</span>
            </Link>
            <p className="text-sm text-muted-foreground mt-2">
              Simplified rental management for Uganda
            </p>
          </div>
          
          <div className="flex flex-col md:flex-row items-center md:space-x-8 space-y-4 md:space-y-0">
            <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2">
              <Link to="/privacy" className="text-sm text-muted-foreground hover:text-primary transition-colors duration-300">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-sm text-muted-foreground hover:text-primary transition-colors duration-300">
                Terms of Service
              </Link>
              <Link to="/contact" className="text-sm text-muted-foreground hover:text-primary transition-colors duration-300">
                Contact
              </Link>
            </nav>
          </div>
        </div>
        
        <div className="mt-8 pt-6 border-t border-muted/30 flex flex-col items-center justify-center">
          <p className="text-sm text-muted-foreground text-center">
            &copy; {currentYear} RentalAI. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground mt-2 text-center">
            Designed for use in Uganda. All prices displayed in UGX.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
