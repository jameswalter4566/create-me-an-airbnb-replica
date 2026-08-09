import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { shortenAddress, PHANTOM_DOWNLOAD_URL } from '../lib/phantom';
import type { PhantomStatus } from '../hooks/usePhantom';

interface SignInModalProps {
  open: boolean;
  status: PhantomStatus;
  error: string | null;
  account: string | null;
  onClose: () => void;
  /** Re-run the connect + sign flow (used by the retry / manual button). */
  onConnect: () => void;
}

export default function SignInModal({
  open,
  status,
  error,
  account,
  onClose,
  onConnect,
}: SignInModalProps) {
  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [open, onClose]);

  if (!open) return null;

  const busy = status === 'connecting' || status === 'signing';
  const done = status === 'connected';

  const buttonLabel =
    status === 'connecting'
      ? 'Connecting…'
      : status === 'signing'
      ? 'Confirm in Phantom…'
      : done
      ? 'Signed in'
      : status === 'error'
      ? 'Try again'
      : 'Continue with Phantom';

  const overlay = (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Log in or sign up"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 2147483000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px',
        background: 'rgba(0, 0, 0, 0.5)',
        animation: 'fadeIn 0.2s ease both',
      }}
    >
      <div
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: '568px',
          background: '#fff',
          borderRadius: '16px',
          boxShadow: '0 8px 28px rgba(0,0,0,0.28)',
          overflow: 'hidden',
          animation: 'popIn 0.2s cubic-bezier(0.35,0,0.28,1) both',
        }}
      >
        {/* Header */}
        <div
          style={{
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px 24px',
            borderBottom: '1px solid #ebebeb',
          }}
        >
          <button
            type="button"
            aria-label="Close"
            onClick={onClose}
            style={{
              position: 'absolute',
              left: '16px',
              width: '32px',
              height: '32px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: '999px',
              border: 'none',
              background: 'transparent',
              color: '#222',
              cursor: 'pointer',
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
          <h2 style={{ fontSize: '16px', fontWeight: 700, color: '#222' }}>Log in or sign up</h2>
        </div>

        {/* Body */}
        <div style={{ padding: '24px' }}>
          <h3 style={{ fontSize: '22px', fontWeight: 700, color: '#222', marginBottom: '22px' }}>
            Welcome to Airbnb
          </h3>

          {done && account ? (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '14px 16px',
                borderRadius: '12px',
                background: '#f0fbf4',
                border: '1px solid #b7e4c7',
                marginBottom: '18px',
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1a7f43" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 6L9 17l-5-5" />
              </svg>
              <span style={{ fontSize: '14px', fontWeight: 600, color: '#1a7f43' }}>
                Signed in as {shortenAddress(account)}
              </span>
            </div>
          ) : null}

          {error ? (
            <div
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '10px',
                padding: '12px 14px',
                borderRadius: '12px',
                background: '#fff5f6',
                border: '1px solid #ffccd3',
                marginBottom: '18px',
              }}
            >
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#c8102e" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: '1px' }}>
                <circle cx="12" cy="12" r="10" />
                <path d="M12 8v5M12 16.5v.5" />
              </svg>
              <span style={{ fontSize: '13.5px', lineHeight: 1.5, color: '#c8102e' }}>{error}</span>
            </div>
          ) : null}

          <p style={{ fontSize: '14px', lineHeight: 1.6, color: '#6a6a6a', marginBottom: '18px' }}>
            {busy
              ? 'Approve the request in the Phantom popup to finish signing in.'
              : 'Connect your Phantom wallet to book stays, save wishlists and manage trips — no password required.'}
          </p>

          <button
            type="button"
            onClick={onConnect}
            disabled={busy || done}
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px',
              padding: '15px 20px',
              borderRadius: '10px',
              border: 'none',
              background: busy || done ? '#f0a8b6' : 'var(--rausch-grad)',
              color: '#ffffff',
              fontSize: '16px',
              fontWeight: 700,
              cursor: busy || done ? 'default' : 'pointer',
            }}
          >
            {busy ? (
              <span
                style={{
                  width: '17px',
                  height: '17px',
                  borderRadius: '999px',
                  border: '2px solid rgba(255,255,255,0.5)',
                  borderTopColor: '#ffffff',
                  animation: 'spin 0.7s linear infinite',
                }}
              />
            ) : (
              <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="6" width="20" height="13" rx="3" />
                <path d="M2 10h20" />
              </svg>
            )}
            {buttonLabel}
          </button>

          <a
            href={PHANTOM_DOWNLOAD_URL}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'block',
              textAlign: 'center',
              marginTop: '16px',
              fontSize: '13px',
              fontWeight: 600,
              color: '#6a6a6a',
            }}
          >
            Don&apos;t have Phantom?{' '}
            <span style={{ color: 'var(--rausch)', textDecoration: 'underline' }}>Get it here →</span>
          </a>
        </div>
      </div>
    </div>
  );

  return createPortal(overlay, document.body);
}
