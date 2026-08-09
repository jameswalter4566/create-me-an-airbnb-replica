import React from 'react';

const COLUMNS: { title: string; links: string[] }[] = [
  {
    title: 'Support',
    links: [
      'Help Centre',
      'Get help with a safety issue',
      'AirCover',
      'Anti-discrimination',
      'Disability support',
      'Cancellation options',
    ],
  },
  {
    title: 'Hosting',
    links: [
      'Airbnb your home',
      'AirCover for Hosts',
      'Hosting resources',
      'Community forum',
      'Hosting responsibly',
      'Join a free Hosting class',
    ],
  },
  {
    title: 'Airbnb',
    links: [
      'Newsroom',
      'New features',
      'Careers',
      'Investors',
      'Gift cards',
      'Airbnb.org emergency stays',
    ],
  },
];

export default function Footer() {
  return (
    <footer style={{ borderTop: '1px solid #ebebeb', background: '#f7f7f7' }}>
      <div
        style={{
          maxWidth: 1280,
          margin: '0 auto',
          padding: '40px 40px 24px',
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: 24,
            paddingBottom: 32,
            borderBottom: '1px solid #dddddd',
          }}
        >
          {COLUMNS.map((col) => (
            <div key={col.title}>
              <h3 style={{ fontSize: 14, fontWeight: 600, marginBottom: 14 }}>
                {col.title}
              </h3>
              <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
                {col.links.map((link) => (
                  <li key={link} style={{ marginBottom: 10 }}>
                    <a
                      href="#"
                      onClick={(e) => e.preventDefault()}
                      style={{
                        fontSize: 14,
                        color: '#6a6a6a',
                        textDecoration: 'none',
                      }}
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 12,
            paddingTop: 22,
          }}
        >
          <div style={{ fontSize: 14, color: '#222222' }}>
            © 2026 Airbnb Replica · Terms · Sitemap · Privacy
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 22,
              fontSize: 14,
              fontWeight: 600,
              color: '#222222',
            }}
          >
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="9" />
                <path d="M3 12h18M12 3c2.5 2.6 2.5 15.4 0 18M12 3c-2.5 2.6-2.5 15.4 0 18" />
              </svg>
              English (GB)
            </span>
            <span>$ USD</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
