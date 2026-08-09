import React from 'react';
import Navbar from './components/Navbar';
import ListingRow from './components/ListingRow';
import Footer from './components/Footer';
import { sections } from './data/listings';
import './index.css';

export default function App() {
  return (
    <div style={{ minHeight: '100vh', background: '#ffffff', color: '#222222' }}>
      <Navbar />
      <main
        style={{
          maxWidth: 1280,
          margin: '0 auto',
          padding: '24px 40px 48px',
          display: 'flex',
          flexDirection: 'column',
          gap: 34,
        }}
      >
        {sections.map((section) => (
          <ListingRow key={section.id} section={section} />
        ))}
      </main>
      <Footer />
    </div>
  );
}
