import React, { useState } from 'react';

const stats = [
  {
    id: 's1',
    value: '2.4M',
    label: 'Verified homes',
    detail: 'Every listing photographed and inspected in person.',
  },
  {
    id: 's2',
    value: '$1.9B',
    label: 'Paid to hosts',
    detail: 'Deposited within 24 hours of guest check-in.',
  },
  {
    id: 's3',
    value: '190',
    label: 'Countries served',
    detail: 'Local support desks in 41 languages, round the clock.',
  },
  {
    id: 's4',
    value: '99.2%',
    label: 'Check-in success',
    detail: 'Backed by our same-night rebooking guarantee.',
  },
];

const partners = ['Condé Nast', 'AFAR', 'Wanderlust', 'The Traveller', 'Roam Weekly'];

export default function Stats() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [hoveredPartner, setHoveredPartner] = useState<string | null>(null);

  return (
    <section
      id="stays"
      style={{
        padding: '84px 24px',
        background: 'linear-gradient(180deg, #100e15 0%, #0b0a0d 100%)',
        borderTop: '1px solid rgba(255,255,255,0.06)',
      }}
    >
      <div style={{ maxWidth: '1240px', margin: '0 auto' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))',
            gap: '20px',
            marginBottom: '58px',
          }}
        >
          {stats.map((stat) => {
            const active = hoveredId === stat.id;
            return (
              <div
                key={stat.id}
                onMouseEnter={() => setHoveredId(stat.id)}
                onMouseLeave={() => setHoveredId(null)}
                style={{
                  padding: '30px 26px',
                  borderRadius: '20px',
                  background: active ? '#1e1c26' : '#17161d',
                  border: '1px solid',
                  borderColor: active ? 'rgba(255, 90, 95, 0.38)' : 'rgba(255,255,255,0.08)',
                  transform: active ? 'translateY(-6px)' : 'translateY(0)',
                  boxShadow: active
                    ? '0 22px 46px rgba(0,0,0,0.5), 0 0 30px rgba(255,90,95,0.1)'
                    : '0 6px 18px rgba(0,0,0,0.25)',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  cursor: 'default',
                }}
              >
                <div
                  style={{
                    fontFamily: "'Fraunces', Georgia, serif",
                    fontSize: '46px',
                    fontWeight: 700,
                    lineHeight: 1,
                    color: active ? '#ff8a63' : '#ffffff',
                    transition: 'color 0.3s ease',
                  }}
                >
                  {stat.value}
                </div>
                <div
                  style={{
                    marginTop: '12px',
                    fontSize: '13px',
                    fontWeight: 700,
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    color: '#cbc6d6',
                  }}
                >
                  {stat.label}
                </div>
                <p
                  style={{
                    marginTop: '10px',
                    fontSize: '14px',
                    lineHeight: 1.6,
                    color: '#a9a4b4',
                  }}
                >
                  {stat.detail}
                </p>
              </div>
            );
          })}
        </div>

        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '24px',
            padding: '24px 28px',
            borderRadius: '20px',
            background: 'rgba(255,255,255,0.025)',
            border: '1px solid rgba(255,255,255,0.07)',
          }}
        >
          <span
            style={{
              fontSize: '12.5px',
              fontWeight: 700,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: '#8f8a9c',
            }}
          >
            Featured in
          </span>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '30px', alignItems: 'center' }}>
            {partners.map((partner) => (
              <span
                key={partner}
                onMouseEnter={() => setHoveredPartner(partner)}
                onMouseLeave={() => setHoveredPartner(null)}
                style={{
                  fontFamily: "'Fraunces', Georgia, serif",
                  fontSize: '18px',
                  fontWeight: 600,
                  color: hoveredPartner === partner ? '#ffffff' : '#787384',
                  cursor: 'default',
                  transition: 'color 0.25s ease',
                }}
              >
                {partner}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}