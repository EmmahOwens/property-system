
import { useState, useEffect } from "react";
import Header from "@/components/Header";
import { NeumorphCard } from "@/components/NeumorphCard";
import { NeumorphButton } from "@/components/NeumorphButton";
import CurrencyDisplay from "@/components/CurrencyDisplay";
import { 
  Home, Bell, MessageSquare, CreditCard, FileText, 
  Settings, Calendar, Loader2, ChevronRight
} from "lucide-react";
import { useProfile } from "@/hooks/useProfile";
import Messaging from "@/components/Messaging";
import { supabase } from "@/integrations/supabase/client";

type DashboardTab = 'overview' | 'messages' | 'documents' | 'payments';

const TenantDashboard = () => {
  const { profile, loading } = useProfile();
  const [activeTab, setActiveTab] = useState<DashboardTab>('overview');
  const [tenancyData, setTenancyData] = useState({
    rentAmount: 350000,
    dueDate: '2023-05-05',
    property: null as any,
    landlord: null as any
  });
  
  useEffect(() => {
    if (profile) {
      fetchTenancyData();
    }
  }, [profile]);
  
  const fetchTenancyData = async () => {
    if (!profile) return;
    
    try {
      // This is just sample data
      // In a real app, you'd fetch actual tenancy data from the database
      
      // Get a random landlord for demo
      const { data: landlords } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_type', 'landlord')
        .limit(1);
      
      if (landlords && landlords.length > 0) {
        setTenancyData(prev => ({
          ...prev,
          landlord: landlords[0]
        }));
      }
      
    } catch (error) {
      console.error('Error fetching tenancy data:', error);
    }
  };
  
  const renderTabContent = () => {
    switch (activeTab) {
      case 'messages':
        return <Messaging />;
      
      case 'payments':
        return (
          <NeumorphCard className="p-6">
            <h3 className="text-xl font-semibold mb-4">Payment History</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 neumorph rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-full bg-primary/10">
                    <CreditCard className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">April Rent Payment</p>
                    <p className="text-sm text-muted-foreground">April 2, 2023</p>
                  </div>
                </div>
                <CurrencyDisplay amount={350000} className="font-semibold" />
              </div>
              
              <div className="flex justify-between items-center p-3 neumorph rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-full bg-primary/10">
                    <CreditCard className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">March Rent Payment</p>
                    <p className="text-sm text-muted-foreground">March 3, 2023</p>
                  </div>
                </div>
                <CurrencyDisplay amount={350000} className="font-semibold" />
              </div>
              
              <div className="flex justify-between items-center p-3 neumorph rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-full bg-primary/10">
                    <CreditCard className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">February Rent Payment</p>
                    <p className="text-sm text-muted-foreground">February 2, 2023</p>
                  </div>
                </div>
                <CurrencyDisplay amount={350000} className="font-semibold" />
              </div>
              
              <div className="flex justify-between items-center p-3 neumorph rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-full bg-primary/10">
                    <CreditCard className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">January Rent Payment</p>
                    <p className="text-sm text-muted-foreground">January 3, 2023</p>
                  </div>
                </div>
                <CurrencyDisplay amount={350000} className="font-semibold" />
              </div>
            </div>
          </NeumorphCard>
        );
      
      case 'documents':
        return (
          <NeumorphCard className="p-6">
            <h3 className="text-xl font-semibold mb-4">Documents</h3>
            <div className="space-y-4">
              <div className="p-3 neumorph rounded-lg">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-full bg-primary/10">
                      <FileText className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">Lease Agreement</p>
                      <p className="text-sm text-muted-foreground">Uploaded on January 15, 2023</p>
                    </div>
                  </div>
                  <NeumorphButton variant="secondary" size="sm">
                    View
                  </NeumorphButton>
                </div>
              </div>
              
              <div className="p-3 neumorph rounded-lg">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-full bg-primary/10">
                      <FileText className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">House Rules</p>
                      <p className="text-sm text-muted-foreground">Uploaded on January 15, 2023</p>
                    </div>
                  </div>
                  <NeumorphButton variant="secondary" size="sm">
                    View
                  </NeumorphButton>
                </div>
              </div>
              
              <div className="p-3 neumorph rounded-lg">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-full bg-primary/10">
                      <FileText className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">Payment Schedule</p>
                      <p className="text-sm text-muted-foreground">Uploaded on January 15, 2023</p>
                    </div>
                  </div>
                  <NeumorphButton variant="secondary" size="sm">
                    View
                  </NeumorphButton>
                </div>
              </div>
            </div>
          </NeumorphCard>
        );
      
      case 'overview':
      default:
        return (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
              {/* Rent Due Card */}
              <NeumorphCard className="relative overflow-hidden p-6">
                <div className="absolute top-0 right-0 w-16 h-16">
                  <div className="absolute transform rotate-45 bg-primary text-primary-foreground text-xs font-semibold py-1 right-[-35px] top-[32px] w-[140px] text-center">
                    Due Soon
                  </div>
                </div>
                
                <div className="flex flex-col">
                  <h3 className="text-muted-foreground font-medium">Rent Due</h3>
                  <CurrencyDisplay amount={tenancyData.rentAmount} className="text-2xl font-bold" />
                  <p className="text-sm text-muted-foreground mt-1">Due on May 5, 2023</p>
                  
                  <div className="mt-4">
                    <NeumorphButton variant="primary" size="sm">
                      Pay Now
                    </NeumorphButton>
                  </div>
                </div>
              </NeumorphCard>
              
              {/* Notifications Card */}
              <NeumorphCard className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-muted-foreground font-medium">Notifications</h3>
                  <span className="neumorph-inset px-2 py-0.5 text-xs rounded-full bg-primary/10 text-primary font-medium">
                    2 New
                  </span>
                </div>
                
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <span className="mt-0.5 p-1.5 rounded-full bg-primary/10">
                      <Bell className="h-4 w-4 text-primary" />
                    </span>
                    <div>
                      <p className="text-sm font-medium">Maintenance visit scheduled</p>
                      <p className="text-xs text-muted-foreground">Today, 2:00 PM</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-0.5 p-1.5 rounded-full bg-primary/10">
                      <Calendar className="h-4 w-4 text-primary" />
                    </span>
                    <div>
                      <p className="text-sm font-medium">Rent due in 5 days</p>
                      <p className="text-xs text-muted-foreground">UGX 350,000</p>
                    </div>
                  </li>
                </ul>
              </NeumorphCard>
              
              {/* Quick Actions Card */}
              <NeumorphCard className="p-6">
                <h3 className="text-muted-foreground font-medium mb-4">Quick Actions</h3>
                
                <div className="grid grid-cols-2 gap-3">
                  <NeumorphButton variant="secondary" size="sm" className="justify-start">
                    <FileText className="h-4 w-4 mr-2" />
                    Report Issue
                  </NeumorphButton>
                  
                  <NeumorphButton 
                    variant="secondary" 
                    size="sm" 
                    className="justify-start"
                    onClick={() => setActiveTab('messages')}
                  >
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Contact Landlord
                  </NeumorphButton>
                  
                  <NeumorphButton 
                    variant="secondary" 
                    size="sm" 
                    className="justify-start"
                    onClick={() => setActiveTab('payments')}
                  >
                    <CreditCard className="h-4 w-4 mr-2" />
                    Payment History
                  </NeumorphButton>
                  
                  <NeumorphButton variant="secondary" size="sm" className="justify-start">
                    <Home className="h-4 w-4 mr-2" />
                    View Property
                  </NeumorphButton>
                </div>
              </NeumorphCard>
            </div>
            
            {/* Message Section */}
            <NeumorphCard className="p-6 mb-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold text-lg">Contact Your Landlord</h3>
                <NeumorphButton 
                  variant="primary" 
                  size="sm"
                  onClick={() => setActiveTab('messages')}
                >
                  Open Messaging
                </NeumorphButton>
              </div>
              
              <p className="text-muted-foreground">
                Need to get in touch with your landlord? Use our secure messaging system to communicate directly about rent, maintenance issues, or any other concerns.
              </p>
            </NeumorphCard>
            
            {/* Recent Transactions */}
            <NeumorphCard className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold text-lg">Recent Transactions</h3>
                <NeumorphButton 
                  variant="secondary" 
                  size="sm"
                  onClick={() => setActiveTab('payments')}
                >
                  View All
                  <ChevronRight className="h-4 w-4 ml-1" />
                </NeumorphButton>
              </div>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 neumorph rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-full bg-primary/10">
                      <CreditCard className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">April Rent Payment</p>
                      <p className="text-sm text-muted-foreground">April 2, 2023</p>
                    </div>
                  </div>
                  <CurrencyDisplay amount={350000} className="font-semibold" />
                </div>
                
                <div className="flex justify-between items-center p-3 neumorph rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-full bg-primary/10">
                      <CreditCard className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">March Rent Payment</p>
                      <p className="text-sm text-muted-foreground">March 3, 2023</p>
                    </div>
                  </div>
                  <CurrencyDisplay amount={350000} className="font-semibold" />
                </div>
              </div>
            </NeumorphCard>
          </>
        );
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-secondary/30">
      <Header />
      
      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Sidebar Navigation */}
            <aside className="w-full md:w-64 mb-6 md:mb-0">
              <NeumorphCard className="p-0 overflow-hidden">
                <nav className="p-1">
                  <div className="p-4 border-b border-border/40">
                    <h2 className="font-semibold text-lg">Tenant Dashboard</h2>
                    {profile && (
                      <p className="text-sm text-muted-foreground mt-1">
                        Welcome, {profile.first_name || 'Tenant'}
                      </p>
                    )}
                  </div>
                  
                  <ul className="space-y-1 p-2">
                    <li>
                      <button 
                        className={`flex items-center gap-3 px-3 py-2 rounded-md w-full text-left ${
                          activeTab === 'overview' 
                            ? 'bg-primary text-primary-foreground' 
                            : 'hover:bg-secondary'
                        }`}
                        onClick={() => setActiveTab('overview')}
                      >
                        <Home className="h-5 w-5" />
                        <span>Dashboard</span>
                      </button>
                    </li>
                    <li>
                      <button 
                        className={`flex items-center gap-3 px-3 py-2 rounded-md w-full text-left ${
                          activeTab === 'payments' 
                            ? 'bg-primary text-primary-foreground' 
                            : 'hover:bg-secondary'
                        }`}
                        onClick={() => setActiveTab('payments')}
                      >
                        <CreditCard className="h-5 w-5" />
                        <span>Payments</span>
                      </button>
                    </li>
                    <li>
                      <button 
                        className={`flex items-center gap-3 px-3 py-2 rounded-md w-full text-left ${
                          activeTab === 'messages' 
                            ? 'bg-primary text-primary-foreground' 
                            : 'hover:bg-secondary'
                        }`}
                        onClick={() => setActiveTab('messages')}
                      >
                        <MessageSquare className="h-5 w-5" />
                        <span>Messages</span>
                      </button>
                    </li>
                    <li>
                      <button 
                        className={`flex items-center gap-3 px-3 py-2 rounded-md w-full text-left ${
                          activeTab === 'documents' 
                            ? 'bg-primary text-primary-foreground' 
                            : 'hover:bg-secondary'
                        }`}
                        onClick={() => setActiveTab('documents')}
                      >
                        <FileText className="h-5 w-5" />
                        <span>Documents</span>
                      </button>
                    </li>
                    <li>
                      <a href="#" className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-secondary">
                        <Settings className="h-5 w-5" />
                        <span>Settings</span>
                      </a>
                    </li>
                  </ul>
                </nav>
              </NeumorphCard>
            </aside>
            
            {/* Main Content */}
            <div className="flex-1">
              {loading ? (
                <div className="flex justify-center items-center h-64">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
                </div>
              ) : (
                renderTabContent()
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default TenantDashboard;
