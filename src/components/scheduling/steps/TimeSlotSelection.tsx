import React, { useEffect, useState } from 'react';
import { OrderDetails, TimeSlot } from '../../../types/scheduling';
import { supabase } from '../../../lib/supabase';
import { Calendar, Clock, ArrowLeft, ArrowRight } from 'lucide-react';
import { format, addDays, isSameDay } from 'date-fns';

interface TimeSlotSelectionProps {
  orderDetails: Partial<OrderDetails>;
  onUpdate: (details: Partial<OrderDetails>) => void;
  onNext: () => void;
  onBack: () => void;
}

export function TimeSlotSelection({
  orderDetails,
  onUpdate,
  onNext,
  onBack
}: TimeSlotSelectionProps) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [availableSlots, setAvailableSlots] = useState<TimeSlot[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date>(addDays(new Date(), 1));

  useEffect(() => {
    loadTimeSlots();
  }, [selectedDate]);

  const loadTimeSlots = async () => {
    setLoading(true);
    setError(null);

    try {
      const { data: slots, error } = await supabase
        .from('time_slots')
        .select('*')
        .eq('is_active', true)
        .order('start_time');

      if (error) throw error;

      // In a real app, you'd also check the orders table to see which slots are still available
      setAvailableSlots(slots);
    } catch (err) {
      setError('Failed to load available time slots');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDateChange = (increment: boolean) => {
    const newDate = addDays(selectedDate, increment ? 1 : -1);
    setSelectedDate(newDate);
  };

  const handleTimeSlotSelect = (slotId: string) => {
    onUpdate({
      ...orderDetails,
      pickup_date: format(selectedDate, 'yyyy-MM-dd'),
      pickup_time_slot: slotId
    });
  };

  const isSlotSelected = (slotId: string) => {
    return orderDetails.pickup_time_slot === slotId &&
           orderDetails.pickup_date === format(selectedDate, 'yyyy-MM-dd');
  };

  const formatTimeSlot = (slot: TimeSlot) => {
    const start = new Date(`2000-01-01T${slot.start_time}`);
    const end = new Date(`2000-01-01T${slot.end_time}`);
    return `${format(start, 'h:mm a')} - ${format(end, 'h:mm a')}`;
  };

  const canProceed = orderDetails.pickup_date && orderDetails.pickup_time_slot;

  return (
    <div className="space-y-6">
      <div className="bg-blue-50 rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={() => handleDateChange(false)}
            className="p-2 rounded-full hover:bg-blue-100 transition-colors"
            disabled={isSameDay(selectedDate, addDays(new Date(), 1))}
          >
            <ArrowLeft className="h-5 w-5 text-blue-600" />
          </button>
          <div className="text-center">
            <Calendar className="h-6 w-6 text-blue-600 mx-auto mb-2" />
            <h3 className="text-lg font-semibold">
              {format(selectedDate, 'EEEE, MMMM d')}
            </h3>
          </div>
          <button
            onClick={() => handleDateChange(true)}
            className="p-2 rounded-full hover:bg-blue-100 transition-colors"
          >
            <ArrowRight className="h-5 w-5 text-blue-600" />
          </button>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-8">Loading available time slots...</div>
      ) : error ? (
        <div className="text-center text-red-600 py-8">{error}</div>
      ) : (
        <div className="grid grid-cols-2 gap-4">
          {availableSlots.map((slot) => (
            <button
              key={slot.id}
              onClick={() => handleTimeSlotSelect(slot.id)}
              className={`p-4 rounded-lg border ${
                isSlotSelected(slot.id)
                  ? 'border-blue-600 bg-blue-50'
                  : 'border-gray-200 hover:border-blue-200 hover:bg-gray-50'
              } transition-colors`}
            >
              <Clock className="h-5 w-5 text-blue-600 mx-auto mb-2" />
              <span className="block font-medium">
                {formatTimeSlot(slot)}
              </span>
            </button>
          ))}
        </div>
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
          disabled={!canProceed}
          className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
        >
          <span>Continue to Address</span>
          <ArrowRight className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
} 