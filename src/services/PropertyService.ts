
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export type Property = {
  id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  monthly_rent: number;
  bedrooms: number;
  bathrooms: number;
  square_feet: number | null;
  description: string | null;
  image_url: string | null;
  landlord_id: string;
  created_at: string | null;
};

export type Tenant = {
  id: string;
  user_id: string;
  first_name: string | null;
  last_name: string | null;
  phone: string | null;
  avatar_url: string | null;
  property_id?: string | null;
  property_name?: string | null;
};

export const loadProperties = async (landlordProfileId: string) => {
  try {
    const { data, error } = await supabase
      .from('properties')
      .select('*')
      .eq('landlord_id', landlordProfileId);
    
    if (error) {
      console.error('Error loading properties:', error);
      toast.error('Failed to load properties');
      return [];
    }
    
    return data;
  } catch (error) {
    console.error('Error in loadProperties:', error);
    toast.error('Failed to load properties');
    return [];
  }
};

export const addProperty = async (property: Omit<Property, 'id' | 'created_at'>) => {
  try {
    const { data, error } = await supabase
      .from('properties')
      .insert(property)
      .select()
      .single();
    
    if (error) {
      console.error('Error adding property:', error);
      toast.error('Failed to add property');
      return null;
    }
    
    toast.success('Property added successfully');
    return data;
  } catch (error) {
    console.error('Error in addProperty:', error);
    toast.error('Failed to add property');
    return null;
  }
};

export const updateProperty = async (id: string, updates: Partial<Property>) => {
  try {
    const { data, error } = await supabase
      .from('properties')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    
    if (error) {
      console.error('Error updating property:', error);
      toast.error('Failed to update property');
      return null;
    }
    
    toast.success('Property updated successfully');
    return data;
  } catch (error) {
    console.error('Error in updateProperty:', error);
    toast.error('Failed to update property');
    return null;
  }
};

export const deleteProperty = async (id: string) => {
  try {
    const { error } = await supabase
      .from('properties')
      .delete()
      .eq('id', id);
    
    if (error) {
      console.error('Error deleting property:', error);
      toast.error('Failed to delete property');
      return false;
    }
    
    toast.success('Property deleted successfully');
    return true;
  } catch (error) {
    console.error('Error in deleteProperty:', error);
    toast.error('Failed to delete property');
    return false;
  }
};

export const loadTenants = async () => {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('user_type', 'tenant');
    
    if (error) {
      console.error('Error loading tenants:', error);
      toast.error('Failed to load tenants');
      return [];
    }
    
    return data;
  } catch (error) {
    console.error('Error in loadTenants:', error);
    toast.error('Failed to load tenants');
    return [];
  }
};

export const deleteTenant = async (tenantProfileId: string) => {
  try {
    const { error } = await supabase
      .from('profiles')
      .delete()
      .eq('id', tenantProfileId);
    
    if (error) {
      console.error('Error deleting tenant:', error);
      toast.error('Failed to delete tenant');
      return false;
    }
    
    toast.success('Tenant deleted successfully');
    return true;
  } catch (error) {
    console.error('Error in deleteTenant:', error);
    toast.error('Failed to delete tenant');
    return false;
  }
};
