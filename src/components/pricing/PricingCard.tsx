import React from 'react';
import { Check, Info } from 'lucide-react';

interface PricingFeature {
  text: string;
  highlight?: boolean;
  prefix?: string;
  info?: string;
}

interface PricingCardProps {
  title: string;
  pricePerBag: number;
  pricePerPound?: number;
  features: PricingFeature[];
  description?: string;
  monthlyQuantity?: number;
  monthlyTotal?: number;
  variant?: 'default' | 'highlight';
}

export function PricingCard({
  title,
  pricePerBag,
  pricePerPound,
  features,
  description,
  monthlyQuantity,
  monthlyTotal,
  variant = 'default'
}: PricingCardProps) {
  return (
    <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-bold mb-1">{title}</h3>
          {description && <p className="text-sm text-gray-600">{description}</p>}
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold">${pricePerBag}</div>
          <div className="text-sm text-gray-500">per bag</div>
          {pricePerPound && (
            <div className="text-xs text-gray-500">≈ ${pricePerPound}/lb</div>
          )}
        </div>
      </div>

      {monthlyQuantity && (
        <div className="bg-orange-50 rounded-md p-2 mb-4 text-sm">
          <div className="font-medium">{monthlyQuantity} Bags/Month</div>
          <div className="text-gray-600">${monthlyTotal}/month</div>
        </div>
      )}

      <ul className="space-y-2 text-sm mb-4">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start">
            <Check className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
            <span className="flex-1">
              {feature.prefix && (
                <span className={feature.highlight ? 'text-orange-500 font-medium' : ''}>
                  {feature.prefix}{' '}
                </span>
              )}
              {feature.text}
              {feature.info && (
                <div className="text-xs text-gray-500 mt-0.5">{feature.info}</div>
              )}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}