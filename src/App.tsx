import React from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Pricing } from './components/Pricing';
import { ProcessExplanation } from './components/ProcessExplanation';
import { HowItWorks } from './components/HowItWorks';
import { ServiceAreas } from './components/ServiceAreas';
import { FAQ } from './components/FAQ';
import { Footer } from './components/Footer';

function App() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <Pricing />
      <ProcessExplanation />
      <HowItWorks />
      <ServiceAreas />
      <FAQ />
      <Footer />
    </div>
  );
}

export default App;