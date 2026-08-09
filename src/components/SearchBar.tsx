import React, { useEffect, useRef, useState } from 'react';

type Seg = 'where' | 'when' | 'who' | null;

interface Guests {
  adults: number;
  children: number;
  infants: number;
}

const dateChips = [
  { id: 'weekend', label: 'This weekend', value: 'Aug 14 – 16' },
  { id: 'week', label: 'Next week', value: 'Aug 17 – 24' },
  { id: 'month', label: 'A month away', value: 'Sep 8 – 15' },
];

function Stepper({
  label,
  hint,
  value,
  onChange,
  min = 0,
  max = 16,
  last = false,
}: {
  label: string;
  hint: string;
  value: number;
  onChange: (v: number) => void;
  min?: number;
  max?: number;
  last?: boolean;
}) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '14px 0',
        borderBottom: last ? 'none' : '1px solid #ebebeb',
      }}
    >
      <div>
        <div style={{ fontSize: '15px', fontWeight: 700, color: '#222' }}>{label}</div>
        <div style={{ fontSize: '13px', color: '#6a6a6a', marginTop: '2px' }}>{hint}</div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
        <button
          type="button"
          className="stepper-btn"
          aria-label={`Decrease ${label}`}
          disabled={value <= min}
          onClick={() => onChange(Math.max(min, value - 1))}
        >
          −
        </button>
        <span style={{ minWidth: '20px', textAlign: 'center', fontSize: '15px', color: '#222' }}>
          {value}
        </span>
        <button
          type="button"
          className="stepper-btn"
          aria-label={`Increase ${label}`}
          disabled={value >= max}
          onClick={() => onChange(Math.min(max, value + 1))}
        >
          +
        </button>
      </div>
    </div>
  );
}

export default function SearchBar() {
  const [active, setActive] = useState<Seg>(null);
  const [where, setWhere] = useState('');
  const [when, setWhen] = useState('');
  const [guests, setGuests] = useState<Guests>({ adults: 0, children: 0, infants: 0 });
  const barRef = useRef<HTMLDivElement>(null);
  const whereInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const onDown = (e: MouseEvent) => {
      if (barRef.current && !barRef.current.contains(e.target as Node)) setActive(null);
    };
    document.addEventListener('mousedown', onDown);
    return () => document.removeEventListener('mousedown', onDown);
  }, []);

  const totalGuests = guests.adults + guests.children;
  const whoLabel = (() => {
    if (totalGuests === 0 && guests.infants === 0) return '';
    const parts: string[] = [];
    if (totalGuests > 0) parts.push(`${totalGuests} guest${totalGuests > 1 ? 's' : ''}`);
    if (guests.infants > 0) parts.push(`${guests.infants} infant${guests.infants > 1 ? 's' : ''}`);
    return parts.join(', ');
  })();

  const doSearch = () => {
    setActive(null);
    const el = document.getElementById('listings');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div ref={barRef} style={{ position: 'relative', display: 'inline-block' }}>
      <div className="search-bar" role="search">
        {/* Where */}
        <button
          type="button"
          className={`search-seg${active === 'where' ? ' active' : ''}`}
          style={{ minWidth: '260px' }}
          onClick={() => {
            setActive('where');
            requestAnimationFrame(() => whereInputRef.current?.focus());
          }}
        >
          <span className="search-label">Where</span>
          <input
            ref={whereInputRef}
            className="search-input"
            placeholder="Search destinations"
            value={where}
            onChange={(e) => setWhere(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') doSearch();
            }}
          />
        </button>

        <div className="search-divider" />

        {/* When */}
        <button
          type="button"
          className={`search-seg${active === 'when' ? ' active' : ''}`}
          style={{ minWidth: '150px' }}
          onClick={() => setActive('when')}
        >
          <span className="search-label">When</span>
          <span className={`search-value${when ? ' filled' : ''}`}>{when || 'Add dates'}</span>
        </button>

        <div className="search-divider" />

        {/* Who + search button */}
        <button
          type="button"
          className={`search-seg${active === 'who' ? ' active' : ''}`}
          style={{
            minWidth: '190px',
            flexDirection: 'row',
            alignItems: 'center',
            gap: '10px',
            paddingRight: '8px',
          }}
          onClick={() => setActive('who')}
        >
          <span style={{ display: 'flex', flexDirection: 'column', flex: 1, textAlign: 'left' }}>
            <span className="search-label">Who</span>
            <span className={`search-value${whoLabel ? ' filled' : ''}`}>
              {whoLabel || 'Add guests'}
            </span>
          </span>
          <span
            role="button"
            aria-label="Search"
            onClick={(e) => {
              e.stopPropagation();
              doSearch();
            }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '48px',
              height: '48px',
              borderRadius: '999px',
              background: 'var(--rausch)',
              color: '#fff',
              flex: '0 0 auto',
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <circle cx="11" cy="11" r="7" />
              <path d="M21 21l-4.3-4.3" />
            </svg>
          </span>
        </button>
      </div>

      {/* When popover */}
      {active === 'when' ? (
        <div className="popover" style={{ top: '72px', left: '288px', width: '300px', padding: '18px' }}>
          <div style={{ fontSize: '13px', fontWeight: 700, color: '#222', marginBottom: '12px' }}>
            When&apos;s your trip?
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {dateChips.map((c) => (
              <button
                key={c.id}
                type="button"
                className="menu-item"
                style={{
                  borderRadius: '12px',
                  border: when === c.value ? '2px solid #222' : '1px solid #ddd',
                  justifyContent: 'space-between',
                }}
                onClick={() => {
                  setWhen(c.value);
                  setActive('who');
                }}
              >
                <span style={{ fontWeight: 600 }}>{c.label}</span>
                <span style={{ color: '#6a6a6a' }}>{c.value}</span>
              </button>
            ))}
          </div>
          {when ? (
            <button
              type="button"
              onClick={() => setWhen('')}
              style={{
                marginTop: '12px',
                background: 'none',
                border: 'none',
                textDecoration: 'underline',
                fontWeight: 700,
                cursor: 'pointer',
                fontSize: '14px',
                color: '#222',
              }}
            >
              Clear dates
            </button>
          ) : null}
        </div>
      ) : null}

      {/* Who popover */}
      {active === 'who' ? (
        <div className="popover" style={{ top: '72px', right: 0, width: '360px', padding: '8px 24px 20px' }}>
          <Stepper
            label="Adults"
            hint="Ages 13 or above"
            value={guests.adults}
            onChange={(v) => setGuests((g) => ({ ...g, adults: v }))}
          />
          <Stepper
            label="Children"
            hint="Ages 2 – 12"
            value={guests.children}
            onChange={(v) => setGuests((g) => ({ ...g, children: v }))}
          />
          <Stepper
            label="Infants"
            hint="Under 2"
            value={guests.infants}
            onChange={(v) => setGuests((g) => ({ ...g, infants: v }))}
            last
          />
        </div>
      ) : null}
    </div>
  );
}
