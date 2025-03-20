
import { useEffect, useState } from 'react';
import { NeumorphCard } from './NeumorphCard';
import { NeumorphButton } from './NeumorphButton';
import { Loader2, Home, Plus, PencilLine, Trash2 } from 'lucide-react';
import CurrencyDisplay from './CurrencyDisplay';
import { Property, loadProperties, deleteProperty } from '@/services/PropertyService';
import { useProfile } from '@/hooks/useProfile';
import { toast } from 'sonner';

type PropertyListProps = {
  onAddProperty?: () => void;
  onEditProperty?: (property: Property) => void;
};

const PropertyList = ({ onAddProperty, onEditProperty }: PropertyListProps) => {
  const { profile } = useProfile();
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingProperty, setDeletingProperty] = useState<string | null>(null);

  useEffect(() => {
    if (!profile || profile.user_type !== 'landlord') return;
    
    fetchProperties();
    
    // Subscribe to property changes
    const channel = supabase
      .channel('public:properties')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'properties' }, 
        () => {
          fetchProperties();
        }
      )
      .subscribe();
    
    return () => {
      supabase.removeChannel(channel);
    };
  }, [profile]);

  const fetchProperties = async () => {
    if (!profile) return;
    
    setLoading(true);
    const propertiesData = await loadProperties(profile.id);
    setProperties(propertiesData);
    setLoading(false);
  };

  const handleDeleteProperty = async (propertyId: string) => {
    if (window.confirm('Are you sure you want to delete this property? This action cannot be undone.')) {
      setDeletingProperty(propertyId);
      const success = await deleteProperty(propertyId);
      if (success) {
        setProperties(properties.filter(property => property.id !== propertyId));
        toast.success('Property deleted successfully');
      }
      setDeletingProperty(null);
    }
  };

  if (!profile || profile.user_type !== 'landlord') {
    return (
      <NeumorphCard className="p-6">
        <div className="text-center text-muted-foreground">
          Only landlords can manage properties
        </div>
      </NeumorphCard>
    );
  }

  return (
    <NeumorphCard className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-semibold">Properties</h3>
        <div className="flex gap-2">
          {onAddProperty && (
            <NeumorphButton 
              variant="primary" 
              size="sm"
              onClick={onAddProperty}
            >
              <Plus className="h-4 w-4 mr-1" />
              Add Property
            </NeumorphButton>
          )}
          <NeumorphButton 
            variant="secondary" 
            size="sm"
            onClick={() => fetchProperties()}
          >
            Refresh
          </NeumorphButton>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-32">
          <Loader2 className="h-6 w-6 animate-spin text-primary" />
        </div>
      ) : properties.length === 0 ? (
        <div className="text-center text-muted-foreground py-8">
          No properties added yet. Add your first property to get started.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {properties.map(property => (
            <div 
              key={property.id} 
              className="neumorph p-4 rounded-lg"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 rounded-full bg-primary/10">
                  <Home className="h-5 w-5 text-primary" />
                </div>
                <h4 className="font-medium">{property.name}</h4>
              </div>
              
              <div className="mb-3">
                <p className="text-sm text-muted-foreground">{property.address}</p>
                <p className="text-sm text-muted-foreground">{property.city}, {property.state} {property.zip}</p>
              </div>
              
              <div className="flex justify-between items-center mb-4">
                <div>
                  <p className="text-xs text-muted-foreground">Monthly Rent</p>
                  <CurrencyDisplay amount={property.monthly_rent} className="font-bold" />
                </div>
                <div className="text-sm text-right">
                  <span className="text-muted-foreground mr-1">Beds:</span>
                  <span className="font-medium">{property.bedrooms}</span>
                  <span className="text-muted-foreground mx-1">Baths:</span>
                  <span className="font-medium">{property.bathrooms}</span>
                </div>
              </div>
              
              <div className="flex gap-2 justify-end">
                {onEditProperty && (
                  <NeumorphButton
                    variant="secondary"
                    size="sm"
                    onClick={() => onEditProperty(property)}
                  >
                    <PencilLine className="h-4 w-4 mr-1" />
                    Edit
                  </NeumorphButton>
                )}
                
                <NeumorphButton
                  variant="destructive"
                  size="sm"
                  onClick={() => handleDeleteProperty(property.id)}
                  disabled={deletingProperty === property.id}
                >
                  {deletingProperty === property.id ? (
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

export default PropertyList;
