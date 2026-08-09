import React, { useState } from 'react';

export default function CTA() {
  const [primaryHover, setPrimaryHover] = useState(false);
  const [secondaryHover, setSecondaryHover] = useState(false);
  const [email, setEmail] = useState('');
  const [focused, setFocused] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (email.trim().length > 3) {
      setSubmitted(true);
    }
  };

  return (
    <section
      style={{
        padding: '104px 24px',
        position: 'relative',
        overflow: 'hidden',
        background:
          'linear-gradient(125deg, #ff5a5f 0%, #d8446a 42%, #7a2d55 78%, #2b1830 100%)',
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage:
            'radial-gradient(circle, rgba(255,255,255,0.12) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
          opacity: 0.5,
          pointerEvents: 'none',
        }}
      />
      <div
        style={{
          position: 'absolute',
          right: '-120px',
          bottom: '-160px',
          width: '460px',
          height: '460px',
          borderRadius: '999px',
          background: 'radial-gradient(circle, rgba(255,214,165,0.35), transparent 66%)',
          pointerEvents: 'none',
        }}
      />

      <div
        style={{
          position: 'relative',
          zIndex: 1,
          maxWidth: '980px',
          margin: '0 auto',
          textAlign: 'center',
        }}
      >
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '9px',
            padding: '7px 15px',
            borderRadius: '999px',
            background: 'rgba(11,10,13,0.34)',
            border: '1px solid rgba(255,255,255,0.28)',
            marginBottom: '26px',
          }}
        >
          <span
            style={{
              width: '7px',
              height: '7px',
              borderRadius: '999px',
              background: '#ffffff',
              animation: 'pulse 1.8s ease-in-out infinite',
            }}
          />
          <span style={{ fontSize: '13px', fontWeight: 700, color: '#ffffff', letterSpacing: '0.03em' }}>
            Hosts earn an average of $1,340 per month
          </span>
        </div>

        <h2
          style={{
            fontSize: '52px',
            fontWeight: 700,
            lineHeight: 1.06,
            color: '#ffffff',
            marginBottom: '18px',
          }}
        >
          Your next front door is already waiting
        </h2>
        <p
          style={{
            fontSize: '18.5px',
            lineHeight: 1.6,
            color: 'rgba(255,255,255,0.9)',
            maxWidth: '620px',
            margin: '0 auto 34px',
          }}
        >
          Join 2.1 million travelers booking inspected homes on Nomadly — or open your own
          spare room and get paid the morning after every check-in.
        </p>

        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '12px',
            justifyContent: 'center',
            marginBottom: '30px',
          }}
        >
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            placeholder="you@example.com"
            aria-label="Email address"
            style={{
              width: '300px',
              maxWidth: '100%',
              padding: '15px 20px',
              fontSize: '15.5px',
              color: '#1a1620',
              background: '#ffffff',
              border: '2px solid',
              borderColor: focused ? '#2b1830' : 'rgba(255,255,255,0.55)',
              borderRadius: '999px',
              outline: 'none',
              transition: 'border-color 0.2s ease',
            }}
          />
          <button
            type="button"
            onClick={handleSubmit}
            onMouseEnter={() => setPrimaryHover(true)}
            onMouseLeave={() => setPrimaryHover(false)}
            style={{
              padding: '15px 32px',
              borderRadius: '999px',
              border: 'none',
              background: primaryHover ? '#000000' : '#1a1620',
              color: '#ffffff',
              fontSize: '15.5px',
              fontWeight: 700,
              cursor: 'pointer',
              transform: primaryHover ? 'translateY(-3px)' : 'translateY(0)',
              boxShadow: primaryHover
                ? '0 20px 40px rgba(0,0,0,0.4)'
                : '0 8px 20px rgba(0,0,0,0.25)',
              transition: 'all 0.26s cubic-bezier(0.4, 0, 0.2, 1)',
            }}
          >
            {submitted ? 'Check your inbox' : 'Start exploring'}
          </button>
          <button
            type="button"
            onMouseEnter={() => setSecondaryHover(true)}
            onMouseLeave={() => setSecondaryHover(false)}
            style={{
              padding: '15px 30px',
              borderRadius: '999px',
              border: '2px solid rgba(255,255,255,0.6)',
              background: secondaryHover ? 'rgba(255,255,255,0.18)' : 'transparent',
              color: '#ffffff',
              fontSize: '15.5px',
              fontWeight: 700,
              cursor: 'pointer',
              transform: secondaryHover ? 'translateY(-3px)' : 'translateY(0)',
              transition: 'all 0.26s cubic-bezier(0.4, 0, 0.2, 1)',
            }}
          >
            Calculate host earnings
          </button>
        </div>

        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '26px',
            justifyContent: 'center',
            fontSize: '13.5px',
            fontWeight: 600,
            color: 'rgba(255,255,255,0.88)',
          }}
        >
          {['No booking fees for the first trip', 'Cancel free within 48 hours', '$1M host damage cover'].map(
            (item) => (
              <span key={item} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 6L9 17l-5-5" />
                </svg>
                {item}
              </span>
            )
          )}
        </div>
      </div>
    </section>
  );
}