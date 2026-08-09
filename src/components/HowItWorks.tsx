import React, { useState } from 'react';

const steps = [
  {
    id: 'step1',
    number: '01',
    title: 'Tell us how you travel',
    description:
      'Pick dates, a budget band and the things that actually matter — a real desk, a bathtub, a dog-friendly yard. Nomadly filters 2.4 million homes down to the handful that qualify.',
    bullets: ['Flexible date search', 'Total price up front', 'Save searches across devices'],
  },
  {
    id: 'step2',
    number: '02',
    title: 'Tour it, then lock it',
    description:
      'Open the 3D scan, read the resident-written neighborhood guide and message the host in-app. When it feels right, reserve in a single tap with instant confirmation.',
    bullets: ['3D scans on every listing', 'Median 38 second checkout', 'Free cancellation for 48 hours'],
  },
  {
    id: 'step3',
    number: '03',
    title: 'Arrive and settle in',
    description:
      'Your door code and arrival notes drop two hours before check-in. Support stays on standby for the whole trip, and if anything goes sideways we rebook you the same night.',
    bullets: ['Keyless entry codes', '90 second support response', 'Same-night rebooking cover'],
  },
];

export default function HowItWorks() {
  const [activeStep, setActiveStep] = useState('step1');
  const [hoveredStep, setHoveredStep] = useState(null);

  return (
    <section
      id="hosting"
      style={{
        padding: '108px 24px',
        background: 'linear-gradient(180deg, #0b0a0d 0%, #100e15 55%, #0b0a0d 100%)',
        borderTop: '1px solid rgba(255,255,255,0.06)',
      }}
    >
      <div style={{ maxWidth: '1240px', margin: '0 auto' }}>
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '24px',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            marginBottom: '52px',
          }}
        >
          <div style={{ maxWidth: '620px' }}>
            <div
              style={{
                fontSize: '12.5px',
                fontWeight: 700,
                letterSpacing: '0.16em',
                textTransform: 'uppercase',
                color: '#00c8b8',
                marginBottom: '14px',
              }}
            >
              From search to sleep
            </div>
            <h2 style={{ fontSize: '44px', fontWeight: 700, lineHeight: 1.1, color: '#ffffff' }}>
              Three steps between a browser tab and a front door
            </h2>
          </div>
          <p style={{ fontSize: '16px', lineHeight: 1.65, color: '#a9a4b4', maxWidth: '340px' }}>
            The average Nomadly guest goes from first search to confirmed reservation in under
            nine minutes — and never speaks to a call center.
          </p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '20px',
          }}
        >
          {steps.map((step) => {
            const isActive = activeStep === step.id;
            const isHover = hoveredStep === step.id;
            const lifted = isActive || isHover;
            return (
              <div
                key={step.id}
                onClick={() => setActiveStep(step.id)}
                onMouseEnter={() => setHoveredStep(step.id)}
                onMouseLeave={() => setHoveredStep(null)}
                style={{
                  position: 'relative',
                  padding: '34px 30px',
                  borderRadius: '24px',
                  cursor: 'pointer',
                  background: isActive
                    ? 'linear-gradient(165deg, #241a22 0%, #17161d 70%)'
                    : lifted
                    ? '#1c1a24'
                    : '#151419',
                  border: '1px solid',
                  borderColor: isActive
                    ? 'rgba(255,90,95,0.45)'
                    : lifted
                    ? 'rgba(255,255,255,0.18)'
                    : 'rgba(255,255,255,0.07)',
                  transform: lifted ? 'translateY(-6px)' : 'translateY(0)',
                  boxShadow: isActive
                    ? '0 28px 56px rgba(0,0,0,0.5), 0 0 34px rgba(255,90,95,0.12)'
                    : '0 6px 18px rgba(0,0,0,0.24)',
                  transition: 'all 0.32s cubic-bezier(0.4, 0, 0.2, 1)',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '14px',
                    marginBottom: '18px',
                  }}
                >
                  <span
                    style={{
                      fontFamily: "'Fraunces', Georgia, serif",
                      fontSize: '34px',
                      fontWeight: 700,
                      color: isActive ? '#ff8a63' : '#5d5869',
                      transition: 'color 0.3s ease',
                    }}
                  >
                    {step.number}
                  </span>
                  <span
                    style={{
                      flex: 1,
                      height: '1px',
                      background: isActive
                        ? 'linear-gradient(90deg, rgba(255,138,99,0.6), transparent)'
                        : 'rgba(255,255,255,0.09)',
                      transition: 'background 0.3s ease',
                    }}
                  />
                </div>

                <h3 style={{ fontSize: '22px', fontWeight: 600, color: '#ffffff', marginBottom: '12px' }}>
                  {step.title}
                </h3>
                <p style={{ fontSize: '15px', lineHeight: 1.7, color: '#a9a4b4', marginBottom: '20px' }}>
                  {step.description}
                </p>

                <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
                  {step.bullets.map((bullet) => (
                    <li
                      key={bullet}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        fontSize: '14px',
                        color: '#cbc6d6',
                        marginBottom: '10px',
                      }}
                    >
                      <span
                        style={{
                          width: '18px',
                          height: '18px',
                          borderRadius: '999px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          background: isActive ? 'rgba(255,90,95,0.18)' : 'rgba(255,255,255,0.07)',
                          color: isActive ? '#ff8a63' : '#8f8a9c',
                          flexShrink: 0,
                        }}
                      >
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M20 6L9 17l-5-5" />
                        </svg>
                      </span>
                      {bullet}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}