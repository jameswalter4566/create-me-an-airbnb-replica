import React, { useState } from 'react';

const testimonials = [
  {
    id: 't1',
    quote:
      'I booked a farmhouse outside Bologna at 11pm from an airport gate. The door code was waiting when I landed, the wifi test was accurate to the megabit, and the total never moved an inch from what I saw in search.',
    name: 'Marisol Vega',
    role: 'Product designer, remote since 2019',
    company: 'Trips taken: 34',
    initials: 'MV',
    accent: '#ff5a5f',
  },
  {
    id: 't2',
    quote:
      'We host two cabins in Vermont. Nomadly pays out the morning after check-in, screens guests properly, and the scout who photographed our place actually stayed a night first. Bookings are up 61% year over year.',
    name: 'Dean Ashworth',
    role: 'Superhost, Green Mountain Cabins',
    company: 'Hosting since 2016',
    initials: 'DA',
    accent: '#00c8b8',
  },
  {
    id: 't3',
    quote:
      'A pipe burst in our rental two hours before check-in. Support had us in a nicer place eleven blocks away before we finished the phone call, and covered the difference without being asked.',
    name: 'Priya Raghunathan',
    role: 'Travelling with two kids and a dog',
    company: 'Lisbon → Porto, June',
    initials: 'PR',
    accent: '#ffd6a5',
  },
];

export default function Testimonials() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <section
      id="stories"
      style={{
        padding: '108px 24px',
        background: '#0b0a0d',
        position: 'relative',
      }}
    >
      <div
        style={{
          position: 'absolute',
          left: '-140px',
          top: '18%',
          width: '420px',
          height: '420px',
          borderRadius: '999px',
          background: 'radial-gradient(circle, rgba(0,166,153,0.13), transparent 68%)',
          pointerEvents: 'none',
        }}
      />

      <div style={{ maxWidth: '1240px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 52px' }}>
          <div
            style={{
              fontSize: '12.5px',
              fontWeight: 700,
              letterSpacing: '0.16em',
              textTransform: 'uppercase',
              color: '#ff8a63',
              marginBottom: '14px',
            }}
          >
            Guests and hosts
          </div>
          <h2 style={{ fontSize: '44px', fontWeight: 700, lineHeight: 1.1, color: '#ffffff', marginBottom: '16px' }}>
            The reviews that made us build it this way
          </h2>
          <p style={{ fontSize: '17px', lineHeight: 1.65, color: '#b6b1c2' }}>
            Verified accounts from people who booked, hosted and occasionally needed us at
            two in the morning.
          </p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '20px',
          }}
        >
          {testimonials.map((item) => {
            const active = hoveredId === item.id;
            return (
              <figure
                key={item.id}
                onMouseEnter={() => setHoveredId(item.id)}
                onMouseLeave={() => setHoveredId(null)}
                style={{
                  margin: 0,
                  padding: '32px 30px',
                  borderRadius: '24px',
                  background: active ? '#1e1c26' : '#151419',
                  border: '1px solid',
                  borderColor: active ? `${item.accent}66` : 'rgba(255,255,255,0.07)',
                  transform: active ? 'translateY(-7px)' : 'translateY(0)',
                  boxShadow: active
                    ? '0 28px 56px rgba(0,0,0,0.5)'
                    : '0 6px 18px rgba(0,0,0,0.24)',
                  transition: 'all 0.32s cubic-bezier(0.4, 0, 0.2, 1)',
                  cursor: 'default',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                }}
              >
                <div>
                  <div style={{ display: 'flex', gap: '3px', marginBottom: '18px', color: '#ffd6a5' }}>
                    {[0, 1, 2, 3, 4].map((star) => (
                      <svg key={star} width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2l2.9 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l7.1-1.01L12 2z" />
                      </svg>
                    ))}
                  </div>

                  <blockquote
                    style={{
                      margin: 0,
                      fontFamily: "'Fraunces', Georgia, serif",
                      fontSize: '18px',
                      lineHeight: 1.62,
                      color: '#efecf4',
                      fontWeight: 500,
                    }}
                  >
                    “{item.quote}”
                  </blockquote>
                </div>

                <figcaption
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '14px',
                    marginTop: '26px',
                    paddingTop: '22px',
                    borderTop: '1px solid rgba(255,255,255,0.08)',
                  }}
                >
                  <span
                    style={{
                      width: '44px',
                      height: '44px',
                      borderRadius: '999px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '14.5px',
                      fontWeight: 700,
                      color: '#0b0a0d',
                      background: `linear-gradient(135deg, ${item.accent}, #ffd6a5)`,
                      flexShrink: 0,
                    }}
                  >
                    {item.initials}
                  </span>
                  <span>
                    <span style={{ display: 'block', fontSize: '15px', fontWeight: 700, color: '#ffffff' }}>
                      {item.name}
                    </span>
                    <span style={{ display: 'block', fontSize: '13.5px', color: '#a9a4b4', marginTop: '2px' }}>
                      {item.role}
                    </span>
                    <span style={{ display: 'block', fontSize: '12.5px', color: '#7f7a8c', marginTop: '2px' }}>
                      {item.company}
                    </span>
                  </span>
                </figcaption>
              </figure>
            );
          })}
        </div>
      </div>
    </section>
  );
}