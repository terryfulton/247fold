import React from 'react';
import { FAQSection } from './faq/FAQSection';
import { ContactCTA } from './faq/ContactCTA';

export function FAQ() {
  return (
    <section id="faq" className="py-16 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
          <p className="text-xl text-gray-600">
            Everything you need to know about our laundry service
          </p>
        </div>

        <div className="space-y-8">
          <FAQSection
            title="About Our Service"
            questions={[
              {
                q: "What is 247fold?",
                a: "247fold is a professional laundry and dry cleaning pickup/delivery service serving Monmouth County communities. We're your alternative to the typical laundry experience, offering convenient door-to-door service within 24-48 hours."
              },
              {
                q: "What makes us different?",
                a: "We use premium, eco-friendly cleaning solutions and professional-grade equipment. Our service includes careful sorting, expert cleaning, and perfect folding. Most importantly, we offer a 100% satisfaction guarantee on all our services."
              },
              {
                q: "Do you have a minimum order requirement?",
                a: "No minimum order is required for pay-as-you-go service. For subscriptions, you choose a monthly plan that best fits your needs."
              },
              {
                q: "What's included in the price?",
                a: "Our service includes sorting, washing, drying, folding, and packaging of your clothes. Subscription plans include free next-day delivery, while pay-as-you-go has a small delivery fee."
              }
            ]}
          />

          <FAQSection
            title="Laundry Process"
            questions={[
              {
                q: "How do you wash the clothes?",
                a: "We sort items by color and fabric type, using premium detergents and appropriate water temperatures. All items are professionally cleaned and treated with care."
              },
              {
                q: "What if I have special washing instructions?",
                a: "We're happy to follow your specific care instructions. Simply leave a note with your order or add them to your account preferences."
              },
              {
                q: "Do you separate lights and darks?",
                a: "Yes, we carefully sort all laundry by color and fabric type to prevent color bleeding and ensure optimal cleaning results."
              },
              {
                q: "What products do you use?",
                a: "We use high-quality, hypoallergenic detergents and fabric softeners. If you have specific product preferences or sensitivities, let us know."
              }
            ]}
          />

          <FAQSection
            title="Pickup & Delivery"
            questions={[
              {
                q: "What is the turnaround time?",
                a: "Standard wash & fold orders are delivered within 24-48 hours of pickup. Large orders (4+ bags) and dry cleaning may require up to 72 hours. We'll always communicate any changes to the expected delivery time."
              },
              {
                q: "How do I prepare my laundry for pickup?",
                a: "Simply place your clothes in any bag and leave it at your designated pickup location. For subscribers, we provide reusable laundry bags."
              },
              {
                q: "Can I receive a delivery if I'm not home?",
                a: "Yes! We offer contactless delivery. Just provide detailed instructions on where you'd like us to place your clean laundry, and we'll follow your preferences."
              },
              {
                q: "What are your delivery hours?",
                a: "We offer flexible pickup and delivery times Monday through Sunday. Standard delivery windows are 7am-9pm on weekdays and 8am-7pm on weekends."
              }
            ]}
          />

          <FAQSection
            title="Prohibited Items & Special Care"
            questions={[
              {
                q: "Are there items you don't clean?",
                a: "Yes, for safety and quality reasons, we cannot accept: wedding dresses, vintage clothes, wigs, fur products, purses/handbags, curtains, area rugs, sleeping bags, or items contaminated with hazardous materials, excessive pet hair, mildew, or bedbugs."
              },
              {
                q: "Do you handle specialty items?",
                a: "Yes, we offer special care for items like comforters, blankets, and pillows. These items are priced separately from our regular wash & fold service."
              },
              {
                q: "What happens if my clothes are damaged?",
                a: "While we take utmost care with your items, we maintain insurance coverage and will reimburse you for any damages that occur during our service."
              },
              {
                q: "Do you have a satisfaction guarantee?",
                a: "Yes! If you're not completely satisfied with our service, we'll re-clean your items or issue a refund."
              }
            ]}
          />
        </div>

        <ContactCTA />
      </div>
    </section>
  );
}