import React, { useCallback, useEffect, useRef, useState } from 'react';
import type { Section } from '../data/listings';
import ListingCard from './ListingCard';

function Chevron({ dir }: { dir: 'left' | 'right' }) {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {dir === 'left' ? <path d="M15 18l-6-6 6-6" /> : <path d="M9 18l6-6-6-6" />}
    </svg>
  );
}

export default function Carousel({ section }: { section: Section }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const updateArrows = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setAtStart(el.scrollLeft <= 2);
    setAtEnd(el.scrollLeft >= max - 2);
  }, []);

  useEffect(() => {
    updateArrows();
    const el = trackRef.current;
    if (!el) return;
    el.addEventListener('scroll', updateArrows, { passive: true });
    window.addEventListener('resize', updateArrows);
    return () => {
      el.removeEventListener('scroll', updateArrows);
      window.removeEventListener('resize', updateArrows);
    };
  }, [updateArrows]);

  const scrollByPage = (dir: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * el.clientWidth * 0.9, behavior: 'smooth' });
  };

  return (
    <section style={{ margin: '8px 0 22px' }}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '8px',
        }}
      >
        <button
          type="button"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            border: 'none',
            background: 'transparent',
            cursor: 'pointer',
            padding: 0,
          }}
        >
          <h2 style={{ fontSize: '22px', fontWeight: 700, color: '#222' }}>{section.title}</h2>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#222" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M9 18l6-6-6-6" />
          </svg>
        </button>

        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            type="button"
            className="round-btn"
            aria-label="Previous"
            onClick={() => scrollByPage(-1)}
            disabled={atStart}
          >
            <Chevron dir="left" />
          </button>
          <button
            type="button"
            className="round-btn"
            aria-label="Next"
            onClick={() => scrollByPage(1)}
            disabled={atEnd}
          >
            <Chevron dir="right" />
          </button>
        </div>
      </div>

      <div className="carousel-track" ref={trackRef}>
        {section.listings.map((listing) => (
          <div className="carousel-card" key={listing.id}>
            <ListingCard listing={listing} />
          </div>
        ))}
      </div>
    </section>
  );
}
