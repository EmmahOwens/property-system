
import { useState } from "react";
import Header from "@/components/Header";
import { NeumorphCard } from "@/components/NeumorphCard";
import { NeumorphButton } from "@/components/NeumorphButton";
import CurrencyDisplay from "@/components/CurrencyDisplay";
import { 
  Home, Bell, MessageSquare, CreditCard, FileText, 
  Settings, Calendar, Loader2, ChevronRight, Send 
} from "lucide-react";

const TenantDashboard = () => {
  const [messages, setMessages] = useState([
    { id: 1, text: "Hello! How can I help you today?", sender: "landlord" },
    { id: 2, text: "I was wondering about the water issue in the bathroom.", sender: "tenant" },
    { id: 3, text: "I'll send someone to check it out tomorrow.", sender: "landlord" },
  ]);
  
  const [newMessage, setNewMessage] = useState("");
  const [sendingMessage, setSendingMessage] = useState(false);
  
  const sendMessage = () => {
    if (!newMessage.trim()) return;
    
    setSendingMessage(true);
    
    // Simulate sending a message
    setTimeout(() => {
      const message = {
        id: Date.now(),
        text: newMessage,
        sender: "tenant" as const,
      };
      
      setMessages((prev) => [...prev, message]);
      setNewMessage("");
      setSendingMessage(false);
    }, 500);
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
                  </div>
                  
                  <ul className="space-y-1 p-2">
                    <li>
                      <a href="#" className="flex items-center gap-3 px-3 py-2 rounded-md bg-primary text-primary-foreground">
                        <Home className="h-5 w-5" />
                        <span>Dashboard</span>
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
                        <FileText className="h-5 w-5" />
                        <span>Documents</span>
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
                {/* Rent Due Card */}
                <NeumorphCard className="relative overflow-hidden p-6">
                  <div className="absolute top-0 right-0 w-16 h-16">
                    <div className="absolute transform rotate-45 bg-primary text-primary-foreground text-xs font-semibold py-1 right-[-35px] top-[32px] w-[140px] text-center">
                      Due Soon
                    </div>
                  </div>
                  
                  <div className="flex flex-col">
                    <h3 className="text-muted-foreground font-medium">Rent Due</h3>
                    <CurrencyDisplay amount={350000} className="text-2xl font-bold" />
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
                    
                    <NeumorphButton variant="secondary" size="sm" className="justify-start">
                      <MessageSquare className="h-4 w-4 mr-2" />
                      Contact Landlord
                    </NeumorphButton>
                    
                    <NeumorphButton variant="secondary" size="sm" className="justify-start">
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
              <NeumorphCard className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-semibold text-lg">Messages with Landlord</h3>
                </div>
                
                <div className="neumorph-inset bg-background/50 p-4 mb-4 h-64 overflow-y-auto">
                  <div className="space-y-4">
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${
                          message.sender === "tenant" ? "justify-end" : "justify-start"
                        }`}
                      >
                        <div
                          className={`max-w-[75%] rounded-lg px-4 py-2 ${
                            message.sender === "tenant"
                              ? "bg-primary text-primary-foreground"
                              : "neumorph"
                          }`}
                        >
                          <p className="text-sm">{message.text}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    className="input-neumorph flex-1"
                    placeholder="Type your message..."
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        sendMessage();
                      }
                    }}
                  />
                  <NeumorphButton
                    variant="primary"
                    onClick={sendMessage}
                    disabled={sendingMessage || !newMessage.trim()}
                  >
                    {sendingMessage ? (
                      <Loader2 className="h-5 w-5 animate-spin" />
                    ) : (
                      <Send className="h-5 w-5" />
                    )}
                  </NeumorphButton>
                </div>
              </NeumorphCard>
              
              {/* Recent Transactions */}
              <NeumorphCard className="p-6 mt-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-semibold text-lg">Recent Transactions</h3>
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
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default TenantDashboard;
