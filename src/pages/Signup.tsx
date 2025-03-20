
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AuthForm from "@/components/AuthForm";
import { NeumorphCard } from "@/components/NeumorphCard";
import { NeumorphButton } from "@/components/NeumorphButton";
import { toast } from "@/components/ui/sonner";
import { User, Building } from "lucide-react";

type UserType = "tenant" | "landlord" | null;

const Signup = () => {
  const navigate = useNavigate();
  const [userType, setUserType] = useState<UserType>(null);
  
  const handleSignup = (data: any) => {
    console.log("Signup data:", data);
    
    // In a real application, this would create an account with Auth0
    toast.success("Account created successfully!", {
      description: "Please check your email to verify your account.",
    });
    
    // Simulate redirect after signup
    setTimeout(() => {
      navigate("/login");
    }, 1500);
  };
  
  if (!userType) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        
        <main className="flex-grow pt-24 pb-16">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto">
              <h1 className="text-3xl font-bold text-center mb-8">Create an Account</h1>
              <p className="text-muted-foreground text-center mb-8">
                Select your account type to get started with RentalAI
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <NeumorphCard 
                  className="p-8 cursor-pointer hover:translate-y-[-5px] transition-all duration-300"
                  onClick={() => setUserType("tenant")}
                >
                  <div className="flex flex-col items-center text-center">
                    <div className="p-4 neumorph rounded-full bg-primary/10 mb-4">
                      <User className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">I'm a Tenant</h3>
                    <p className="text-muted-foreground mb-4">
                      Looking for a place to rent or managing your current rental
                    </p>
                    <NeumorphButton variant="primary" className="mt-2 w-full">
                      Continue as Tenant
                    </NeumorphButton>
                  </div>
                </NeumorphCard>
                
                <NeumorphCard 
                  className="p-8 cursor-pointer hover:translate-y-[-5px] transition-all duration-300"
                  onClick={() => setUserType("landlord")}
                >
                  <div className="flex flex-col items-center text-center">
                    <div className="p-4 neumorph rounded-full bg-primary/10 mb-4">
                      <Building className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">I'm a Landlord</h3>
                    <p className="text-muted-foreground mb-4">
                      Managing properties and tenants in Uganda
                    </p>
                    <NeumorphButton variant="primary" className="mt-2 w-full">
                      Continue as Landlord
                    </NeumorphButton>
                  </div>
                </NeumorphCard>
              </div>
              
              <div className="mt-8 text-center">
                <p className="text-muted-foreground">
                  Already have an account?{" "}
                  <button 
                    onClick={() => navigate("/login")}
                    className="text-primary font-medium hover:underline"
                  >
                    Log in
                  </button>
                </p>
              </div>
            </div>
          </div>
        </main>
        
        <Footer />
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto">
            <h1 className="text-3xl font-bold text-center mb-2">
              {userType === "tenant" ? "Tenant Sign Up" : "Landlord Sign Up"}
            </h1>
            <p className="text-muted-foreground text-center mb-8">
              {userType === "tenant" 
                ? "Create an account to manage your rental experience"
                : "Create an account to manage your properties"
              }
            </p>
            
            <AuthForm 
              type={userType === "tenant" ? "tenant-signup" : "landlord-signup"} 
              onSubmit={handleSignup} 
            />
            
            <div className="mt-6 text-center">
              <p className="text-muted-foreground">
                Already have an account?{" "}
                <button 
                  onClick={() => navigate("/login")}
                  className="text-primary font-medium hover:underline"
                >
                  Log in
                </button>
              </p>
              <button 
                onClick={() => setUserType(null)}
                className="mt-2 text-sm text-muted-foreground hover:text-primary"
              >
                ← Back to account type selection
              </button>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Signup;
