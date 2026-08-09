import React from 'react';

const columns = [
  {
    title: 'Support',
    links: ['Help Center', 'AirCover', 'Anti-discrimination', 'Disability support', 'Cancellation options', 'Report a concern'],
  },
  {
    title: 'Hosting',
    links: ['Airbnb your home', 'AirCover for Hosts', 'Hosting resources', 'Community forum', 'Hosting responsibly', 'Join a free class'],
  },
  {
    title: 'Airbnb',
    links: ['Newsroom', 'New features', 'Careers', 'Investors', 'Gift cards', 'Airbnb.org emergency stays'],
  },
];

export default function Footer() {
  return (
    <footer style={{ borderTop: '1px solid #ebebeb', background: '#f7f7f7', marginTop: '40px' }}>
      <div className="container" style={{ paddingTop: '48px', paddingBottom: '24px' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '28px',
            paddingBottom: '32px',
            borderBottom: '1px solid #dddddd',
          }}
        >
          {columns.map((col) => (
            <div key={col.title}>
              <h3 style={{ fontSize: '15px', fontWeight: 700, color: '#222', marginBottom: '14px' }}>
                {col.title}
              </h3>
              <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {col.links.map((link) => (
                  <li key={link}>
                    <a href="#footer" className="footer-link">
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
            gap: '16px',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingTop: '24px',
          }}
        >
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', alignItems: 'center', fontSize: '14px', color: '#222' }}>
            <span>© 2026 Airbnb, Inc.</span>
            <span aria-hidden="true">·</span>
            <a href="#footer" className="footer-link">Terms</a>
            <span aria-hidden="true">·</span>
            <a href="#footer" className="footer-link">Sitemap</a>
            <span aria-hidden="true">·</span>
            <a href="#footer" className="footer-link">Privacy</a>
            <span aria-hidden="true">·</span>
            <a href="#footer" className="footer-link">Your Privacy Choices</a>
          </div>

          <div style={{ display: 'flex', gap: '20px', alignItems: 'center', fontSize: '14px', fontWeight: 700, color: '#222' }}>
            <button type="button" style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 700 }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#222" strokeWidth="2" aria-hidden="true">
                <circle cx="12" cy="12" r="9" />
                <path d="M3 12h18M12 3c2.5 2.5 2.5 15 0 18M12 3c-2.5 2.5-2.5 15 0 18" />
              </svg>
              English (US)
            </button>
            <button type="button" style={{ background: 'none', border: 'none', cursor: 'pointer', fontWeight: 700 }}>
              $ USD
            </button>
            <div style={{ display: 'flex', gap: '16px' }}>
              <a href="#footer" aria-label="Facebook">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="#222" aria-hidden="true">
                  <path d="M14 9h3V6h-3c-2.2 0-4 1.8-4 4v2H7v3h3v6h3v-6h3l1-3h-4v-2c0-.6.4-1 1-1z" />
                </svg>
              </a>
              <a href="#footer" aria-label="Twitter">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="#222" aria-hidden="true">
                  <path d="M22 5.8c-.7.3-1.5.6-2.3.7.8-.5 1.4-1.3 1.7-2.2-.8.5-1.7.8-2.6 1a4 4 0 0 0-6.8 3.6A11.3 11.3 0 0 1 3.7 4.6a4 4 0 0 0 1.2 5.3c-.6 0-1.2-.2-1.8-.5v.1a4 4 0 0 0 3.2 3.9c-.6.2-1.2.2-1.8.1a4 4 0 0 0 3.7 2.8A8 8 0 0 1 2 18.1 11.3 11.3 0 0 0 8.1 20c7.3 0 11.4-6.1 11.4-11.4v-.5c.8-.6 1.5-1.3 2-2.2z" />
                </svg>
              </a>
              <a href="#footer" aria-label="Instagram">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#222" strokeWidth="2" aria-hidden="true">
                  <rect x="3" y="3" width="18" height="18" rx="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.5" cy="6.5" r="1" fill="#222" stroke="none" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
