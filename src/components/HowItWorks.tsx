import React from 'react';
import { Calendar, Package, Truck, Check } from 'lucide-react';

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">How It Works</h2>
          <p className="text-xl text-gray-600">Four simple steps to fresh, clean laundry</p>
        </div>

        <div className="grid md:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Calendar className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="font-semibold mb-2">1. Schedule</h3>
            <p className="text-gray-600">Book your pickup online or through our app</p>
          </div>

          <div className="text-center">
            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Package className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="font-semibold mb-2">2. We Collect</h3>
            <p className="text-gray-600">We pick up your clothes at your doorstep</p>
          </div>

          <div className="text-center">
            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="font-semibold mb-2">3. We Clean</h3>
            <p className="text-gray-600">Your clothes are professionally cleaned</p>
          </div>

          <div className="text-center">
            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Truck className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="font-semibold mb-2">4. We Deliver</h3>
            <p className="text-gray-600">Clean clothes delivered to your door</p>
          </div>
        </div>
      </div>
    </section>
  );
}