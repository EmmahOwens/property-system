
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { NeumorphButton } from "@/components/NeumorphButton";
import FeatureCard from "@/components/FeatureCard";
import MapComponent from "@/components/MapComponent";
import { Home, MessageSquare, BarChart3, CreditCard, Shield } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: <Home className="h-6 w-6 text-primary" />,
      title: "Property Management",
      description: "Easily manage your properties with our intuitive dashboard tailored for Uganda."
    },
    {
      icon: <MessageSquare className="h-6 w-6 text-primary" />,
      title: "Real-time Chat",
      description: "Communicate instantly with tenants through our secure messaging system."
    },
    {
      icon: <CreditCard className="h-6 w-6 text-primary" />,
      title: "Ugandan Payments",
      description: "Track rent payments in UGX with automatic receipts and reminders."
    },
    {
      icon: <BarChart3 className="h-6 w-6 text-primary" />,
      title: "AI Insights",
      description: "Receive predictive analytics about rental trends and tenant behavior."
    },
    {
      icon: <Shield className="h-6 w-6 text-primary" />,
      title: "Secure Portal",
      description: "Industry-standard security with Auth0 integration for peace of mind."
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow pt-24">
        {/* Hero Section */}
        <section className="py-12 md:py-20">
          <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
              <div className="w-full lg:w-1/2 space-y-6 text-center lg:text-left">
                <div className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
                  Tailored for Uganda
                </div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                  Smart Rental Management with <span className="text-primary">AI Insights</span>
                </h1>
                <p className="text-lg md:text-xl text-muted-foreground">
                  Streamline your rental property management with our intelligent system designed specifically for the Ugandan market.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4">
                  <NeumorphButton
                    variant="primary"
                    size="lg"
                    onClick={() => navigate("/signup")}
                    className="w-full sm:w-auto"
                  >
                    Get Started
                  </NeumorphButton>
                  <NeumorphButton
                    variant="secondary"
                    size="lg"
                    onClick={() => navigate("/features")}
                    className="w-full sm:w-auto"
                  >
                    Learn More
                  </NeumorphButton>
                </div>
              </div>
              
              <div className="w-full lg:w-1/2 relative animate-fade-in">
                {/* Dashboard Preview Image would go here in a full implementation */}
                <div className="aspect-video rounded-xl overflow-hidden neumorph">
                  <div className="w-full h-full bg-gradient-to-br from-primary/10 to-primary/20 flex items-center justify-center">
                    <span className="text-xl font-medium text-primary">Dashboard Preview</span>
                  </div>
                </div>
                
                {/* Floating stats card */}
                <div className="absolute -bottom-6 -left-6 neumorph p-4 rounded-lg bg-background/90 backdrop-blur-sm shadow-xl max-w-[200px] hidden md:block">
                  <p className="text-sm font-medium text-foreground">Monthly Collections</p>
                  <p className="text-2xl font-bold text-primary">UGX 2.4M</p>
                  <p className="text-xs text-muted-foreground">+12% from last month</p>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Features Section */}
        <section className="py-16 bg-secondary/50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Key Features</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Our platform offers everything you need to efficiently manage rental properties in Uganda.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <FeatureCard 
                  key={index}
                  icon={feature.icon}
                  title={feature.title}
                  description={feature.description}
                />
              ))}
            </div>
          </div>
        </section>
        
        {/* Map Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Properties in Kampala</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Explore rental properties across Kampala and surrounding areas, with detailed location information.
              </p>
            </div>
            
            <MapComponent />
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-16 bg-primary/5">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Rental Management?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
              Join landlords across Uganda who are streamlining their rental business with our platform.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <NeumorphButton
                variant="primary"
                size="lg"
                onClick={() => navigate("/signup")}
              >
                Sign Up Now
              </NeumorphButton>
              <NeumorphButton
                variant="secondary"
                size="lg"
                onClick={() => navigate("/login")}
              >
                Existing User? Log In
              </NeumorphButton>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
