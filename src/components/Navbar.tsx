import React, { useEffect, useRef, useState } from 'react';
import {
  AirbnbLogo,
  GlobeStandIcon,
  HomeIcon,
  BalloonIcon,
  ServiceIcon,
  MenuIcon,
  UserIcon,
} from './icons';
import SearchBar from './SearchBar';

const TABS = [
  { id: 'all', label: 'All', Icon: GlobeStandIcon },
  { id: 'homes', label: 'Homes', Icon: HomeIcon },
  { id: 'experiences', label: 'Experiences', Icon: BalloonIcon },
  { id: 'services', label: 'Services', Icon: ServiceIcon },
];

const MENU_TOP = ['Wishlists', 'Trips', 'Messages'];
const MENU_MID = ['Account'];
const MENU_BOTTOM = [
  'Airbnb your home',
  'Host an experience',
  'Refer a Host',
  'Find a co-host',
  'Gift cards',
  'Help Centre',
];

export default function Navbar() {
  const [active, setActive] = useState('all');
  const [menuOpen, setMenuOpen] = useState(false);
  const [hostHover, setHostHover] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', onDoc);
    return () => document.removeEventListener('mousedown', onDoc);
  }, []);

  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 100,
        background: '#ffffff',
        borderBottom: '1px solid #ebebeb',
        boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
      }}
    >
      {/* Top row */}
      <div
        style={{
          position: 'relative',
          maxWidth: 1280,
          margin: '0 auto',
          padding: '16px 40px 0',
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
        }}
      >
        <a
          href="#top"
          aria-label="Airbnb home"
          style={{ paddingTop: 4, flex: '0 0 auto' }}
        >
          <AirbnbLogo height={32} />
        </a>

        {/* Center tabs */}
        <nav
          className="hscroll nav-tabs"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 10,
            flex: '1 1 auto',
            minWidth: 0,
            overflowX: 'auto',
          }}
        >
          {TABS.map(({ id, label, Icon }) => {
            const isActive = active === id;
            return (
              <button
                key={id}
                type="button"
                onClick={() => setActive(id)}
                style={{
                  position: 'relative',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  background: 'none',
                  border: 'none',
                  padding: '6px 10px 14px',
                  fontSize: 15,
                  fontWeight: isActive ? 600 : 500,
                  color: isActive ? '#222222' : '#6a6a6a',
                  transition: 'color 0.15s ease',
                }}
              >
                <Icon size={26} />
                <span>{label}</span>
                <span
                  style={{
                    position: 'absolute',
                    left: 8,
                    right: 8,
                    bottom: 0,
                    height: 2,
                    borderRadius: 2,
                    background: isActive ? '#222222' : 'transparent',
                    transition: 'background 0.15s ease',
                  }}
                />
              </button>
            );
          })}
        </nav>

        {/* Right actions */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            paddingTop: 2,
            flex: '0 0 auto',
          }}
        >
          <a
            href="#host"
            onMouseEnter={() => setHostHover(true)}
            onMouseLeave={() => setHostHover(false)}
            onClick={(e) => e.preventDefault()}
            style={{
              fontSize: 14,
              fontWeight: 600,
              color: '#222222',
              padding: '10px 14px',
              borderRadius: 999,
              background: hostHover ? '#f2f2f2' : 'transparent',
              transition: 'background 0.15s ease',
              whiteSpace: 'nowrap',
            }}
          >
            Become a host
          </a>

          <AvatarButton />

          <div ref={menuRef} style={{ position: 'relative' }}>
            <button
              type="button"
              aria-label="Main menu"
              onClick={() => setMenuOpen((v) => !v)}
              style={{
                position: 'relative',
                width: 42,
                height: 42,
                borderRadius: '50%',
                border: '1px solid #dddddd',
                background: menuOpen ? '#f2f2f2' : '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#222222',
                boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
                transition: 'background 0.15s ease',
              }}
            >
              <MenuIcon size={16} />
              <span
                style={{
                  position: 'absolute',
                  top: 3,
                  right: 4,
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  background: '#ff385c',
                  border: '1.5px solid #ffffff',
                }}
              />
            </button>

            {menuOpen && (
              <div
                style={{
                  position: 'absolute',
                  top: 52,
                  right: 0,
                  width: 260,
                  background: '#ffffff',
                  borderRadius: 14,
                  boxShadow: '0 6px 24px rgba(0,0,0,0.18)',
                  border: '1px solid #ebebeb',
                  padding: '8px 0',
                  overflow: 'hidden',
                }}
              >
                {MENU_TOP.map((item) => (
                  <MenuItem key={item} label={item} bold />
                ))}
                <Divider />
                {MENU_MID.map((item) => (
                  <MenuItem key={item} label={item} bold />
                ))}
                <Divider />
                {MENU_BOTTOM.map((item) => (
                  <MenuItem key={item} label={item} />
                ))}
                <Divider />
                <MenuItem label="Log out" />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Search row */}
      <div
        style={{
          maxWidth: 1280,
          margin: '0 auto',
          padding: '14px 40px 20px',
        }}
      >
        <SearchBar />
      </div>
    </header>
  );
}

function AvatarButton() {
  const [hover, setHover] = useState(false);
  return (
    <button
      type="button"
      aria-label="Your profile"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        width: 40,
        height: 40,
        borderRadius: '50%',
        border: 'none',
        padding: 0,
        overflow: 'hidden',
        background:
          'linear-gradient(135deg, #6b7280 0%, #374151 60%, #1f2937 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        boxShadow: hover ? '0 2px 8px rgba(0,0,0,0.22)' : 'none',
        transition: 'box-shadow 0.15s ease',
      }}
    >
      <UserIcon size={40} style={{ fill: '#e6e8eb' }} />
    </button>
  );
}

function MenuItem({ label, bold = false }: { label: string; bold?: boolean }) {
  const [hover, setHover] = useState(false);
  return (
    <button
      type="button"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={(e) => e.preventDefault()}
      style={{
        display: 'block',
        width: '100%',
        textAlign: 'left',
        border: 'none',
        background: hover ? '#f7f7f7' : 'transparent',
        padding: '11px 18px',
        fontSize: 14,
        fontWeight: bold ? 600 : 400,
        color: '#222222',
      }}
    >
      {label}
    </button>
  );
}

function Divider() {
  return <div style={{ height: 1, background: '#ebebeb', margin: '8px 0' }} />;
}
