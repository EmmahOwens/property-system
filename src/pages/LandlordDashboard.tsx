
import { useState } from "react";
import Header from "@/components/Header";
import { NeumorphCard } from "@/components/NeumorphCard";
import { NeumorphButton } from "@/components/NeumorphButton";
import CurrencyDisplay from "@/components/CurrencyDisplay";
import { 
  Building, Users, CreditCard, BarChart3, MessageSquare, 
  Settings, UserPlus, FileText, ChevronRight, PieChart 
} from "lucide-react";

const LandlordDashboard = () => {
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
                    <h2 className="font-semibold text-lg">Landlord Dashboard</h2>
                  </div>
                  
                  <ul className="space-y-1 p-2">
                    <li>
                      <a href="#" className="flex items-center gap-3 px-3 py-2 rounded-md bg-primary text-primary-foreground">
                        <Building className="h-5 w-5" />
                        <span>Dashboard</span>
                      </a>
                    </li>
                    <li>
                      <a href="#" className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-secondary">
                        <Users className="h-5 w-5" />
                        <span>Tenants</span>
                      </a>
                    </li>
                    <li>
                      <a href="#" className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-secondary">
                        <CreditCard className="h-5 w-5" />
                        <span>Payments</span>
                      </a>
                    </li>
                    <li>
                      <a href="#" className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-secondary">
                        <MessageSquare className="h-5 w-5" />
                        <span>Messages</span>
                      </a>
                    </li>
                    <li>
                      <a href="#" className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-secondary">
                        <BarChart3 className="h-5 w-5" />
                        <span>Analytics</span>
                      </a>
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
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
                {/* Income Summary Card */}
                <NeumorphCard className="p-6">
                  <div className="flex flex-col">
                    <h3 className="text-muted-foreground font-medium">Monthly Income</h3>
                    <CurrencyDisplay amount={2450000} className="text-2xl font-bold" />
                    <p className="text-sm text-green-600 font-medium flex items-center mt-1">
                      <span>+12% from last month</span>
                    </p>
                    
                    <div className="mt-4 pt-4 border-t border-border/30">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Collection Rate</span>
                        <span className="font-medium">92%</span>
                      </div>
                    </div>
                  </div>
                </NeumorphCard>
                
                {/* Properties Card */}
                <NeumorphCard className="p-6">
                  <h3 className="text-muted-foreground font-medium mb-3">Properties Summary</h3>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <div className="neumorph p-3 rounded-lg">
                      <p className="text-muted-foreground text-sm">Total Units</p>
                      <p className="text-xl font-bold">12</p>
                    </div>
                    <div className="neumorph p-3 rounded-lg">
                      <p className="text-muted-foreground text-sm">Occupied</p>
                      <p className="text-xl font-bold">10</p>
                    </div>
                    <div className="neumorph p-3 rounded-lg">
                      <p className="text-muted-foreground text-sm">Vacant</p>
                      <p className="text-xl font-bold">2</p>
                    </div>
                    <div className="neumorph p-3 rounded-lg">
                      <p className="text-muted-foreground text-sm">Maintenance</p>
                      <p className="text-xl font-bold">1</p>
                    </div>
                  </div>
                </NeumorphCard>
                
                {/* Quick Actions Card */}
                <NeumorphCard className="p-6">
                  <h3 className="text-muted-foreground font-medium mb-4">Quick Actions</h3>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <NeumorphButton variant="primary" size="sm" className="justify-start">
                      <UserPlus className="h-4 w-4 mr-2" />
                      Add Tenant
                    </NeumorphButton>
                    
                    <NeumorphButton variant="primary" size="sm" className="justify-start">
                      <Building className="h-4 w-4 mr-2" />
                      Add Property
                    </NeumorphButton>
                    
                    <NeumorphButton variant="secondary" size="sm" className="justify-start">
                      <MessageSquare className="h-4 w-4 mr-2" />
                      Send Notice
                    </NeumorphButton>
                    
                    <NeumorphButton variant="secondary" size="sm" className="justify-start">
                      <FileText className="h-4 w-4 mr-2" />
                      Generate Report
                    </NeumorphButton>
                  </div>
                </NeumorphCard>
              </div>
              
              {/* AI Insights Section */}
              <NeumorphCard className="p-6 mb-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-lg flex items-center">
                    <BarChart3 className="h-5 w-5 mr-2 text-primary" />
                    AI Insights
                  </h3>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="neumorph p-4 rounded-lg">
                    <h4 className="font-medium mb-2">Rent Price Predictions</h4>
                    <p className="text-sm text-muted-foreground mb-3">
                      Based on market trends in Kampala, your properties in Nakawa district could command 8% higher rent.
                    </p>
                    <NeumorphButton variant="secondary" size="sm">
                      View Analysis
                    </NeumorphButton>
                  </div>
                  
                  <div className="neumorph p-4 rounded-lg">
                    <h4 className="font-medium mb-2">Vacancy Risk Alert</h4>
                    <p className="text-sm text-muted-foreground mb-3">
                      Tenant in Unit 3B shows signs of potential non-renewal (3 late payments, 2 maintenance complaints).
                    </p>
                    <NeumorphButton variant="secondary" size="sm">
                      Take Action
                    </NeumorphButton>
                  </div>
                </div>
              </NeumorphCard>
              
              {/* Recent Payments */}
              <NeumorphCard className="p-6 mb-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-semibold text-lg">Recent Payments</h3>
                  <NeumorphButton variant="secondary" size="sm">
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
                        <p className="font-medium">John Mukasa</p>
                        <p className="text-sm text-muted-foreground">Unit 2A - April Rent</p>
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
                        <p className="font-medium">Sarah Namono</p>
                        <p className="text-sm text-muted-foreground">Unit 4C - April Rent</p>
                      </div>
                    </div>
                    <CurrencyDisplay amount={400000} className="font-semibold" />
                  </div>
                  
                  <div className="flex justify-between items-center p-3 neumorph rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-full bg-primary/10">
                        <CreditCard className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">David Ochen</p>
                        <p className="text-sm text-muted-foreground">Unit 1B - April Rent</p>
                      </div>
                    </div>
                    <CurrencyDisplay amount={500000} className="font-semibold" />
                  </div>
                </div>
              </NeumorphCard>
              
              {/* Maintenance Requests */}
              <NeumorphCard className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-semibold text-lg">Maintenance Requests</h3>
                  <NeumorphButton variant="secondary" size="sm">
                    View All
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </NeumorphButton>
                </div>
                
                <div className="space-y-4">
                  <div className="p-3 neumorph rounded-lg">
                    <div className="flex justify-between mb-2">
                      <p className="font-medium">Leaking Bathroom Tap</p>
                      <span className="px-2 py-0.5 text-xs rounded-full bg-orange-100 text-orange-800 font-medium">
                        In Progress
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">
                      Unit 3B - Reported on April 15, 2023
                    </p>
                    <div className="flex justify-between items-center">
                      <p className="text-sm text-muted-foreground">Technician assigned: James</p>
                      <NeumorphButton variant="secondary" size="sm">
                        Update
                      </NeumorphButton>
                    </div>
                  </div>
                  
                  <div className="p-3 neumorph rounded-lg">
                    <div className="flex justify-between mb-2">
                      <p className="font-medium">Electrical Socket Issue</p>
                      <span className="px-2 py-0.5 text-xs rounded-full bg-red-100 text-red-800 font-medium">
                        Pending
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">
                      Unit 4C - Reported on April 18, 2023
                    </p>
                    <div className="flex justify-between items-center">
                      <p className="text-sm text-muted-foreground">No technician assigned</p>
                      <NeumorphButton variant="primary" size="sm">
                        Assign
                      </NeumorphButton>
                    </div>
                  </div>
                </div>
              </NeumorphCard>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default LandlordDashboard;
