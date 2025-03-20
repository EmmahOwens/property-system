
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Loader2 } from 'lucide-react';

interface ProtectedRouteProps {
  userType?: 'tenant' | 'landlord';
}

const ProtectedRoute = ({ userType }: ProtectedRouteProps) => {
  const { user, profile, isLoading } = useAuth();

  // Show loading spinner while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // If a specific user type is required, check if the user has that type
  if (userType && profile?.user_type !== userType) {
    return <Navigate to="/" replace />;
  }

  // Render the child routes
  return <Outlet />;
};

export default ProtectedRoute;
