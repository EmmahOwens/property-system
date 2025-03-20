
import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';
import { toast } from 'sonner';

export type Profile = {
  id: string;
  user_id: string;
  first_name: string | null;
  last_name: string | null;
  phone: string | null;
  avatar_url: string | null;
  user_type: string;
  created_at: string | null;
};

export const useProfile = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [allProfiles, setAllProfiles] = useState<Profile[]>([]);
  const [loadingAllProfiles, setLoadingAllProfiles] = useState(true);

  // Subscribe to profile changes (useful for landlords watching tenant profiles)
  useEffect(() => {
    if (!user) {
      setProfile(null);
      setLoading(false);
      return;
    }

    setLoading(true);
    // Initial fetch
    fetchProfile(user.id);

    // Set up real-time subscription
    const channel = supabase
      .channel('profiles_changes')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'profiles' }, 
        (payload) => {
          if (payload.new && payload.new.user_id === user.id) {
            setProfile(payload.new as Profile);
          } else if (payload.eventType === 'DELETE' && 
                    payload.old && 
                    payload.old.user_id === user.id) {
            setProfile(null);
          }
          
          // If all profiles are being watched, update that too
          if (allProfiles.length > 0) {
            fetchAllProfiles();
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user]);

  const fetchProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', userId)
        .single();

      if (error) {
        console.error('Error fetching profile:', error);
        setProfile(null);
      } else {
        setProfile(data);
      }
    } catch (error) {
      console.error('Error in fetchProfile:', error);
      setProfile(null);
    } finally {
      setLoading(false);
    }
  };

  const fetchAllProfiles = async () => {
    if (!profile || profile.user_type !== 'landlord') return;
    
    setLoadingAllProfiles(true);
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*');

      if (error) {
        console.error('Error fetching all profiles:', error);
      } else {
        setAllProfiles(data);
      }
    } catch (error) {
      console.error('Error in fetchAllProfiles:', error);
    } finally {
      setLoadingAllProfiles(false);
    }
  };

  const updateProfile = async (updates: Partial<Profile>) => {
    if (!profile) return null;
    
    try {
      const { data, error } = await supabase
        .from('profiles')
        .update(updates)
        .eq('id', profile.id)
        .select()
        .single();

      if (error) {
        console.error('Error updating profile:', error);
        toast.error('Failed to update profile');
        return null;
      }

      setProfile(data);
      toast.success('Profile updated successfully');
      return data;
    } catch (error) {
      console.error('Error in updateProfile:', error);
      toast.error('Failed to update profile');
      return null;
    }
  };

  return {
    profile,
    loading,
    updateProfile,
    allProfiles,
    loadingAllProfiles,
    fetchAllProfiles,
  };
};
