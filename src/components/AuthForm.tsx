
import { useState } from "react";
import { NeumorphCard } from "./NeumorphCard";
import { NeumorphInput } from "./NeumorphInput";
import { NeumorphButton } from "./NeumorphButton";
import { Eye, EyeOff, Loader2 } from "lucide-react";

type AuthFormType = "login" | "tenant-signup" | "landlord-signup";

interface AuthFormProps {
  type: AuthFormType;
  onSubmit: (data: any) => void;
}

const AuthForm = ({ type, onSubmit }: AuthFormProps) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    adminCode: "",
    password: "",
    confirmPassword: "",
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };
  
  const validate = () => {
    const newErrors: Record<string, string> = {};
    
    if (type !== "login") {
      if (!formData.name) newErrors.name = "Name is required";
      if (!formData.phone) newErrors.phone = "Phone number is required";
      if (formData.phone && !/^\+?[0-9]{10,12}$/.test(formData.phone)) {
        newErrors.phone = "Please enter a valid phone number";
      }
    }
    
    if (!formData.email) newErrors.email = "Email is required";
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    
    if (!formData.password) newErrors.password = "Password is required";
    if (formData.password && formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }
    
    if (type !== "login" && formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    
    if (type === "landlord-signup" && formData.adminCode !== "Admin256") {
      newErrors.adminCode = "Invalid admin code";
    }
    
    return newErrors;
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    
    setLoading(true);
    
    try {
      // In a real app, this would be an API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      onSubmit(formData);
    } catch (error) {
      console.error("Authentication error:", error);
    } finally {
      setLoading(false);
    }
  };
  
  const formTitle = 
    type === "login" 
      ? "Welcome Back" 
      : type === "tenant-signup" 
        ? "Tenant Sign Up" 
        : "Landlord Sign Up";
  
  return (
    <NeumorphCard className="w-full max-w-md mx-auto p-8">
      <h2 className="text-2xl font-semibold text-center mb-6">{formTitle}</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        {type !== "login" && (
          <>
            <NeumorphInput
              label="Full Name"
              name="name"
              placeholder="John Doe"
              value={formData.name}
              onChange={handleChange}
              error={errors.name}
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <NeumorphInput
                label="Phone Number"
                name="phone"
                placeholder="+256700000000"
                value={formData.phone}
                onChange={handleChange}
                error={errors.phone}
              />
              
              {type === "tenant-signup" && (
                <NeumorphInput
                  label="Address"
                  name="address"
                  placeholder="Kampala, Uganda"
                  value={formData.address}
                  onChange={handleChange}
                />
              )}
            </div>
          </>
        )}
        
        <NeumorphInput
          label="Email Address"
          name="email"
          type="email"
          placeholder="your@email.com"
          value={formData.email}
          onChange={handleChange}
          error={errors.email}
        />
        
        {type === "landlord-signup" && (
          <NeumorphInput
            label="Admin Code"
            name="adminCode"
            placeholder="Enter admin code"
            value={formData.adminCode}
            onChange={handleChange}
            error={errors.adminCode}
          />
        )}
        
        <div className="relative">
          <NeumorphInput
            label="Password"
            name="password"
            type={showPassword ? "text" : "password"}
            placeholder="********"
            value={formData.password}
            onChange={handleChange}
            error={errors.password}
          />
          <button
            type="button"
            className="absolute right-3 top-[34px] text-muted-foreground"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <EyeOff className="h-5 w-5" />
            ) : (
              <Eye className="h-5 w-5" />
            )}
          </button>
        </div>
        
        {type !== "login" && (
          <NeumorphInput
            label="Confirm Password"
            name="confirmPassword"
            type={showPassword ? "text" : "password"}
            placeholder="********"
            value={formData.confirmPassword}
            onChange={handleChange}
            error={errors.confirmPassword}
          />
        )}
        
        <div className="pt-2">
          <NeumorphButton
            type="submit"
            variant="primary"
            className="w-full"
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                <span>Processing...</span>
              </>
            ) : (
              <span>
                {type === "login" ? "Log In" : "Sign Up"}
              </span>
            )}
          </NeumorphButton>
        </div>
      </form>
    </NeumorphCard>
  );
};

export default AuthForm;
