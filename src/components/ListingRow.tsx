import React, { useEffect, useRef, useState } from 'react';
import type { Section } from '../data/listings';
import PropertyCard from './PropertyCard';
import { useColumns } from '../hooks/useColumns';
import { ChevronLeft, ChevronRight, ArrowRight } from './icons';

const GAP = 16;

export default function ListingRow({ section }: { section: Section }) {
  const cols = useColumns();
  const trackRef = useRef<HTMLDivElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const updateEdges = () => {
    const el = trackRef.current;
    if (!el) return;
    setAtStart(el.scrollLeft <= 2);
    setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 2);
  };

  useEffect(() => {
    updateEdges();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cols]);

  const scrollByPage = (dir: number) => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * el.clientWidth * 0.92, behavior: 'smooth' });
  };

  return (
    <section style={{ marginTop: 4 }}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: 14,
        }}
      >
        <button
          type="button"
          onClick={(e) => e.preventDefault()}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            background: 'none',
            border: 'none',
            padding: 0,
            color: '#222222',
          }}
        >
          <h2 style={{ fontSize: 22, fontWeight: 600 }}>{section.title}</h2>
          <ArrowRight size={17} style={{ marginTop: 3 }} />
        </button>

        <div style={{ display: 'flex', gap: 8 }}>
          <RoundButton
            disabled={atStart}
            onClick={() => scrollByPage(-1)}
            aria-label="Scroll left"
          >
            <ChevronLeft size={14} />
          </RoundButton>
          <RoundButton
            disabled={atEnd}
            onClick={() => scrollByPage(1)}
            aria-label="Scroll right"
          >
            <ChevronRight size={14} />
          </RoundButton>
        </div>
      </div>

      <div
        ref={trackRef}
        className="hscroll"
        onScroll={updateEdges}
        style={{ gap: GAP, paddingBottom: 4 }}
      >
        {section.listings.map((listing) => (
          <div
            key={listing.id}
            style={{
              flex: `0 0 calc((100% - ${(cols - 1) * GAP}px) / ${cols})`,
              minWidth: 0,
            }}
          >
            <PropertyCard listing={listing} />
          </div>
        ))}
      </div>
    </section>
  );
}

function RoundButton({
  disabled,
  children,
  onClick,
  ...rest
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const [hover, setHover] = useState(false);
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        width: 30,
        height: 30,
        borderRadius: '50%',
        border: '1px solid #dddddd',
        background: '#ffffff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: disabled ? '#c2c2c2' : '#222222',
        opacity: disabled ? 0.6 : 1,
        cursor: disabled ? 'default' : 'pointer',
        transform: hover && !disabled ? 'scale(1.06)' : 'scale(1)',
        boxShadow: hover && !disabled ? '0 2px 6px rgba(0,0,0,0.12)' : 'none',
        transition: 'all 0.15s ease',
      }}
      {...rest}
    >
      {children}
    </button>
  );
}
