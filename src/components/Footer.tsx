import React from 'react';
import { Shirt, Mail, Phone, MapPin } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center mb-4">
              <Shirt className="h-8 w-8 text-blue-400" />
              <span className="ml-2 text-xl font-bold text-white">247fold</span>
            </div>
            <p className="text-sm">
              Professional wash and fold laundry service serving Monmouth County communities.
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#services" className="hover:text-blue-400 transition-colors block">Services</a></li>
              <li><a href="#pricing" className="hover:text-blue-400 transition-colors block">Pricing</a></li>
              <li><a href="#how-it-works" className="hover:text-blue-400 transition-colors block">How It Works</a></li>
              <li><a href="#areas" className="hover:text-blue-400 transition-colors block">Service Areas</a></li>
            </ul>
          </div>

          <div className="space-y-2">
            <h3 className="text-white font-semibold mb-4">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-center">
                <Phone className="h-4 w-4 mr-2 flex-shrink-0" />
                <a href="tel:7324167680" className="hover:text-blue-400 transition-colors">(732) 416-7680</a>
              </li>
              <li className="flex items-center">
                <Mail className="h-4 w-4 mr-2 flex-shrink-0" />
                <a href="mailto:hello@freshfoldnj.com" className="hover:text-blue-400 transition-colors break-all">
                  hello@freshfoldnj.com
                </a>
              </li>
              <li className="flex items-center">
                <MapPin className="h-4 w-4 mr-2 flex-shrink-0" />
                Marlboro, NJ
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Business Hours</h3>
            <ul className="space-y-2 text-sm">
              <li>Monday - Friday: 7am - 9pm</li>
              <li>Saturday: 8am - 7pm</li>
              <li>Sunday: 9am - 6pm</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-sm text-center">
          <p>&copy; {new Date().getFullYear()} 247fold. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}