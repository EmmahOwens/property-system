
import { useEffect, useState, useRef } from 'react';
import { NeumorphCard } from './NeumorphCard';
import { NeumorphButton } from './NeumorphButton';
import { Loader2, Send, UserCircle } from 'lucide-react';
import { useProfile } from '@/hooks/useProfile';
import { 
  Contact, 
  Message, 
  loadContacts, 
  loadConversation, 
  sendMessage as sendMessageService,
  subscribeToMessages
} from '@/services/MessagingService';

const Messaging = () => {
  const { profile } = useProfile();
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!profile) return;
    
    // Load contacts
    const fetchContacts = async () => {
      setLoading(true);
      const contactsList = await loadContacts(profile.id, profile.user_type);
      setContacts(contactsList);
      setLoading(false);
    };
    
    fetchContacts();
    
    // Subscribe to new messages
    const unsubscribe = subscribeToMessages(profile.id, (newMessage) => {
      if (selectedContact && 
          (newMessage.sender_id === selectedContact.id || 
           newMessage.receiver_id === selectedContact.id)) {
        setMessages(prev => [...prev, newMessage]);
      }
      
      // Update contacts list to show unread message indicators
      setContacts(prev => 
        prev.map(contact => {
          if (contact.id === newMessage.sender_id) {
            return {
              ...contact,
              unread_count: (contact.unread_count || 0) + 1
            };
          }
          return contact;
        })
      );
    });
    
    return () => {
      unsubscribe();
    };
  }, [profile]);
  
  useEffect(() => {
    if (!profile || !selectedContact) return;
    
    const fetchConversation = async () => {
      setLoading(true);
      const conversation = await loadConversation(profile.id, selectedContact.id);
      setMessages(conversation);
      setLoading(false);
      
      // Reset unread count for this contact
      setContacts(prev => 
        prev.map(contact => {
          if (contact.id === selectedContact.id) {
            return { ...contact, unread_count: 0 };
          }
          return contact;
        })
      );
    };
    
    fetchConversation();
  }, [profile, selectedContact]);
  
  useEffect(() => {
    // Scroll to bottom when messages change
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  const sendMessage = async () => {
    if (!profile || !selectedContact || !newMessage.trim()) return;
    
    setSending(true);
    const message = await sendMessageService(profile.id, selectedContact.id, newMessage);
    
    if (message) {
      setMessages(prev => [...prev, message]);
      setNewMessage('');
    }
    
    setSending(false);
  };
  
  const getContactName = (contact: Contact) => {
    if (contact.first_name && contact.last_name) {
      return `${contact.first_name} ${contact.last_name}`;
    }
    return `${contact.user_type === 'tenant' ? 'Tenant' : 'Landlord'} #${contact.id.substring(0, 5)}`;
  };
  
  if (!profile) {
    return (
      <NeumorphCard className="p-6">
        <div className="text-center text-muted-foreground">
          Please sign in to use messaging
        </div>
      </NeumorphCard>
    );
  }
  
  return (
    <NeumorphCard className="p-0 overflow-hidden">
      <div className="flex h-[400px]">
        {/* Contacts sidebar */}
        <div className="w-1/3 border-r border-border/40 overflow-y-auto">
          <div className="p-4 border-b border-border/40">
            <h3 className="font-semibold">Contacts</h3>
          </div>
          
          {loading && contacts.length === 0 ? (
            <div className="flex justify-center items-center h-32">
              <Loader2 className="h-6 w-6 animate-spin text-primary" />
            </div>
          ) : contacts.length === 0 ? (
            <div className="p-4 text-center text-muted-foreground">
              No contacts available
            </div>
          ) : (
            <ul>
              {contacts.map((contact) => (
                <li key={contact.id}>
                  <button
                    className={`w-full text-left px-4 py-3 hover:bg-secondary/50 flex items-center gap-3 ${
                      selectedContact?.id === contact.id ? 'bg-secondary' : ''
                    }`}
                    onClick={() => setSelectedContact(contact)}
                  >
                    <div className="relative">
                      {contact.avatar_url ? (
                        <img 
                          src={contact.avatar_url} 
                          alt={getContactName(contact)}
                          className="h-10 w-10 rounded-full object-cover"
                        />
                      ) : (
                        <UserCircle className="h-10 w-10 text-muted-foreground" />
                      )}
                      
                      {contact.unread_count ? (
                        <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
                          {contact.unread_count}
                        </span>
                      ) : null}
                    </div>
                    
                    <div>
                      <div className="font-medium">{getContactName(contact)}</div>
                      <div className="text-xs text-muted-foreground">
                        {contact.user_type === 'tenant' ? 'Tenant' : 'Landlord'}
                      </div>
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
        
        {/* Chat area */}
        <div className="flex-1 flex flex-col">
          {selectedContact ? (
            <>
              <div className="p-4 border-b border-border/40 flex items-center gap-3">
                {selectedContact.avatar_url ? (
                  <img 
                    src={selectedContact.avatar_url} 
                    alt={getContactName(selectedContact)}
                    className="h-10 w-10 rounded-full object-cover"
                  />
                ) : (
                  <UserCircle className="h-10 w-10 text-muted-foreground" />
                )}
                
                <div>
                  <h3 className="font-semibold">{getContactName(selectedContact)}</h3>
                  <div className="text-xs text-muted-foreground">
                    {selectedContact.user_type === 'tenant' ? 'Tenant' : 'Landlord'}
                  </div>
                </div>
              </div>
              
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {loading ? (
                  <div className="flex justify-center items-center h-32">
                    <Loader2 className="h-6 w-6 animate-spin text-primary" />
                  </div>
                ) : messages.length === 0 ? (
                  <div className="text-center text-muted-foreground py-8">
                    No messages yet. Start a conversation!
                  </div>
                ) : (
                  messages.map((message) => {
                    const isMe = message.sender_id === profile.id;
                    
                    return (
                      <div 
                        key={message.id} 
                        className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}
                      >
                        <div
                          className={`max-w-[75%] rounded-lg px-4 py-2 ${
                            isMe
                              ? 'bg-primary text-primary-foreground'
                              : 'neumorph'
                          }`}
                        >
                          <p className="text-sm">{message.content}</p>
                          <p className="text-xs text-muted-foreground mt-1">
                            {new Date(message.created_at).toLocaleTimeString([], {
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </p>
                        </div>
                      </div>
                    );
                  })
                )}
                <div ref={messagesEndRef} />
              </div>
              
              <div className="p-4 border-t border-border/40">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    className="input-neumorph flex-1"
                    placeholder="Type your message..."
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        sendMessage();
                      }
                    }}
                  />
                  <NeumorphButton
                    variant="primary"
                    onClick={sendMessage}
                    disabled={sending || !newMessage.trim()}
                  >
                    {sending ? (
                      <Loader2 className="h-5 w-5 animate-spin" />
                    ) : (
                      <Send className="h-5 w-5" />
                    )}
                  </NeumorphButton>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-muted-foreground">
              Select a contact to start messaging
            </div>
          )}
        </div>
      </div>
    </NeumorphCard>
  );
};

export default Messaging;
