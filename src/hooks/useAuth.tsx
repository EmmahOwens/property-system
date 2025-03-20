
import { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

type AuthContextType = {
  session: Session | null;
  user: User | null;
  profile: any | null;
  isLoading: boolean;
  signUp: (data: SignUpData) => Promise<void>;
  signIn: (data: SignInData) => Promise<void>;
  signOut: () => Promise<void>;
};

type SignUpData = {
  email: string;
  password: string;
  name: string;
  phone: string;
  address?: string;
  adminCode?: string;
  userType: 'tenant' | 'landlord';
};

type SignInData = {
  email: string;
  password: string;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, newSession) => {
        setSession(newSession);
        setUser(newSession?.user ?? null);

        if (newSession?.user) {
          await fetchProfile(newSession.user.id);
        } else {
          setProfile(null);
        }

        if (event === 'SIGNED_OUT') {
          navigate('/login');
        }
      }
    );

    // THEN check for existing session
    supabase.auth.getSession().then(async ({ data: { session: currentSession } }) => {
      setSession(currentSession);
      setUser(currentSession?.user ?? null);
      
      if (currentSession?.user) {
        await fetchProfile(currentSession.user.id);
      }
      
      setIsLoading(false);
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const fetchProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', userId)
        .single();

      if (error) {
        console.error('Error fetching profile:', error);
        return;
      }

      setProfile(data);
    } catch (error) {
      console.error('Error in fetchProfile:', error);
    }
  };

  const signUp = async (data: SignUpData) => {
    try {
      setIsLoading(true);
      
      // Validate admin code for landlords
      if (data.userType === 'landlord' && data.adminCode !== 'Admin256') {
        toast.error('Invalid admin code');
        setIsLoading(false);
        return;
      }
      
      // Sign up the user
      const { error } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          data: {
            full_name: data.name,
            user_type: data.userType,
          },
        },
      });

      if (error) {
        toast.error(error.message);
        return;
      }

      // Show success message
      toast.success('Signup successful!', {
        description: 'Please check your email to verify your account.'
      });
      
      // Redirect to login
      navigate('/login');
    } catch (error: any) {
      toast.error('Error during signup: ' + (error.message || 'Unknown error'));
    } finally {
      setIsLoading(false);
    }
  };

  const signIn = async (data: SignInData) => {
    try {
      setIsLoading(true);
      
      const { error } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password,
      });

      if (error) {
        toast.error(error.message);
        return;
      }

      toast.success('Login successful!');
      
      // Redirect based on user type
      if (profile?.user_type === 'tenant') {
        navigate('/tenant-dashboard');
      } else if (profile?.user_type === 'landlord') {
        navigate('/landlord-dashboard');
      } else {
        // Fallback
        navigate('/');
      }
    } catch (error: any) {
      toast.error('Error during login: ' + (error.message || 'Unknown error'));
    } finally {
      setIsLoading(false);
    }
  };

  const signOut = async () => {
    try {
      setIsLoading(true);
      await supabase.auth.signOut();
      toast.success('You have been logged out');
      navigate('/login');
    } catch (error: any) {
      toast.error('Error during logout: ' + (error.message || 'Unknown error'));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        session,
        user,
        profile,
        isLoading,
        signUp,
        signIn,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
