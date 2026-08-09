import React, { useState, useEffect } from 'react';
import SignInModal from './SignInModal';
import { shortenAddress } from '../lib/phantom';
import { usePhantom } from '../hooks/usePhantom';

const navLinks = [
  { id: 'stays', label: 'Stays', href: '#stays' },
  { id: 'experiences', label: 'Experiences', href: '#experiences' },
  { id: 'hosting', label: 'Hosting', href: '#hosting' },
  { id: 'stories', label: 'Stories', href: '#stories' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const [ctaHover, setCtaHover] = useState(false);
  const [searchHover, setSearchHover] = useState(false);
  const [signInHover, setSignInHover] = useState(false);
  const [accountHover, setAccountHover] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [signInOpen, setSignInOpen] = useState(false);

  const { account, status, error, connect, disconnect, reset } = usePhantom();

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Dismiss the modal shortly after a successful sign-in.
  useEffect(() => {
    if (signInOpen && status === 'connected') {
      const timer = window.setTimeout(() => setSignInOpen(false), 900);
      return () => window.clearTimeout(timer);
    }
  }, [signInOpen, status]);

  // Kick off the Phantom connection directly from the click gesture so the
  // wallet approval popup is allowed to open, and surface progress in the modal.
  const handleSignIn = () => {
    reset();
    setSignInOpen(true);
    void connect();
  };

  const handleDisconnect = () => {
    void disconnect();
  };

  return (
    <nav
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 200,
        background: scrolled ? 'rgba(11, 10, 13, 0.86)' : 'rgba(11, 10, 13, 0.4)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        borderBottom: scrolled
          ? '1px solid rgba(255,255,255,0.09)'
          : '1px solid rgba(255,255,255,0.02)',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      }}
    >
      <div
        style={{
          maxWidth: '1240px',
          margin: '0 auto',
          padding: scrolled ? '12px 24px' : '18px 24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '20px',
          transition: 'padding 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        }}
      >
        <a
          href="#top"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            textDecoration: 'none',
          }}
        >
          <span
            style={{
              width: '34px',
              height: '34px',
              borderRadius: '12px',
              background: 'linear-gradient(135deg, #ff5a5f 0%, #c8375d 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 0 22px rgba(255, 90, 95, 0.35)',
            }}
          >
            <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 11l9-8 9 8" />
              <path d="M5 10v10h14V10" />
              <path d="M10 20v-6h4v6" />
            </svg>
          </span>
          <span
            style={{
              fontFamily: "'Fraunces', Georgia, serif",
              fontSize: '21px',
              fontWeight: 700,
              color: '#f6f4f2',
              letterSpacing: '-0.02em',
            }}
          >
            Nomadly
          </span>
          <span
            style={{
              fontSize: '10px',
              fontWeight: 700,
              letterSpacing: '0.14em',
              color: '#ff8a63',
              border: '1px solid rgba(255, 138, 99, 0.35)',
              borderRadius: '999px',
              padding: '3px 7px',
            }}
          >
            SITE
          </span>
        </a>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '30px',
          }}
        >
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={link.href}
              onMouseEnter={() => setHoveredLink(link.id)}
              onMouseLeave={() => setHoveredLink(null)}
              style={{
                fontSize: '14.5px',
                fontWeight: 600,
                textDecoration: 'none',
                color: hoveredLink === link.id ? '#ffffff' : '#a9a4b4',
                position: 'relative',
                paddingBottom: '4px',
                transition: 'color 0.2s ease',
              }}
            >
              {link.label}
              <span
                style={{
                  position: 'absolute',
                  left: 0,
                  bottom: 0,
                  height: '2px',
                  width: hoveredLink === link.id ? '100%' : '0%',
                  background: 'linear-gradient(90deg, #ff5a5f, #ff8a63)',
                  borderRadius: '2px',
                  transition: 'width 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
                }}
              />
            </a>
          ))}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button
            type="button"
            onMouseEnter={() => setSearchHover(true)}
            onMouseLeave={() => setSearchHover(false)}
            onClick={() => setMenuOpen((prev) => !prev)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '9px 14px',
              borderRadius: '999px',
              border: '1px solid',
              borderColor: searchHover ? 'rgba(255,90,95,0.45)' : 'rgba(255,255,255,0.12)',
              background: searchHover ? 'rgba(255,90,95,0.08)' : 'rgba(255,255,255,0.03)',
              color: searchHover ? '#ffffff' : '#cbc6d6',
              fontSize: '13.5px',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
              <circle cx="11" cy="11" r="7" />
              <path d="M20 20l-3.2-3.2" />
            </svg>
            Anywhere
          </button>

          {account ? (
            <button
              type="button"
              onClick={handleDisconnect}
              onMouseEnter={() => setAccountHover(true)}
              onMouseLeave={() => setAccountHover(false)}
              title="Click to disconnect"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '9px',
                padding: '9px 15px',
                borderRadius: '999px',
                border: '1px solid',
                borderColor: accountHover ? 'rgba(124,92,255,0.6)' : 'rgba(124,92,255,0.35)',
                background: accountHover ? 'rgba(124,92,255,0.16)' : 'rgba(124,92,255,0.08)',
                color: '#e7e2ff',
                fontSize: '13.5px',
                fontWeight: 700,
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
            >
              <span
                style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '999px',
                  background: '#3ddc97',
                  boxShadow: '0 0 8px rgba(61, 220, 151, 0.8)',
                }}
              />
              {accountHover ? 'Disconnect' : shortenAddress(account)}
            </button>
          ) : (
            <button
              type="button"
              onClick={handleSignIn}
              onMouseEnter={() => setSignInHover(true)}
              onMouseLeave={() => setSignInHover(false)}
              style={{
                padding: '10px 18px',
                borderRadius: '999px',
                border: '1px solid',
                borderColor: signInHover ? 'rgba(255,255,255,0.28)' : 'rgba(255,255,255,0.14)',
                background: signInHover ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.03)',
                color: '#f6f4f2',
                fontSize: '14px',
                fontWeight: 700,
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
            >
              Sign in
            </button>
          )}

          <button
            type="button"
            onMouseEnter={() => setCtaHover(true)}
            onMouseLeave={() => setCtaHover(false)}
            style={{
              padding: '11px 22px',
              borderRadius: '999px',
              border: 'none',
              background: ctaHover
                ? 'linear-gradient(135deg, #ff6f73 0%, #d8446a 100%)'
                : 'linear-gradient(135deg, #ff5a5f 0%, #c8375d 100%)',
              color: '#ffffff',
              fontSize: '14px',
              fontWeight: 700,
              cursor: 'pointer',
              transform: ctaHover ? 'translateY(-2px)' : 'translateY(0)',
              boxShadow: ctaHover
                ? '0 14px 30px rgba(255, 90, 95, 0.36)'
                : '0 6px 18px rgba(255, 90, 95, 0.2)',
              transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
            }}
          >
            Become a host
          </button>
        </div>
      </div>

      <SignInModal
        open={signInOpen}
        status={status}
        error={error}
        account={account}
        onClose={() => setSignInOpen(false)}
        onConnect={() => void connect()}
      />

      {menuOpen ? (
        <div
          style={{
            maxWidth: '1240px',
            margin: '0 auto',
            padding: '0 24px 18px',
            animation: 'slideUp 0.3s ease both',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '10px',
              padding: '14px',
              borderRadius: '18px',
              background: 'rgba(23, 22, 29, 0.9)',
              border: '1px solid rgba(255,255,255,0.09)',
            }}
          >
            {['Lisbon lofts', 'Kyoto ryokans', 'Tulum palapas', 'Reykjavík cabins', 'Cape Town villas'].map((chip) => (
              <span
                key={chip}
                style={{
                  fontSize: '13px',
                  fontWeight: 600,
                  color: '#cbc6d6',
                  padding: '7px 13px',
                  borderRadius: '999px',
                  border: '1px solid rgba(255,255,255,0.12)',
                  background: 'rgba(255,255,255,0.04)',
                }}
              >
                {chip}
              </span>
            ))}
          </div>
        </div>
      ) : null}
    </nav>
  );
}