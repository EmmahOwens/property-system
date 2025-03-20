
import { useEffect, useState } from 'react';
import { NeumorphCard } from './NeumorphCard';
import { NeumorphButton } from './NeumorphButton';
import { toast } from 'sonner';
import { Loader2, Trash2, UserCircle, Mail } from 'lucide-react';
import { loadTenants, deleteTenant, Tenant } from '@/services/PropertyService';
import { useProfile } from '@/hooks/useProfile';
import { supabase } from '@/integrations/supabase/client';

type ManageTenantsProps = {
  onSelectTenantForMessaging?: (tenantId: string) => void;
};

const ManageTenants = ({ onSelectTenantForMessaging }: ManageTenantsProps) => {
  const { profile } = useProfile();
  const [tenants, setTenants] = useState<Tenant[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingTenant, setDeletingTenant] = useState<string | null>(null);

  useEffect(() => {
    if (!profile || profile.user_type !== 'landlord') return;
    
    fetchTenants();
    
    // Subscribe to tenant changes
    const channel = supabase
      .channel('public:profiles')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'profiles', filter: 'user_type=eq.tenant' }, 
        () => {
          fetchTenants();
        }
      )
      .subscribe();
    
    return () => {
      supabase.removeChannel(channel);
    };
  }, [profile]);

  const fetchTenants = async () => {
    setLoading(true);
    const tenantsData = await loadTenants();
    setTenants(tenantsData);
    setLoading(false);
  };

  const handleDeleteTenant = async (tenantId: string) => {
    if (window.confirm('Are you sure you want to delete this tenant? This action cannot be undone.')) {
      setDeletingTenant(tenantId);
      const success = await deleteTenant(tenantId);
      if (success) {
        setTenants(tenants.filter(tenant => tenant.id !== tenantId));
      }
      setDeletingTenant(null);
    }
  };

  const getTenantName = (tenant: Tenant) => {
    if (tenant.first_name && tenant.last_name) {
      return `${tenant.first_name} ${tenant.last_name}`;
    }
    return `Tenant #${tenant.id.substring(0, 5)}`;
  };

  if (!profile || profile.user_type !== 'landlord') {
    return (
      <NeumorphCard className="p-6">
        <div className="text-center text-muted-foreground">
          Only landlords can access tenant management
        </div>
      </NeumorphCard>
    );
  }

  return (
    <NeumorphCard className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-semibold">Manage Tenants</h3>
        <NeumorphButton 
          variant="secondary" 
          size="sm"
          onClick={() => fetchTenants()}
        >
          Refresh
        </NeumorphButton>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-32">
          <Loader2 className="h-6 w-6 animate-spin text-primary" />
        </div>
      ) : tenants.length === 0 ? (
        <div className="text-center text-muted-foreground py-8">
          No tenants registered in the system yet.
        </div>
      ) : (
        <div className="space-y-4">
          {tenants.map(tenant => (
            <div 
              key={tenant.id} 
              className="neumorph p-4 rounded-lg flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                {tenant.avatar_url ? (
                  <img 
                    src={tenant.avatar_url} 
                    alt={getTenantName(tenant)}
                    className="h-12 w-12 rounded-full object-cover"
                  />
                ) : (
                  <UserCircle className="h-12 w-12 text-muted-foreground" />
                )}
                
                <div>
                  <h4 className="font-medium">{getTenantName(tenant)}</h4>
                  {tenant.phone && (
                    <p className="text-sm text-muted-foreground">{tenant.phone}</p>
                  )}
                </div>
              </div>
              
              <div className="flex gap-2">
                {onSelectTenantForMessaging && (
                  <NeumorphButton
                    variant="secondary"
                    size="sm"
                    onClick={() => onSelectTenantForMessaging(tenant.id)}
                  >
                    <Mail className="h-4 w-4 mr-1" />
                    Message
                  </NeumorphButton>
                )}
                
                <NeumorphButton
                  variant="destructive"
                  size="sm"
                  onClick={() => handleDeleteTenant(tenant.id)}
                  disabled={deletingTenant === tenant.id}
                >
                  {deletingTenant === tenant.id ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <>
                      <Trash2 className="h-4 w-4 mr-1" />
                      Delete
                    </>
                  )}
                </NeumorphButton>
              </div>
            </div>
          ))}
        </div>
      )}
    </NeumorphCard>
  );
};

export default ManageTenants;
