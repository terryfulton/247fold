import React, { useEffect, useState } from 'react';
import { OrderDetails, Address } from '../../../types/scheduling';
import { supabase } from '../../../lib/supabase';
import { useAuth } from '../../../contexts/AuthContext';
import { MapPin, ArrowLeft, ArrowRight, Plus } from 'lucide-react';

interface AddressFormProps {
  orderDetails: Partial<OrderDetails>;
  onUpdate: (details: Partial<OrderDetails>) => void;
  onNext: () => void;
  onBack: () => void;
}

export function AddressForm({
  orderDetails,
  onUpdate,
  onNext,
  onBack
}: AddressFormProps) {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [showNewAddressForm, setShowNewAddressForm] = useState(false);
  const [newAddress, setNewAddress] = useState({
    street: '',
    city: '',
    state: 'NJ',
    zip: '',
    delivery_instructions: ''
  });

  useEffect(() => {
    if (user) {
      loadAddresses();
    }
  }, [user]);

  const loadAddresses = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('addresses')
        .select('*')
        .eq('user_id', user!.id)
        .order('is_default', { ascending: false });

      if (error) throw error;
      setAddresses(data || []);

      // If user has addresses but none selected, select the default one
      if (data?.length && !orderDetails.address_id) {
        const defaultAddress = data.find(addr => addr.is_default);
        if (defaultAddress) {
          onUpdate({ ...orderDetails, address_id: defaultAddress.id });
        }
      }
    } catch (err) {
      console.error('Error loading addresses:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddressSelect = (addressId: string) => {
    onUpdate({ ...orderDetails, address_id: addressId });
  };

  const handleNewAddressSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data, error } = await supabase
        .from('addresses')
        .insert([
          {
            ...newAddress,
            user_id: user!.id,
            is_default: addresses.length === 0
          }
        ])
        .select()
        .single();

      if (error) throw error;

      setAddresses([...addresses, data]);
      onUpdate({ ...orderDetails, address_id: data.id });
      setShowNewAddressForm(false);
      setNewAddress({
        street: '',
        city: '',
        state: 'NJ',
        zip: '',
        delivery_instructions: ''
      });
    } catch (err) {
      console.error('Error adding address:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {!showNewAddressForm ? (
        <>
          <div className="space-y-4">
            {addresses.map((address) => (
              <button
                key={address.id}
                onClick={() => handleAddressSelect(address.id)}
                className={`w-full p-4 rounded-lg border text-left ${
                  orderDetails.address_id === address.id
                    ? 'border-blue-600 bg-blue-50'
                    : 'border-gray-200 hover:border-blue-200'
                } transition-colors`}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <div className="font-medium">{address.street}</div>
                    <div className="text-gray-600">
                      {address.city}, {address.state} {address.zip}
                    </div>
                    {address.delivery_instructions && (
                      <div className="text-sm text-gray-500 mt-2">
                        {address.delivery_instructions}
                      </div>
                    )}
                  </div>
                  {address.is_default && (
                    <span className="text-sm text-blue-600 font-medium">Default</span>
                  )}
                </div>
              </button>
            ))}
          </div>

          <button
            onClick={() => setShowNewAddressForm(true)}
            className="w-full p-4 rounded-lg border border-dashed border-gray-300 text-gray-600 hover:border-blue-300 hover:text-blue-600 transition-colors flex items-center justify-center space-x-2"
          >
            <Plus className="h-5 w-5" />
            <span>Add New Address</span>
          </button>
        </>
      ) : (
        <form onSubmit={handleNewAddressSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Street Address
            </label>
            <input
              type="text"
              required
              value={newAddress.street}
              onChange={(e) => setNewAddress({ ...newAddress, street: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              placeholder="123 Main St"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                City
              </label>
              <input
                type="text"
                required
                value={newAddress.city}
                onChange={(e) => setNewAddress({ ...newAddress, city: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                placeholder="Marlboro"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                ZIP Code
              </label>
              <input
                type="text"
                required
                value={newAddress.zip}
                onChange={(e) => setNewAddress({ ...newAddress, zip: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                placeholder="07746"
                pattern="[0-9]{5}"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Delivery Instructions (Optional)
            </label>
            <textarea
              value={newAddress.delivery_instructions}
              onChange={(e) => setNewAddress({ ...newAddress, delivery_instructions: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              placeholder="Leave by the front door, garage code: 1234, etc."
              rows={2}
            />
          </div>

          <div className="flex space-x-4">
            <button
              type="button"
              onClick={() => setShowNewAddressForm(false)}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50"
            >
              {loading ? 'Saving...' : 'Save Address'}
            </button>
          </div>
        </form>
      )}

      <div className="flex justify-between pt-6 border-t">
        <button
          onClick={onBack}
          className="px-6 py-2 text-gray-600 hover:text-gray-900 transition-colors flex items-center space-x-2"
        >
          <ArrowLeft className="h-5 w-5" />
          <span>Back</span>
        </button>
        
        <button
          onClick={onNext}
          disabled={!orderDetails.address_id}
          className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
        >
          <span>Review Order</span>
          <ArrowRight className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
} 