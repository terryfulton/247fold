import React from 'react';
import { MapPin } from 'lucide-react';

export function ServiceAreas() {
  const areas = [
    "Marlboro",
    "Manalapan",
    "Freehold",
    "Old Bridge",
    "Englishtown",
    "Monroe Township",
    "Colts Neck",
    "Howell",
    "Matawan",
    "Aberdeen"
  ];

  return (
    <section id="areas" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Service Areas</h2>
          <p className="text-xl text-gray-600">We currently serve these Monmouth County communities</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
          {areas.map((area) => (
            <div key={area} className="flex items-center justify-center p-4 bg-gray-50 rounded-lg">
              <MapPin className="h-4 w-4 text-blue-600 mr-2" />
              <span className="text-gray-700">{area}</span>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-4">Don't see your area? Contact us to check if we can serve your location.</p>
          <button className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors">
            Check Your Address
          </button>
        </div>
      </div>
    </section>
  );
}