import React, { useEffect, useState } from 'react';
import SearchBar from './SearchBar';
import UserMenu from './UserMenu';

const tabs = [
  { id: 'all', label: 'All', icon: '🌐' },
  { id: 'homes', label: 'Homes', icon: '🏠' },
  { id: 'experiences', label: 'Experiences', icon: '🎈' },
  { id: 'services', label: 'Services', icon: '🛎️' },
];

function AirbnbLogo() {
  return (
    <a href="#top" aria-label="Airbnb home" style={{ display: 'flex', alignItems: 'center', gap: '2px', color: 'var(--rausch)' }}>
      <svg width="30" height="32" viewBox="0 0 32 32" fill="currentColor" aria-hidden="true">
        <path d="M16 1c2.008 0 3.463.963 4.751 3.269l.533 1.025c1.954 3.83 6.114 12.54 7.1 14.836l.145.353c.667 1.591.91 2.472.96 3.396l.01.415.001.228c0 4.062-2.877 6.98-6.764 6.98-2.4 0-4.744-1.221-6.997-3.556l-.202-.213-.209.213C13.075 30.68 10.73 31.9 8.33 31.9c-3.887 0-6.764-2.918-6.764-6.98l.001-.228.01-.415c.05-.924.293-1.805.96-3.396l.145-.353c.986-2.297 5.146-11.007 7.1-14.836l.533-1.025C11.537 1.963 12.992 1 15 1h1zm0 2.887c-.976 0-1.57.416-2.32 1.845l-.522 1.003c-1.848 3.63-5.855 12.045-6.775 14.202l-.135.328c-.548 1.352-.717 1.955-.746 2.55l-.008.31c0 2.436 1.62 4.093 3.877 4.093 1.4 0 3.017-.813 4.66-2.32l.24-.229.257-.257-.185-.198c-1.977-2.144-3.29-4.34-3.29-6.71 0-2.86 2.174-4.995 4.998-4.995s4.998 2.135 4.998 4.995c0 2.37-1.313 4.566-3.29 6.71l-.185.198.257.257.24.23c1.643 1.506 3.26 2.319 4.66 2.319 2.257 0 3.877-1.657 3.877-4.093l-.008-.31c-.03-.595-.198-1.198-.746-2.55l-.135-.328c-.92-2.157-4.927-10.572-6.775-14.202l-.522-1.003C17.57 4.303 16.976 3.887 16 3.887zm0 12.014c-1.253 0-2.11.906-2.11 2.108 0 1.246.857 2.687 2.11 4.01 1.253-1.323 2.11-2.764 2.11-4.01 0-1.202-.857-2.108-2.11-2.108z" />
      </svg>
      <span
        style={{
          fontSize: '22px',
          fontWeight: 800,
          letterSpacing: '-0.04em',
          color: 'var(--rausch)',
        }}
      >
        airbnb
      </span>
    </a>
  );
}

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [activeTab, setActiveTab] = useState('all');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      id="top"
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 300,
        background: '#fff',
        borderBottom: '1px solid #ebebeb',
        boxShadow: scrolled ? '0 2px 12px rgba(0,0,0,0.07)' : 'none',
        transition: 'box-shadow 0.2s ease',
      }}
    >
      <div className="container" style={{ paddingTop: '16px', paddingBottom: '12px' }}>
        {/* Top row */}
        <div
          style={{
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            minHeight: '48px',
          }}
        >
          <AirbnbLogo />

          {/* Center tabs (absolutely centered) */}
          <nav
            className="center-tabs"
            aria-label="Explore"
            style={{
              position: 'absolute',
              left: '50%',
              transform: 'translateX(-50%)',
              display: 'flex',
              alignItems: 'flex-end',
              gap: '8px',
            }}
          >
            {tabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                className={`nav-tab${activeTab === tab.id ? ' active' : ''}`}
                onClick={() => setActiveTab(tab.id)}
              >
                <span className="nav-tab-icon" aria-hidden="true">
                  {tab.icon}
                </span>
                {tab.label}
              </button>
            ))}
          </nav>

          <div style={{ display: 'flex', alignItems: 'center' }}>
            <UserMenu />
          </div>
        </div>

        {/* Search row */}
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '14px' }}>
          <div className="search-full">
            <SearchBar />
          </div>
          <button
            type="button"
            className="search-compact"
            onClick={() => {
              const el = document.getElementById('listings');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            style={{
              alignItems: 'center',
              gap: '10px',
              padding: '12px 8px 12px 20px',
              borderRadius: '999px',
              border: '1px solid var(--line)',
              background: '#fff',
              boxShadow: 'var(--shadow-lg)',
              cursor: 'pointer',
              fontWeight: 700,
              fontSize: '14px',
            }}
          >
            Start your search
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '32px',
                height: '32px',
                borderRadius: '999px',
                background: 'var(--rausch)',
                color: '#fff',
              }}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
                <circle cx="11" cy="11" r="7" />
                <path d="M21 21l-4.3-4.3" />
              </svg>
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}
