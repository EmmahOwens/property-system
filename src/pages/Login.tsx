
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AuthForm from "@/components/AuthForm";
import { toast } from "@/components/ui/sonner";

const Login = () => {
  const navigate = useNavigate();
  
  const handleLogin = (data: any) => {
    console.log("Login data:", data);
    
    // In a real application, this would verify credentials with Auth0
    toast.success("Login successful!", {
      description: "Redirecting to your dashboard...",
    });
    
    // Simulate redirect after login
    setTimeout(() => {
      navigate("/tenant-dashboard");
    }, 1500);
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto">
            <h1 className="text-3xl font-bold text-center mb-8">Log In to Your Account</h1>
            <AuthForm type="login" onSubmit={handleLogin} />
            
            <div className="mt-6 text-center">
              <p className="text-muted-foreground">
                Don't have an account?{" "}
                <button 
                  onClick={() => navigate("/signup")}
                  className="text-primary font-medium hover:underline"
                >
                  Sign up
                </button>
              </p>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Login;
