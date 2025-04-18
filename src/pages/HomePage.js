import React, { useRef } from 'react';
import HeroSection from '../components/HeroSection';
import NewArrivals from '../components/NewArrivals';
import ConceptBanner from '../components/ConceptBanner';
import ProductList from '../components/ProductList';
import PhilosophySection from '../components/PhilosophySection';
import Footer from '../components/Footer';
import ScrollToTopButton from '../components/ScrollToTopButton';

export default function HomePage() {
    const productRef = useRef(null);
  const philosophyRef = useRef(null);

  const scrollToProducts = () => {
    productRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToPhilosophy = () => {
    philosophyRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div style={{ animation: 'fadeIn 0.5s ease-in', 
    alignItems: 'center',
    width: '100%',
    boxSizing: 'border-box',
    fontFamily: "'Playfair Display', serif",
    backgroundColor: '#e9cfc3',
    color: '#3e2c29' }}>
      <HeroSection 
      scrollToProducts={scrollToProducts}
      scrollToPhilosophy={scrollToPhilosophy}/>
      <NewArrivals />
      <ConceptBanner />
      <div ref={productRef}>
        <ProductList />
      </div>
      <div ref={philosophyRef}>
        <PhilosophySection />
      </div>
      <Footer />
      <ScrollToTopButton />
    </div>
  );
}
