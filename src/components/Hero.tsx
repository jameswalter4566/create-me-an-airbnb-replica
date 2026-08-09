import React, { useState } from 'react';

const filters = [
  { id: 'cabins', label: 'Cabins' },
  { id: 'lofts', label: 'City lofts' },
  { id: 'islands', label: 'Islands' },
  { id: 'domes', label: 'Domes' },
  { id: 'vineyards', label: 'Vineyards' },
];

const proof = [
  { id: 'p1', value: '4.91', label: 'Average stay rating' },
  { id: 'p2', value: '190+', label: 'Countries live' },
  { id: 'p3', value: '38s', label: 'Median booking time' },
];

export default function Hero() {
  const [primaryHover, setPrimaryHover] = useState(false);
  const [secondaryHover, setSecondaryHover] = useState(false);
  const [activeFilter, setActiveFilter] = useState('cabins');
  const [hoveredFilter, setHoveredFilter] = useState<string | null>(null);
  const [cardHover, setCardHover] = useState(false);

  return (
    <section
      id="top"
      style={{
        position: 'relative',
        padding: '112px 24px 104px',
        overflow: 'hidden',
        background:
          'radial-gradient(900px 520px at 12% 0%, rgba(255, 90, 95, 0.18), transparent 62%), radial-gradient(760px 480px at 88% 18%, rgba(0, 166, 153, 0.16), transparent 60%), linear-gradient(180deg, #0b0a0d 0%, #100e15 100%)',
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage:
            'radial-gradient(circle, rgba(255,255,255,0.055) 1px, transparent 1px)',
          backgroundSize: '34px 34px',
          maskImage: 'radial-gradient(ellipse at 50% 20%, #000 40%, transparent 78%)',
          WebkitMaskImage: 'radial-gradient(ellipse at 50% 20%, #000 40%, transparent 78%)',
          pointerEvents: 'none',
        }}
      />

      <div
        style={{
          position: 'relative',
          zIndex: 1,
          maxWidth: '1240px',
          margin: '0 auto',
          display: 'flex',
          flexWrap: 'wrap',
          gap: '56px',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <div style={{ flex: '1 1 480px', minWidth: '320px', animation: 'slideUp 0.7s ease both' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              padding: '7px 14px 7px 8px',
              borderRadius: '999px',
              border: '1px solid rgba(255, 90, 95, 0.28)',
              background: 'rgba(255, 90, 95, 0.09)',
              marginBottom: '26px',
            }}
          >
            <span
              style={{
                width: '20px',
                height: '20px',
                borderRadius: '999px',
                background: 'linear-gradient(135deg, #ff5a5f, #ff8a63)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                animation: 'glowPulse 2.6s ease-in-out infinite',
              }}
            >
              <svg width="11" height="11" viewBox="0 0 24 24" fill="#fff">
                <path d="M12 2l2.9 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l7.1-1.01L12 2z" />
              </svg>
            </span>
            <span style={{ fontSize: '13px', fontWeight: 700, color: '#ffb3a3', letterSpacing: '0.01em' }}>
              12,480 new homes verified this month
            </span>
          </div>

          <h1
            style={{
              fontSize: '68px',
              lineHeight: 1.02,
              fontWeight: 700,
              color: '#ffffff',
              margin: '0 0 22px',
            }}
          >
            Sleep somewhere
            <br />
            <span
              style={{
                background: 'linear-gradient(115deg, #ff5a5f 0%, #ff8a63 48%, #ffd6a5 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              worth waking up in.
            </span>
          </h1>

          <p
            style={{
              fontSize: '18.5px',
              lineHeight: 1.65,
              color: '#c2bdcd',
              maxWidth: '540px',
              margin: '0 0 34px',
            }}
          >
            Nomadly connects travelers with independently verified homes, cabins and lofts
            hosted by real people. Every listing is inspected, every host is background-checked,
            and every booking is covered end to end.
          </p>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '14px', marginBottom: '30px' }}>
            <button
              type="button"
              onMouseEnter={() => setPrimaryHover(true)}
              onMouseLeave={() => setPrimaryHover(false)}
              style={{
                padding: '16px 30px',
                borderRadius: '999px',
                border: 'none',
                background: primaryHover
                  ? 'linear-gradient(135deg, #ff6f73 0%, #d8446a 100%)'
                  : 'linear-gradient(135deg, #ff5a5f 0%, #c8375d 100%)',
                color: '#ffffff',
                fontSize: '16px',
                fontWeight: 700,
                cursor: 'pointer',
                transform: primaryHover ? 'translateY(-3px)' : 'translateY(0)',
                boxShadow: primaryHover
                  ? '0 22px 44px rgba(255, 90, 95, 0.38)'
                  : '0 10px 26px rgba(255, 90, 95, 0.22)',
                transition: 'all 0.28s cubic-bezier(0.4, 0, 0.2, 1)',
              }}
            >
              Find a stay
            </button>

            <button
              type="button"
              onMouseEnter={() => setSecondaryHover(true)}
              onMouseLeave={() => setSecondaryHover(false)}
              style={{
                padding: '16px 30px',
                borderRadius: '999px',
                border: '1px solid',
                borderColor: secondaryHover ? 'rgba(255,255,255,0.34)' : 'rgba(255,255,255,0.15)',
                background: secondaryHover ? 'rgba(255,255,255,0.07)' : 'transparent',
                color: '#f6f4f2',
                fontSize: '16px',
                fontWeight: 600,
                cursor: 'pointer',
                transform: secondaryHover ? 'translateY(-3px)' : 'translateY(0)',
                transition: 'all 0.28s cubic-bezier(0.4, 0, 0.2, 1)',
              }}
            >
              List your place
            </button>
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '9px', marginBottom: '34px' }}>
            {filters.map((filter) => {
              const isActive = activeFilter === filter.id;
              const isHover = hoveredFilter === filter.id;
              return (
                <button
                  key={filter.id}
                  type="button"
                  onClick={() => setActiveFilter(filter.id)}
                  onMouseEnter={() => setHoveredFilter(filter.id)}
                  onMouseLeave={() => setHoveredFilter(null)}
                  style={{
                    padding: '8px 15px',
                    borderRadius: '999px',
                    fontSize: '13px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    color: isActive ? '#0b0a0d' : isHover ? '#ffffff' : '#a9a4b4',
                    background: isActive
                      ? 'linear-gradient(135deg, #ffd6a5, #ff8a63)'
                      : isHover
                      ? 'rgba(255,255,255,0.09)'
                      : 'rgba(255,255,255,0.03)',
                    border: '1px solid',
                    borderColor: isActive ? 'transparent' : 'rgba(255,255,255,0.12)',
                    transition: 'all 0.2s ease',
                  }}
                >
                  {filter.label}
                </button>
              );
            })}
          </div>

          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '34px',
              paddingTop: '24px',
              borderTop: '1px solid rgba(255,255,255,0.09)',
            }}
          >
            {proof.map((item) => (
              <div key={item.id}>
                <div
                  style={{
                    fontFamily: "'Fraunces', Georgia, serif",
                    fontSize: '27px',
                    fontWeight: 700,
                    color: '#ffffff',
                  }}
                >
                  {item.value}
                </div>
                <div style={{ fontSize: '12.5px', color: '#a9a4b4', letterSpacing: '0.04em', marginTop: '3px' }}>
                  {item.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div
          style={{
            flex: '0 1 430px',
            minWidth: '300px',
            position: 'relative',
            animation: 'fadeIn 0.9s ease both',
          }}
        >
          <div
            onMouseEnter={() => setCardHover(true)}
            onMouseLeave={() => setCardHover(false)}
            style={{
              position: 'relative',
              borderRadius: '26px',
              padding: '22px',
              background: 'rgba(23, 22, 29, 0.86)',
              backdropFilter: 'blur(14px)',
              WebkitBackdropFilter: 'blur(14px)',
              border: '1px solid',
              borderColor: cardHover ? 'rgba(255, 90, 95, 0.42)' : 'rgba(255,255,255,0.11)',
              boxShadow: cardHover
                ? '0 30px 70px rgba(0,0,0,0.55), 0 0 40px rgba(255,90,95,0.14)'
                : '0 22px 55px rgba(0,0,0,0.45)',
              transform: cardHover ? 'translateY(-6px)' : 'translateY(0)',
              transition: 'all 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
            }}
          >
            <div
              style={{
                height: '190px',
                borderRadius: '18px',
                background:
                  'linear-gradient(160deg, #ff8a63 0%, #c8375d 46%, #4b2a5c 100%)',
                position: 'relative',
                overflow: 'hidden',
                marginBottom: '18px',
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background:
                    'radial-gradient(circle at 78% 22%, rgba(255,255,255,0.4), transparent 42%)',
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  left: '12px',
                  top: '12px',
                  padding: '6px 12px',
                  borderRadius: '999px',
                  background: 'rgba(11,10,13,0.62)',
                  fontSize: '11.5px',
                  fontWeight: 700,
                  color: '#ffffff',
                  letterSpacing: '0.06em',
                }}
              >
                GUEST FAVORITE
              </div>
              <svg
                width="150"
                height="90"
                viewBox="0 0 150 90"
                style={{ position: 'absolute', bottom: 0, left: 0, opacity: 0.35 }}
              >
                <path d="M0 90 L36 38 L64 66 L92 22 L150 90 Z" fill="#0b0a0d" />
              </svg>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '12px' }}>
              <div>
                <div style={{ fontSize: '16.5px', fontWeight: 700, color: '#ffffff', marginBottom: '4px' }}>
                  Cliffside Glass Cabin
                </div>
                <div style={{ fontSize: '13.5px', color: '#a9a4b4' }}>Sintra, Portugal · Entire home</div>
              </div>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '5px',
                  fontSize: '13.5px',
                  fontWeight: 700,
                  color: '#ffd6a5',
                }}
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2l2.9 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l7.1-1.01L12 2z" />
                </svg>
                4.97
              </div>
            </div>

            <div
              style={{
                marginTop: '16px',
                paddingTop: '16px',
                borderTop: '1px solid rgba(255,255,255,0.09)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <div style={{ fontSize: '15px', color: '#e6e2ee', fontWeight: 600 }}>
                €214 <span style={{ color: '#a9a4b4', fontWeight: 500 }}>/ night</span>
              </div>
              <div
                style={{
                  fontSize: '12.5px',
                  fontWeight: 700,
                  color: '#00c8b8',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                }}
              >
                <span
                  style={{
                    width: '7px',
                    height: '7px',
                    borderRadius: '999px',
                    background: '#00c8b8',
                    animation: 'pulse 1.9s ease-in-out infinite',
                  }}
                />
                Free cancellation
              </div>
            </div>
          </div>

          <div
            style={{
              position: 'absolute',
              bottom: '-28px',
              left: '-22px',
              padding: '13px 17px',
              borderRadius: '16px',
              background: 'rgba(19, 18, 24, 0.94)',
              border: '1px solid rgba(255,255,255,0.11)',
              boxShadow: '0 18px 40px rgba(0,0,0,0.5)',
              animation: 'floatSlow 5.5s ease-in-out infinite',
            }}
          >
            <div style={{ fontSize: '11.5px', color: '#a9a4b4', letterSpacing: '0.08em', marginBottom: '4px' }}>
              BOOKED JUST NOW
            </div>
            <div style={{ fontSize: '14px', fontWeight: 700, color: '#ffffff' }}>
              Desert Dome · Joshua Tree
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}