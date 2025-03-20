
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { NeumorphButton } from "@/components/NeumorphButton";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="max-w-md w-full text-center animate-fade-in">
        <div className="neumorph inline-flex items-center justify-center p-8 rounded-full mb-6 mx-auto">
          <h1 className="text-5xl font-bold text-primary">404</h1>
        </div>
        <h2 className="text-2xl font-bold mb-4">Page Not Found</h2>
        <p className="text-muted-foreground mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        
        <NeumorphButton
          variant="primary"
          onClick={() => navigate("/")}
          className="mx-auto"
        >
          Return to Home
        </NeumorphButton>
      </div>
    </div>
  );
};

export default NotFound;
