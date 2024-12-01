import React from 'react';
import { BagGuide } from './process/BagGuide';
import { OrderProcess } from './process/OrderProcess';

export function ProcessExplanation() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Our Process</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We've simplified laundry day with our efficient process and generous bag capacity.
            Here's everything you need to know about our service.
          </p>
        </div>

        <BagGuide />
        <OrderProcess />
      </div>
    </section>
  );
}