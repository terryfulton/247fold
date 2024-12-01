import React from 'react';

const items = [
  { 
    name: 'Comforter', 
    price: 44.95,
    info: 'Any size, includes cleaning & delivery'
  },
  { 
    name: 'Blanket', 
    price: 17.95,
    info: 'Regular or throw blankets'
  },
  { 
    name: 'Pillow', 
    price: 24.95,
    info: 'Deep clean & sanitize'
  }
];

export function ByThePiece() {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
      <h3 className="text-lg font-bold mb-4">Specialty Items</h3>
      <ul className="space-y-3">
        {items.map((item) => (
          <li key={item.name} className="border-b border-gray-100 pb-3 last:border-0 last:pb-0">
            <div className="flex justify-between items-start">
              <span className="font-medium">{item.name}</span>
              <span className="font-bold text-orange-500">
                ${item.price.toFixed(2)}
              </span>
            </div>
            <p className="text-sm text-gray-500 mt-1">{item.info}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}