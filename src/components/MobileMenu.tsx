import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Link } from './ui/Link';

export function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="md:hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 text-gray-600 hover:text-blue-600"
      >
        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>

      {isOpen && (
        <div className="absolute top-16 left-0 right-0 bg-white shadow-lg border-t">
          <div className="px-4 py-2 space-y-4">
            <Link href="#services" onClick={() => setIsOpen(false)}>Services</Link>
            <Link href="#pricing" onClick={() => setIsOpen(false)}>Pricing</Link>
            <Link href="#how-it-works" onClick={() => setIsOpen(false)}>How It Works</Link>
            <Link href="#areas" onClick={() => setIsOpen(false)}>Service Areas</Link>
            <div className="pt-4 border-t">
              <button className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">
                Schedule Pickup
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}