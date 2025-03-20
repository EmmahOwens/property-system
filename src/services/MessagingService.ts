
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export type Message = {
  id: string;
  content: string;
  sender_id: string;
  receiver_id: string;
  created_at: string;
  read: boolean;
};

export type Contact = {
  id: string;
  first_name: string | null;
  last_name: string | null;
  avatar_url: string | null;
  user_type: string;
  unread_count?: number;
};

export const loadContacts = async (currentUserProfileId: string, userType: string) => {
  try {
    let query;
    
    if (userType === 'tenant') {
      // Tenants can only message landlords
      query = supabase
        .from('profiles')
        .select('*')
        .eq('user_type', 'landlord');
    } else {
      // Landlords can see all tenants
      query = supabase
        .from('profiles')
        .select('*')
        .eq('user_type', 'tenant');
    }
    
    const { data, error } = await query;
    
    if (error) {
      console.error('Error loading contacts:', error);
      toast.error('Failed to load contacts');
      return [];
    }
    
    return data.map(contact => ({
      id: contact.id,
      first_name: contact.first_name,
      last_name: contact.last_name,
      avatar_url: contact.avatar_url,
      user_type: contact.user_type
    }));
  } catch (error) {
    console.error('Error in loadContacts:', error);
    toast.error('Failed to load contacts');
    return [];
  }
};

export const loadConversation = async (currentUserProfileId: string, otherUserProfileId: string) => {
  try {
    const { data, error } = await supabase
      .from('messages')
      .select('*')
      .or(`sender_id.eq.${currentUserProfileId},receiver_id.eq.${currentUserProfileId}`)
      .or(`sender_id.eq.${otherUserProfileId},receiver_id.eq.${otherUserProfileId}`)
      .order('created_at', { ascending: true });
    
    if (error) {
      console.error('Error loading conversation:', error);
      toast.error('Failed to load messages');
      return [];
    }
    
    // Filter to only include messages between these two users
    const conversation = data.filter(
      msg => 
        (msg.sender_id === currentUserProfileId && msg.receiver_id === otherUserProfileId) || 
        (msg.sender_id === otherUserProfileId && msg.receiver_id === currentUserProfileId)
    );
    
    // Mark messages as read
    await markMessagesAsRead(currentUserProfileId, otherUserProfileId);
    
    return conversation;
  } catch (error) {
    console.error('Error in loadConversation:', error);
    toast.error('Failed to load conversation');
    return [];
  }
};

export const sendMessage = async (senderProfileId: string, receiverProfileId: string, content: string) => {
  try {
    const { data, error } = await supabase
      .from('messages')
      .insert({
        sender_id: senderProfileId,
        receiver_id: receiverProfileId,
        content,
        read: false
      })
      .select()
      .single();
    
    if (error) {
      console.error('Error sending message:', error);
      toast.error('Failed to send message');
      return null;
    }
    
    return data;
  } catch (error) {
    console.error('Error in sendMessage:', error);
    toast.error('Failed to send message');
    return null;
  }
};

export const markMessagesAsRead = async (currentUserProfileId: string, senderProfileId: string) => {
  try {
    const { error } = await supabase
      .from('messages')
      .update({ read: true })
      .eq('receiver_id', currentUserProfileId)
      .eq('sender_id', senderProfileId)
      .eq('read', false);
    
    if (error) {
      console.error('Error marking messages as read:', error);
    }
  } catch (error) {
    console.error('Error in markMessagesAsRead:', error);
  }
};

export const subscribeToMessages = (
  currentUserProfileId: string, 
  onNewMessage: (message: Message) => void
) => {
  const channel = supabase
    .channel('messages_channel')
    .on(
      'postgres_changes',
      {
        event: 'INSERT',
        schema: 'public',
        table: 'messages',
        filter: `receiver_id=eq.${currentUserProfileId}`
      },
      (payload) => {
        onNewMessage(payload.new as Message);
      }
    )
    .subscribe();

  return () => {
    supabase.removeChannel(channel);
  };
};
