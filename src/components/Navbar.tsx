import React from 'react';
import { Shirt, MapPin, PhoneCall } from 'lucide-react';
import { Link } from './ui/Link';
import { MobileMenu } from './MobileMenu';

export function Navbar() {
  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <Shirt className="h-8 w-8 text-blue-600" />
            <span className="ml-2 text-xl font-bold text-gray-900">247fold</span>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <Link href="#services">Services</Link>
            <Link href="#pricing">Pricing</Link>
            <Link href="#how-it-works">How It Works</Link>
            <Link href="#areas">Service Areas</Link>
          </div>

          <div className="flex items-center">
            <div className="hidden md:flex items-center space-x-4">
              <div className="flex items-center">
                <MapPin className="h-4 w-4 text-blue-600" />
                <span className="ml-1 text-sm text-gray-600">Monmouth County</span>
              </div>
              <div className="flex items-center">
                <PhoneCall className="h-4 w-4 text-blue-600" />
                <span className="ml-1 text-sm text-gray-600">(732) 416-7680</span>
              </div>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">
                Schedule Pickup
              </button>
            </div>
            <MobileMenu />
          </div>
        </div>
      </div>
    </nav>
  );
}