import React, { useState } from 'react';

const Icons = {
  Shield: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  ),
  Map: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 3L3 5.6v15L9 18l6 3 6-2.6v-15L15 6 9 3z" />
      <path d="M9 3v15M15 6v15" />
    </svg>
  ),
  Key: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="8" cy="15" r="4" />
      <path d="M10.8 12.2L20 3M17 6l2.5 2.5M14.5 8.5L17 11" />
    </svg>
  ),
  Wallet: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 7a2 2 0 012-2h12a2 2 0 012 2v1" />
      <path d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2v-6H7a2 2 0 01-2-2" />
      <circle cx="17" cy="14" r="1.2" fill="currentColor" stroke="none" />
    </svg>
  ),
  Chat: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12a8 8 0 01-11.6 7.1L4 21l1.9-5.4A8 8 0 1121 12z" />
      <path d="M9 11h6M9 14h4" />
    </svg>
  ),
  Sparkle: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9L12 3z" />
      <path d="M18.5 16.5l.7 1.8 1.8.7-1.8.7-.7 1.8-.7-1.8-1.8-.7 1.8-.7.7-1.8z" />
    </svg>
  ),
};

const features = [
  {
    id: 'f1',
    icon: Icons.Shield,
    title: 'Inspected, not just listed',
    description:
      'A Nomadly scout visits every home before it goes live. If the kitchen, wifi or bed does not match the photos, the listing never publishes.',
    accent: '#ff5a5f',
  },
  {
    id: 'f2',
    icon: Icons.Map,
    title: 'Neighborhood intelligence',
    description:
      'See real walk times to the bakery, the beach and the metro. Each listing ships with a local guide written by residents, not marketers.',
    accent: '#ff8a63',
  },
  {
    id: 'f3',
    icon: Icons.Key,
    title: 'Instant, keyless arrival',
    description:
      'Your door code lands in the app two hours before check-in. No lockboxes, no waiting on a host, no awkward handoffs at midnight.',
    accent: '#00c8b8',
  },
  {
    id: 'f4',
    icon: Icons.Wallet,
    title: 'Prices with nothing hidden',
    description:
      'Cleaning, service and city tax are folded into the number you see first. The total on the search card is the total on your card.',
    accent: '#ffd6a5',
  },
  {
    id: 'f5',
    icon: Icons.Chat,
    title: 'Humans on call, always',
    description:
      'Trip support answers in under 90 seconds at any hour. If a stay falls through, we rebook you the same night at our cost.',
    accent: '#b48bff',
  },
  {
    id: 'f6',
    icon: Icons.Sparkle,
    title: 'Matches that actually fit',
    description:
      'Tell us you travel with a toddler, a laptop or a labrador and the feed reshapes itself around cribs, desks and fenced yards.',
    accent: '#ff5a5f',
  },
];

export default function Features() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [tourHover, setTourHover] = useState(false);

  return (
    <section
      id="experiences"
      style={{
        padding: '110px 24px',
        background: '#0b0a0d',
        position: 'relative',
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: '10%',
          right: '-160px',
          width: '460px',
          height: '460px',
          borderRadius: '999px',
          background: 'radial-gradient(circle, rgba(255,90,95,0.14), transparent 68%)',
          pointerEvents: 'none',
        }}
      />

      <div style={{ maxWidth: '1240px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <div style={{ maxWidth: '660px', marginBottom: '54px' }}>
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
            Why guests rebook
          </div>
          <h2
            style={{
              fontSize: '46px',
              fontWeight: 700,
              lineHeight: 1.08,
              color: '#ffffff',
              marginBottom: '18px',
            }}
          >
            A booking platform that behaves like a good concierge
          </h2>
          <p style={{ fontSize: '17.5px', lineHeight: 1.65, color: '#b6b1c2' }}>
            Most travel sites optimize for listings. Nomadly optimizes for the twenty minutes
            after you land — the door that opens, the price that does not change, the person
            who picks up the phone.
          </p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '20px',
            marginBottom: '20px',
          }}
        >
          {features.map((feature) => {
            const active = hoveredId === feature.id;
            const FeatureIcon = feature.icon;
            return (
              <article
                key={feature.id}
                onMouseEnter={() => setHoveredId(feature.id)}
                onMouseLeave={() => setHoveredId(null)}
                style={{
                  padding: '30px 28px',
                  borderRadius: '22px',
                  background: active ? '#1e1c26' : '#151419',
                  border: '1px solid',
                  borderColor: active ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.07)',
                  transform: active ? 'translateY(-6px)' : 'translateY(0)',
                  boxShadow: active ? '0 26px 52px rgba(0,0,0,0.5)' : '0 4px 14px rgba(0,0,0,0.22)',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  cursor: 'pointer',
                }}
              >
                <div
                  style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '15px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: feature.accent,
                    background: active
                      ? 'rgba(255,255,255,0.09)'
                      : 'rgba(255,255,255,0.045)',
                    border: '1px solid rgba(255,255,255,0.09)',
                    marginBottom: '20px',
                    boxShadow: active ? `0 0 26px ${feature.accent}33` : 'none',
                    transition: 'all 0.3s ease',
                  }}
                >
                  <FeatureIcon />
                </div>
                <h3
                  style={{
                    fontSize: '20px',
                    fontWeight: 600,
                    color: '#ffffff',
                    marginBottom: '10px',
                  }}
                >
                  {feature.title}
                </h3>
                <p style={{ fontSize: '14.8px', lineHeight: 1.68, color: '#a9a4b4' }}>
                  {feature.description}
                </p>
              </article>
            );
          })}
        </div>

        <div
          onMouseEnter={() => setTourHover(true)}
          onMouseLeave={() => setTourHover(false)}
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '28px',
            padding: '38px 34px',
            borderRadius: '24px',
            background: tourHover
              ? 'linear-gradient(120deg, #23202c 0%, #1a1822 60%, #241a20 100%)'
              : 'linear-gradient(120deg, #1c1a24 0%, #16151c 60%, #1f1720 100%)',
            border: '1px solid',
            borderColor: tourHover ? 'rgba(255,138,99,0.4)' : 'rgba(255,255,255,0.08)',
            transition: 'all 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
          }}
        >
          <div style={{ flex: '1 1 420px', minWidth: '280px' }}>
            <h3 style={{ fontSize: '28px', fontWeight: 600, color: '#ffffff', marginBottom: '12px' }}>
              Walk the whole place before you pay for it
            </h3>
            <p style={{ fontSize: '16px', lineHeight: 1.65, color: '#b6b1c2', maxWidth: '560px' }}>
              Every Nomadly home ships with a scanned 3D tour, verified room dimensions and a
              measured wifi speed test. What you tour is exactly what you unlock.
            </p>
          </div>
          <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
            {[
              { id: 'w1', label: 'Wifi tested', value: '412 Mbps' },
              { id: 'w2', label: 'Rooms scanned', value: '6 / 6' },
              { id: 'w3', label: 'Photos verified', value: '38' },
            ].map((item) => (
              <div
                key={item.id}
                style={{
                  padding: '16px 20px',
                  borderRadius: '16px',
                  background: 'rgba(11,10,13,0.55)',
                  border: '1px solid rgba(255,255,255,0.09)',
                  minWidth: '132px',
                }}
              >
                <div style={{ fontSize: '20px', fontWeight: 700, color: '#ffd6a5' }}>{item.value}</div>
                <div style={{ fontSize: '12px', color: '#a9a4b4', marginTop: '4px', letterSpacing: '0.05em' }}>
                  {item.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}