import React from 'react';
import Header from './components/Header';
import Carousel from './components/Carousel';
import Footer from './components/Footer';
import { sections } from './data/listings';
import './index.css';

export default function App() {
  return (
    <div style={{ minHeight: '100vh', background: '#fff', color: '#222' }}>
      <Header />
      <main id="listings" className="container" style={{ paddingTop: '20px' }}>
        {sections.map((section) => (
          <Carousel key={section.id} section={section} />
        ))}
      </main>
      <Footer />
    </div>
  );
}
