import React from 'react';
import { Mail, Phone } from 'lucide-react';

export function ContactCTA() {
  return (
    <div className="mt-12 bg-blue-50 rounded-lg p-6 text-center">
      <h3 className="text-lg font-semibold mb-4">Still have questions?</h3>
      <p className="text-gray-600 mb-6">
        We're here to help! Reach out to us through any of these channels:
      </p>
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
        <a
          href="tel:7324167680"
          className="flex items-center px-4 py-2 bg-white rounded-md shadow-sm hover:bg-gray-50 transition-colors"
        >
          <Phone className="h-5 w-5 text-blue-600 mr-2" />
          <span>(732) 416-7680</span>
        </a>
        <a
          href="mailto:hello@freshfoldnj.com"
          className="flex items-center px-4 py-2 bg-white rounded-md shadow-sm hover:bg-gray-50 transition-colors"
        >
          <Mail className="h-5 w-5 text-blue-600 mr-2" />
          <span>hello@freshfoldnj.com</span>
        </a>
      </div>
    </div>
  );
}