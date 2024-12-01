import React from 'react';
import { CalendarCheck, PackageCheck, Timer, Truck, Sparkles, CreditCard } from 'lucide-react';

const steps = [
  {
    icon: CalendarCheck,
    title: "Schedule Your Pickup",
    description: "Choose a convenient time slot for collection"
  },
  {
    icon: PackageCheck,
    title: "We Collect Your Laundry",
    description: "Place your items in our special laundry bag"
  },
  {
    icon: Sparkles,
    title: "Professional Cleaning",
    description: "Your clothes are sorted, cleaned, and folded with care"
  },
  {
    icon: Timer,
    title: "Quality Check",
    description: "Each item is inspected for cleanliness and damage"
  },
  {
    icon: Truck,
    title: "Fast Delivery",
    description: "Clean laundry delivered to your door within 24 hours"
  },
  {
    icon: CreditCard,
    title: "Easy Payment",
    description: "Secure automatic payment after delivery"
  }
];

export function OrderProcess() {
  return (
    <div className="space-y-8">
      <h3 className="text-2xl font-bold mb-8 text-center">How It Works</h3>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {steps.map((step, index) => {
          const Icon = step.icon;
          return (
            <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden group hover:border-blue-200 hover:shadow-md transition-all">
              <div className="p-6">
                <div className="mb-4 relative">
                  <div className="absolute -left-2 -top-2 bg-blue-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-sm font-medium">
                    {index + 1}
                  </div>
                  <div className="w-16 h-16 mx-auto bg-blue-50 rounded-full flex items-center justify-center group-hover:bg-blue-100 transition-colors">
                    <Icon className="h-8 w-8 text-blue-600" />
                  </div>
                </div>
                <div className="text-center">
                  <h4 className="font-semibold mb-2 text-gray-900">{step.title}</h4>
                  <p className="text-gray-600 text-sm">{step.description}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}