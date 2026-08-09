import React, { useState } from 'react';

const columns = [
  {
    id: 'explore',
    title: 'Explore',
    links: ['Cabins & A-frames', 'City lofts', 'Beachfront', 'Monthly stays', 'Pet friendly'],
  },
  {
    id: 'hosting',
    title: 'Hosting',
    links: ['List your home', 'Earnings calculator', 'Host protection', 'Scout program', 'Host community'],
  },
  {
    id: 'support',
    title: 'Support',
    links: ['Help center', 'Trip support', 'Cancellation options', 'Report a listing', 'Accessibility'],
  },
  {
    id: 'company',
    title: 'Company',
    links: ['About Nomadly', 'Newsroom', 'Careers', 'Investors', 'Sustainability'],
  },
];

const socials = [
  {
    id: 'instagram',
    name: 'Instagram',
    path: 'M7 2h10a5 5 0 015 5v10a5 5 0 01-5 5H7a5 5 0 01-5-5V7a5 5 0 015-5zm5 5.5a4.5 4.5 0 100 9 4.5 4.5 0 000-9zm5.6-1.1a1.1 1.1 0 110 2.2 1.1 1.1 0 010-2.2z',
  },
  {
    id: 'x',
    name: 'X',
    path: 'M3 3h5l4.5 6L17 3h4l-7 9.2L21.5 21H16l-4.7-6.4L6 21H2l7.4-9.6L3 3z',
  },
  {
    id: 'youtube',
    name: 'YouTube',
    path: 'M22 12s0-3.2-.4-4.7a2.5 2.5 0 00-1.8-1.8C18.3 5 12 5 12 5s-6.3 0-7.8.5A2.5 2.5 0 002.4 7.3C2 8.8 2 12 2 12s0 3.2.4 4.7a2.5 2.5 0 001.8 1.8C5.7 19 12 19 12 19s6.3 0 7.8-.5a2.5 2.5 0 001.8-1.8C22 15.2 22 12 22 12zM10 15V9l5 3-5 3z',
  },
  {
    id: 'linkedin',
    name: 'LinkedIn',
    path: 'M4.5 3.5a2 2 0 110 4 2 2 0 010-4zM3 9h3v12H3V9zm6 0h3v1.7c.6-1 1.8-2 3.6-2 2.7 0 4.4 1.7 4.4 5V21h-3v-6.6c0-1.7-.7-2.6-2.1-2.6-1.2 0-2 .8-2.3 1.6-.1.3-.1.7-.1 1.1V21H9V9z',
  },
];

export default function Footer() {
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const [hoveredSocial, setHoveredSocial] = useState<string | null>(null);
  const year = new Date().getFullYear();

  return (
    <footer
      style={{
        padding: '76px 24px 34px',
        background: '#0b0a0d',
        borderTop: '1px solid rgba(255,255,255,0.08)',
      }}
    >
      <div style={{ maxWidth: '1240px', margin: '0 auto' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(190px, 1fr))',
            gap: '44px',
            marginBottom: '54px',
          }}
        >
          <div style={{ gridColumn: 'span 1', minWidth: '220px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
              <span
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '11px',
                  background: 'linear-gradient(135deg, #ff5a5f 0%, #c8375d 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 11l9-8 9 8" />
                  <path d="M5 10v10h14V10" />
                  <path d="M10 20v-6h4v6" />
                </svg>
              </span>
              <span
                style={{
                  fontFamily: "'Fraunces', Georgia, serif",
                  fontSize: '20px',
                  fontWeight: 700,
                  color: '#f6f4f2',
                }}
              >
                Nomadly
              </span>
            </div>
            <p style={{ fontSize: '14px', lineHeight: 1.7, color: '#a9a4b4', maxWidth: '270px' }}>
              Independently inspected homes in 190 countries, hosted by people we have actually
              met. Honest prices, keyless arrivals, humans on call.
            </p>
            <div style={{ display: 'flex', gap: '10px', marginTop: '22px' }}>
              {socials.map((social) => {
                const active = hoveredSocial === social.id;
                return (
                  <a
                    key={social.id}
                    href="#top"
                    aria-label={social.name}
                    onMouseEnter={() => setHoveredSocial(social.id)}
                    onMouseLeave={() => setHoveredSocial(null)}
                    style={{
                      width: '38px',
                      height: '38px',
                      borderRadius: '12px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      border: '1px solid',
                      borderColor: active ? 'rgba(255,90,95,0.5)' : 'rgba(255,255,255,0.1)',
                      background: active ? 'rgba(255,90,95,0.12)' : 'rgba(255,255,255,0.03)',
                      color: active ? '#ff8a63' : '#a9a4b4',
                      transform: active ? 'translateY(-3px)' : 'translateY(0)',
                      transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
                    }}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <path d={social.path} />
                    </svg>
                  </a>
                );
              })}
            </div>
          </div>

          {columns.map((column) => (
            <div key={column.id}>
              <div
                style={{
                  fontSize: '12px',
                  fontWeight: 700,
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  color: '#ffffff',
                  marginBottom: '18px',
                }}
              >
                {column.title}
              </div>
              <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
                {column.links.map((link) => {
                  const key = `${column.id}-${link}`;
                  const active = hoveredLink === key;
                  return (
                    <li key={key} style={{ marginBottom: '11px' }}>
                      <a
                        href="#top"
                        onMouseEnter={() => setHoveredLink(key)}
                        onMouseLeave={() => setHoveredLink(null)}
                        style={{
                          fontSize: '14px',
                          textDecoration: 'none',
                          color: active ? '#ffffff' : '#a9a4b4',
                          paddingLeft: active ? '6px' : '0px',
                          display: 'inline-block',
                          transition: 'all 0.22s ease',
                        }}
                      >
                        {link}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>

        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '16px',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingTop: '26px',
            borderTop: '1px solid rgba(255,255,255,0.08)',
          }}
        >
          <div style={{ fontSize: '13.5px', color: '#8f8a9c' }}>
            © {year} Nomadly Travel Inc. · SITE · Crafted for people who unpack slowly.
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '22px' }}>
            {['Privacy', 'Terms', 'Sitemap', 'Cookie preferences'].map((item) => {
              const key = `legal-${item}`;
              const active = hoveredLink === key;
              return (
                <a
                  key={key}
                  href="#top"
                  onMouseEnter={() => setHoveredLink(key)}
                  onMouseLeave={() => setHoveredLink(null)}
                  style={{
                    fontSize: '13.5px',
                    textDecoration: 'none',
                    color: active ? '#ff8a63' : '#8f8a9c',
                    transition: 'color 0.22s ease',
                  }}
                >
                  {item}
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </footer>
  );
}