import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import {
  getPhantomProvider,
  shortenAddress,
  PHANTOM_DOWNLOAD_URL,
} from '../lib/phantom';

interface SignInModalProps {
  open: boolean;
  onClose: () => void;
  onSignedIn: (address: string) => void;
}

type Status = 'idle' | 'connecting' | 'signing' | 'done' | 'error';

export default function SignInModal({ open, onClose, onSignedIn }: SignInModalProps) {
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState<string | null>(null);
  const [address, setAddress] = useState<string | null>(null);
  const [closeHover, setCloseHover] = useState(false);
  const [btnHover, setBtnHover] = useState(false);

  // Lock body scroll + allow Escape to close while the modal is open.
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

  // Reset transient state each time the modal reopens.
  useEffect(() => {
    if (open) {
      setStatus('idle');
      setError(null);
      setAddress(null);
    }
  }, [open]);

  const handleConnect = async () => {
    setError(null);
    const provider = getPhantomProvider();

    if (!provider) {
      setStatus('error');
      setError('Phantom wallet not found. Install the extension to continue.');
      return;
    }

    try {
      setStatus('connecting');
      const { publicKey } = await provider.connect();
      const walletAddress = publicKey.toString();
      setAddress(walletAddress);

      // Prove ownership by signing a human-readable sign-in message.
      setStatus('signing');
      const message =
        `Sign in to Nomadly\n\n` +
        `Wallet: ${walletAddress}\n` +
        `Issued: ${new Date().toISOString()}\n\n` +
        `Signing is free and will not trigger a blockchain transaction.`;
      const encoded = new TextEncoder().encode(message);
      await provider.signMessage(encoded, 'utf8');

      setStatus('done');
      // Briefly show the success state before the parent dismisses the modal.
      window.setTimeout(() => onSignedIn(walletAddress), 900);
    } catch (err) {
      setStatus('error');
      const code = (err as { code?: number })?.code;
      if (code === 4001) {
        setError('Request rejected. Approve the connection in Phantom to sign in.');
      } else {
        const message = err instanceof Error ? err.message : 'Could not connect to Phantom.';
        setError(message);
      }
    }
  };

  if (!open) return null;

  const busy = status === 'connecting' || status === 'signing';

  const buttonLabel =
    status === 'connecting'
      ? 'Connecting…'
      : status === 'signing'
      ? 'Confirm in Phantom…'
      : status === 'done'
      ? 'Signed in'
      : 'Connect Phantom';

  const overlay = (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Sign in to Nomadly"
      onMouseDown={(e) => {
        // Close only when the backdrop itself is clicked.
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
        background: 'rgba(6, 5, 8, 0.72)',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
        animation: 'fadeIn 0.2s ease both',
      }}
    >
      <div
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: '420px',
          background: 'linear-gradient(180deg, #1a1822 0%, #131218 100%)',
          border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: '24px',
          padding: '34px 30px 30px',
          boxShadow: '0 30px 80px rgba(0,0,0,0.6)',
          animation: 'slideUp 0.28s cubic-bezier(0.4, 0, 0.2, 1) both',
        }}
      >
        <button
          type="button"
          aria-label="Close"
          onClick={onClose}
          onMouseEnter={() => setCloseHover(true)}
          onMouseLeave={() => setCloseHover(false)}
          style={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            width: '34px',
            height: '34px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '999px',
            border: '1px solid rgba(255,255,255,0.12)',
            background: closeHover ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.03)',
            color: '#cbc6d6',
            cursor: 'pointer',
            transition: 'background 0.2s ease',
          }}
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>

        <div
          style={{
            width: '54px',
            height: '54px',
            borderRadius: '16px',
            background: 'linear-gradient(135deg, #ab9ff2 0%, #7c5cff 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '18px',
            boxShadow: '0 0 28px rgba(124, 92, 255, 0.4)',
          }}
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="6" width="20" height="13" rx="3" />
            <path d="M2 10h20" />
            <circle cx="17" cy="14.5" r="1.4" fill="#ffffff" stroke="none" />
          </svg>
        </div>

        <h2
          style={{
            fontSize: '25px',
            fontWeight: 700,
            color: '#f6f4f2',
            marginBottom: '8px',
          }}
        >
          Sign in to Nomadly
        </h2>
        <p
          style={{
            fontSize: '14.5px',
            lineHeight: 1.55,
            color: '#a9a4b4',
            marginBottom: '24px',
          }}
        >
          Connect your Phantom wallet to book stays, manage trips and get paid as a host — no
          password required.
        </p>

        {status === 'done' && address ? (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              padding: '14px 16px',
              borderRadius: '14px',
              background: 'rgba(0, 166, 153, 0.12)',
              border: '1px solid rgba(0, 166, 153, 0.4)',
              marginBottom: '20px',
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#3ddc97" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 6L9 17l-5-5" />
            </svg>
            <span style={{ fontSize: '14px', fontWeight: 600, color: '#d9fff2' }}>
              Connected as {shortenAddress(address)}
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
              borderRadius: '14px',
              background: 'rgba(255, 90, 95, 0.1)',
              border: '1px solid rgba(255, 90, 95, 0.4)',
              marginBottom: '20px',
            }}
          >
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#ff8a8d" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: '1px' }}>
              <circle cx="12" cy="12" r="10" />
              <path d="M12 8v5M12 16.5v.5" />
            </svg>
            <span style={{ fontSize: '13.5px', lineHeight: 1.5, color: '#ffc4c6' }}>{error}</span>
          </div>
        ) : null}

        <button
          type="button"
          onClick={handleConnect}
          disabled={busy || status === 'done'}
          onMouseEnter={() => setBtnHover(true)}
          onMouseLeave={() => setBtnHover(false)}
          style={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '10px',
            padding: '15px 20px',
            borderRadius: '14px',
            border: 'none',
            background:
              busy || status === 'done'
                ? 'rgba(124, 92, 255, 0.5)'
                : btnHover
                ? 'linear-gradient(135deg, #b6a9ff 0%, #8b6dff 100%)'
                : 'linear-gradient(135deg, #ab9ff2 0%, #7c5cff 100%)',
            color: '#ffffff',
            fontSize: '15.5px',
            fontWeight: 700,
            cursor: busy || status === 'done' ? 'default' : 'pointer',
            boxShadow: btnHover && !busy ? '0 14px 30px rgba(124, 92, 255, 0.4)' : 'none',
            transition: 'all 0.22s ease',
          }}
        >
          {busy ? (
            <span
              style={{
                width: '17px',
                height: '17px',
                borderRadius: '999px',
                border: '2px solid rgba(255,255,255,0.4)',
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
            color: '#a9a4b4',
            textDecoration: 'none',
          }}
        >
          Don't have Phantom? <span style={{ color: '#ab9ff2' }}>Get it here →</span>
        </a>
      </div>
    </div>
  );

  return createPortal(overlay, document.body);
}
