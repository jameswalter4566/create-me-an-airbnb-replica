import React, { useEffect, useRef, useState } from 'react';
import SignInModal from './SignInModal';
import { usePhantom } from '../hooks/usePhantom';
import { shortenAddress } from '../lib/phantom';

function GlobeIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#222" strokeWidth="2" aria-hidden="true">
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3c2.5 2.5 2.5 15 0 18M12 3c-2.5 2.5-2.5 15 0 18" />
    </svg>
  );
}

function Avatar({ connected }: { connected: boolean }) {
  return (
    <span
      style={{
        position: 'relative',
        width: '30px',
        height: '30px',
        borderRadius: '999px',
        background: connected ? 'var(--rausch-grad)' : '#717171',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flex: '0 0 auto',
      }}
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="#fff" aria-hidden="true">
        <circle cx="12" cy="8" r="4" />
        <path d="M4 20c0-4 3.6-6.5 8-6.5s8 2.5 8 6.5" />
      </svg>
    </span>
  );
}

export default function UserMenu() {
  const [open, setOpen] = useState(false);
  const [signInOpen, setSignInOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);

  const { account, status, error, connect, disconnect, reset } = usePhantom();
  const connected = status === 'connected' && Boolean(account);

  useEffect(() => {
    const onDown = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', onDown);
    return () => document.removeEventListener('mousedown', onDown);
  }, []);

  // Auto-dismiss the modal shortly after a successful sign-in.
  useEffect(() => {
    if (signInOpen && status === 'connected') {
      const t = window.setTimeout(() => setSignInOpen(false), 900);
      return () => window.clearTimeout(t);
    }
  }, [signInOpen, status]);

  const handleSignIn = () => {
    setOpen(false);
    reset();
    setSignInOpen(true);
    void connect();
  };

  const handleLogout = () => {
    setOpen(false);
    void disconnect();
  };

  return (
    <div ref={wrapRef} style={{ position: 'relative', display: 'flex', alignItems: 'center', gap: '4px' }}>
      <a
        href="#host"
        className="ghost-pill"
        style={{ padding: '12px 14px', fontSize: '14px', fontWeight: 600, whiteSpace: 'nowrap' }}
      >
        Become a host
      </a>

      <button
        type="button"
        className="ghost-pill"
        aria-label="Choose a language and region"
        style={{ width: '42px', height: '42px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
        <GlobeIcon />
      </button>

      <button
        type="button"
        className="user-menu"
        aria-label="Main navigation menu"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#222" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
          <path d="M3 6h18M3 12h18M3 18h18" />
        </svg>
        <span style={{ position: 'relative' }}>
          <Avatar connected={connected} />
          {!connected ? (
            <span
              style={{
                position: 'absolute',
                top: '-2px',
                right: '-2px',
                width: '9px',
                height: '9px',
                borderRadius: '999px',
                background: 'var(--rausch)',
                border: '1.5px solid #fff',
              }}
            />
          ) : null}
        </span>
      </button>

      {open ? (
        <div className="popover" style={{ top: '52px', right: 0, width: '240px', padding: '8px 0' }}>
          {connected ? (
            <>
              <div style={{ padding: '10px 16px 6px' }}>
                <div style={{ fontSize: '13px', color: '#6a6a6a' }}>Signed in as</div>
                <div style={{ fontSize: '14px', fontWeight: 700, color: '#222' }}>
                  {shortenAddress(account as string)}
                </div>
              </div>
              <div style={{ height: '1px', background: '#ebebeb', margin: '6px 0' }} />
              <button type="button" className="menu-item">Trips</button>
              <button type="button" className="menu-item">Wishlists</button>
              <button type="button" className="menu-item">Account</button>
              <div style={{ height: '1px', background: '#ebebeb', margin: '6px 0' }} />
              <button type="button" className="menu-item" onClick={handleLogout}>
                Log out
              </button>
            </>
          ) : (
            <>
              <button
                type="button"
                className="menu-item"
                style={{ fontWeight: 700 }}
                onClick={handleSignIn}
              >
                Sign up
              </button>
              <button type="button" className="menu-item" onClick={handleSignIn}>
                Log in
              </button>
              <div style={{ height: '1px', background: '#ebebeb', margin: '6px 0' }} />
              <a href="#host" className="menu-item" onClick={() => setOpen(false)}>
                Become a host
              </a>
              <button type="button" className="menu-item" onClick={() => setOpen(false)}>
                Help Center
              </button>
            </>
          )}
        </div>
      ) : null}

      <SignInModal
        open={signInOpen}
        status={status}
        error={error}
        account={account}
        onClose={() => setSignInOpen(false)}
        onConnect={() => void connect()}
      />
    </div>
  );
}
