
import { useState, useEffect } from 'react';
import { NeumorphCard } from './NeumorphCard';
import { NeumorphButton } from './NeumorphButton';
import { Loader2, X } from 'lucide-react';
import { Property, addProperty, updateProperty } from '@/services/PropertyService';
import { useProfile } from '@/hooks/useProfile';

type PropertyFormProps = {
  property?: Property;
  onClose: () => void;
  onSave: () => void;
};

const PropertyForm = ({ property, onClose, onSave }: PropertyFormProps) => {
  const { profile } = useProfile();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    monthly_rent: 0,
    bedrooms: 1,
    bathrooms: 1,
    square_feet: 0,
    description: '',
  });

  useEffect(() => {
    if (property) {
      setFormData({
        name: property.name,
        address: property.address,
        city: property.city,
        state: property.state,
        zip: property.zip,
        monthly_rent: property.monthly_rent,
        bedrooms: property.bedrooms,
        bathrooms: property.bathrooms,
        square_feet: property.square_feet || 0,
        description: property.description || '',
      });
    }
  }, [property]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    // Convert numeric inputs to numbers
    if (type === 'number') {
      setFormData(prev => ({ ...prev, [name]: parseFloat(value) || 0 }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!profile) return;
    
    setLoading(true);
    
    const propertyData = {
      ...formData,
      landlord_id: profile.id,
    };
    
    try {
      if (property) {
        // Update existing property
        await updateProperty(property.id, propertyData);
      } else {
        // Add new property
        await addProperty(propertyData as any);
      }
      
      onSave();
    } catch (error) {
      console.error('Error saving property:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <NeumorphCard className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-semibold">
          {property ? 'Edit Property' : 'Add New Property'}
        </h3>
        <button
          onClick={onClose}
          className="text-muted-foreground hover:text-foreground"
        >
          <X className="h-5 w-5" />
        </button>
      </div>
      
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-1">
              Property Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="input-neumorph w-full"
              required
            />
          </div>
          
          <div>
            <label htmlFor="monthly_rent" className="block text-sm font-medium mb-1">
              Monthly Rent (UGX)
            </label>
            <input
              type="number"
              id="monthly_rent"
              name="monthly_rent"
              value={formData.monthly_rent}
              onChange={handleChange}
              className="input-neumorph w-full"
              min="0"
              required
            />
          </div>
          
          <div className="md:col-span-2">
            <label htmlFor="address" className="block text-sm font-medium mb-1">
              Address
            </label>
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="input-neumorph w-full"
              required
            />
          </div>
          
          <div>
            <label htmlFor="city" className="block text-sm font-medium mb-1">
              City
            </label>
            <input
              type="text"
              id="city"
              name="city"
              value={formData.city}
              onChange={handleChange}
              className="input-neumorph w-full"
              required
            />
          </div>
          
          <div>
            <label htmlFor="state" className="block text-sm font-medium mb-1">
              State/Region
            </label>
            <input
              type="text"
              id="state"
              name="state"
              value={formData.state}
              onChange={handleChange}
              className="input-neumorph w-full"
              required
            />
          </div>
          
          <div>
            <label htmlFor="zip" className="block text-sm font-medium mb-1">
              ZIP/Postal Code
            </label>
            <input
              type="text"
              id="zip"
              name="zip"
              value={formData.zip}
              onChange={handleChange}
              className="input-neumorph w-full"
              required
            />
          </div>
          
          <div>
            <label htmlFor="square_feet" className="block text-sm font-medium mb-1">
              Square Feet
            </label>
            <input
              type="number"
              id="square_feet"
              name="square_feet"
              value={formData.square_feet}
              onChange={handleChange}
              className="input-neumorph w-full"
              min="0"
            />
          </div>
          
          <div>
            <label htmlFor="bedrooms" className="block text-sm font-medium mb-1">
              Bedrooms
            </label>
            <input
              type="number"
              id="bedrooms"
              name="bedrooms"
              value={formData.bedrooms}
              onChange={handleChange}
              className="input-neumorph w-full"
              min="0"
              required
            />
          </div>
          
          <div>
            <label htmlFor="bathrooms" className="block text-sm font-medium mb-1">
              Bathrooms
            </label>
            <input
              type="number"
              id="bathrooms"
              name="bathrooms"
              value={formData.bathrooms}
              onChange={handleChange}
              className="input-neumorph w-full"
              min="0"
              required
            />
          </div>
          
          <div className="md:col-span-2">
            <label htmlFor="description" className="block text-sm font-medium mb-1">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="input-neumorph w-full"
              rows={3}
            />
          </div>
        </div>
        
        <div className="flex justify-end gap-2">
          <NeumorphButton
            type="button"
            variant="secondary"
            onClick={onClose}
          >
            Cancel
          </NeumorphButton>
          
          <NeumorphButton
            type="submit"
            variant="primary"
            disabled={loading}
          >
            {loading ? (
              <Loader2 className="h-5 w-5 animate-spin mr-1" />
            ) : null}
            {property ? 'Update Property' : 'Add Property'}
          </NeumorphButton>
        </div>
      </form>
    </NeumorphCard>
  );
};

export default PropertyForm;
