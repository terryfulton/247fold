import React from 'react';
import { PricingCard } from './pricing/PricingCard';
import { ByThePiece } from './pricing/ByThePiece';
import { ArrowRight } from 'lucide-react';

export function Pricing() {
  return (
    <section id="pricing" className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Simple, Transparent Pricing</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Choose between flexible subscriptions or pay-as-you-go. All plans include professional cleaning, 
            fabric care, and convenient delivery options.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <PricingCard
            title="Monthly Subscription"
            description="Best value for regular laundry needs"
            pricePerBag={49}
            pricePerPound={2.13}
            features={[
              { text: "4 bags per month included", info: "≈ 100 lbs of laundry" },
              { text: "Free next-day delivery", highlight: true },
              { text: "Priority scheduling" },
              { text: "No additional fees", highlight: true },
              { text: "Rollover unused bags", info: "Valid for up to 2 months" }
            ]}
          />

          <PricingCard
            title="Pay As You Go"
            description="Perfect for occasional needs"
            pricePerBag={55}
            pricePerPound={2.39}
            features={[
              { text: "25 lbs per bag (≈ 2-3 loads)", info: "Extra weight: $3/lb" },
              { text: "Next-day delivery: $7.95", highlight: true },
              { text: "Same-day delivery: $14.95", highlight: true },
              { text: "Service fee: $8.95 per order", highlight: true },
              { text: "No minimum order required" }
            ]}
          />
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
              <h3 className="text-lg font-bold mb-4">Monthly Plan Options</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                  <div>
                    <span className="font-medium">2 Bags/Month</span>
                    <p className="text-sm text-gray-500">50 lbs total</p>
                  </div>
                  <div className="text-right">
                    <div className="font-bold">$55/bag</div>
                    <div className="text-sm text-gray-500">$110/month</div>
                  </div>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                  <div>
                    <span className="font-medium">4 Bags/Month</span>
                    <p className="text-sm text-gray-500">100 lbs total</p>
                  </div>
                  <div className="text-right">
                    <div className="font-bold">$52/bag</div>
                    <div className="text-sm text-gray-500">$208/month</div>
                  </div>
                </div>
                <div className="flex items-center justify-between p-3 bg-blue-50 rounded-md">
                  <div>
                    <span className="font-medium">6 Bags/Month</span>
                    <p className="text-sm text-gray-500">150 lbs total</p>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-blue-600">$49/bag</div>
                    <div className="text-sm text-gray-500">$294/month</div>
                  </div>
                </div>
              </div>
              <button className="w-full mt-4 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors flex items-center justify-center">
                Choose Monthly Plan <ArrowRight className="ml-2 h-4 w-4" />
              </button>
            </div>
          </div>
          
          <div className="md:col-span-1">
            <ByThePiece />
          </div>
        </div>
      </div>
    </section>
  );
}