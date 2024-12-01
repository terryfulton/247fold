import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface FAQQuestion {
  q: string;
  a: string;
}

interface FAQSectionProps {
  title: string;
  questions: FAQQuestion[];
}

export function FAQSection({ title, questions }: FAQSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <h3 className="text-lg font-semibold p-4 bg-gray-50 border-b border-gray-200">
        {title}
      </h3>
      <div className="divide-y divide-gray-200">
        {questions.map((question, index) => (
          <div key={index} className="cursor-pointer">
            <div
              className="flex justify-between items-center p-4 hover:bg-gray-50"
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
            >
              <h4 className="text-base font-medium pr-8">{question.q}</h4>
              {openIndex === index ? (
                <ChevronUp className="h-5 w-5 text-gray-500 flex-shrink-0" />
              ) : (
                <ChevronDown className="h-5 w-5 text-gray-500 flex-shrink-0" />
              )}
            </div>
            {openIndex === index && (
              <div className="px-4 pb-4 text-gray-600">
                {question.a}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}