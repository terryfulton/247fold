import React from 'react';
import { Scale, Ruler, ShoppingBag } from 'lucide-react';

export function BagGuide() {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-12">
      <h3 className="text-xl font-bold mb-6 text-center">Understanding Our Bags</h3>
      
      <div className="grid md:grid-cols-3 gap-6">
        <div className="flex flex-col items-center text-center p-4 bg-blue-50 rounded-lg">
          <Scale className="h-8 w-8 text-blue-600 mb-3" />
          <h4 className="font-semibold mb-2">Capacity</h4>
          <p className="text-gray-600">Each bag holds up to 25 lbs of laundry (approximately 2-3 loads)</p>
        </div>

        <div className="flex flex-col items-center text-center p-4 bg-blue-50 rounded-lg">
          <Ruler className="h-8 w-8 text-blue-600 mb-3" />
          <h4 className="font-semibold mb-2">Size Guide</h4>
          <p className="text-gray-600">Fits about 2 weeks of clothes for one person or 1 week for two</p>
        </div>

        <div className="flex flex-col items-center text-center p-4 bg-blue-50 rounded-lg">
          <ShoppingBag className="h-8 w-8 text-blue-600 mb-3" />
          <h4 className="font-semibold mb-2">What Fits?</h4>
          <p className="text-gray-600">15-20 shirts, 4-5 pairs of jeans, towels, bedding, etc.</p>
        </div>
      </div>
    </div>
  );
}