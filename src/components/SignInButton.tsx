import React, { useEffect, useRef, useState } from 'react';
import { connectPhantom, PhantomNotFoundError } from '../lib/phantom';
import { supabase, isSupabaseConfigured } from '../lib/supabase';

type Status = 'idle' | 'connecting' | 'need-username' | 'saving' | 'done';

function shorten(address: string): string {
  return `${address.slice(0, 4)}…${address.slice(-4)}`;
}

export default function SignInButton() {
  const [status, setStatus] = useState<Status>('idle');
  const [wallet, setWallet] = useState<string | null>(null);
  const [username, setUsername] = useState<string | null>(null);
  const [usernameInput, setUsernameInput] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [noPhantom, setNoPhantom] = useState(false);
  const [hover, setHover] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
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

  async function handleSignIn() {
    if (status === 'connecting') return;
    setError(null);
    setNoPhantom(false);
    setStatus('connecting');
    try {
      const address = await connectPhantom();
      setWallet(address);

      // If the wallet already has a profile, sign straight in.
      if (isSupabaseConfigured && supabase) {
        const { data, error: qErr } = await supabase
          .from('profiles')
          .select('username')
          .eq('wallet_address', address)
          .maybeSingle();
        if (qErr) throw qErr;
        if (data?.username) {
          setUsername(data.username);
          setStatus('done');
          return;
        }
      }

      // New wallet → ask for a username.
      setUsernameInput('');
      setStatus('need-username');
    } catch (err) {
      if (err instanceof PhantomNotFoundError) {
        setNoPhantom(true);
      } else {
        const message =
          err instanceof Error ? err.message : 'Could not connect to Phantom.';
        setError(message);
      }
      setStatus('idle');
    }
  }

  async function handleSubmitUsername(e: React.FormEvent) {
    e.preventDefault();
    const name = usernameInput.trim();
    if (!name) {
      setError('Please enter a username.');
      return;
    }
    if (name.length > 40) {
      setError('Username must be 40 characters or fewer.');
      return;
    }
    if (!wallet) {
      setError('Wallet not connected. Please sign in again.');
      return;
    }
    if (!isSupabaseConfigured || !supabase) {
      setError(
        'Backend not configured. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to save your profile.'
      );
      return;
    }

    setError(null);
    setStatus('saving');
    try {
      const { error: insErr } = await supabase
        .from('profiles')
        .insert({ wallet_address: wallet, username: name });

      // 23505 = unique_violation → this wallet already registered a profile.
      if (insErr && insErr.code !== '23505') throw insErr;

      setUsername(name);
      setStatus('done');
    } catch (err) {
      const message =
        err instanceof Error ? err.message : 'Could not save your profile.';
      setError(message);
      setStatus('need-username');
    }
  }

  function cancelUsername() {
    setStatus('idle');
    setWallet(null);
    setUsernameInput('');
    setError(null);
  }

  function signOut() {
    setStatus('idle');
    setWallet(null);
    setUsername(null);
    setMenuOpen(false);
    setError(null);
    try {
      window.solana?.disconnect?.();
    } catch {
      /* ignore */
    }
  }

  const connecting = status === 'connecting';
  const signedIn = status === 'done' && wallet;

  return (
    <>
      {signedIn ? (
        <div ref={menuRef} style={{ position: 'relative', flex: '0 0 auto' }}>
          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              fontSize: 14,
              fontWeight: 600,
              color: '#222222',
              padding: '8px 12px',
              borderRadius: 999,
              border: '1px solid #dddddd',
              background: hover || menuOpen ? '#f7f7f7' : '#ffffff',
              transition: 'background 0.15s ease',
              whiteSpace: 'nowrap',
            }}
          >
            <span
              style={{
                width: 22,
                height: 22,
                borderRadius: '50%',
                background:
                  'linear-gradient(135deg,#ff385c 0%,#bd1e59 60%,#8b1d6b 100%)',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff',
                fontSize: 12,
                fontWeight: 700,
              }}
            >
              {(username ?? '?').charAt(0).toUpperCase()}
            </span>
            {username ?? shorten(wallet)}
          </button>

          {menuOpen && (
            <div
              style={{
                position: 'absolute',
                top: 46,
                right: 0,
                width: 240,
                background: '#ffffff',
                borderRadius: 14,
                boxShadow: '0 6px 24px rgba(0,0,0,0.18)',
                border: '1px solid #ebebeb',
                padding: 14,
                zIndex: 200,
              }}
            >
              <div style={{ fontSize: 13, color: '#6a6a6a' }}>Signed in as</div>
              <div style={{ fontSize: 15, fontWeight: 600, marginTop: 2 }}>
                {username}
              </div>
              <div
                style={{
                  fontSize: 12,
                  color: '#6a6a6a',
                  marginTop: 6,
                  fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
                  wordBreak: 'break-all',
                }}
              >
                {wallet}
              </div>
              <div style={{ height: 1, background: '#ebebeb', margin: '12px 0' }} />
              <button
                type="button"
                onClick={signOut}
                style={{
                  width: '100%',
                  padding: '9px 12px',
                  borderRadius: 8,
                  border: '1px solid #dddddd',
                  background: '#ffffff',
                  fontSize: 14,
                  fontWeight: 600,
                  color: '#222222',
                }}
              >
                Sign out
              </button>
            </div>
          )}
        </div>
      ) : (
        <button
          type="button"
          onClick={handleSignIn}
          disabled={connecting}
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
          style={{
            fontSize: 14,
            fontWeight: 600,
            color: '#222222',
            padding: '10px 16px',
            borderRadius: 999,
            border: '1px solid #dddddd',
            background: hover ? '#f7f7f7' : '#ffffff',
            transition: 'background 0.15s ease',
            whiteSpace: 'nowrap',
            opacity: connecting ? 0.7 : 1,
            cursor: connecting ? 'default' : 'pointer',
            flex: '0 0 auto',
          }}
        >
          {connecting ? 'Connecting…' : 'Sign in'}
        </button>
      )}

      {/* Username modal */}
      {(status === 'need-username' || status === 'saving') && (
        <ModalShell onClose={cancelUsername} title="Create your username">
          <p style={{ fontSize: 14, color: '#6a6a6a', margin: '0 0 4px' }}>
            Wallet connected
          </p>
          <div
            style={{
              fontSize: 13,
              color: '#222222',
              fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
              background: '#f7f7f7',
              borderRadius: 8,
              padding: '8px 10px',
              marginBottom: 18,
              wordBreak: 'break-all',
            }}
          >
            {wallet}
          </div>

          <form onSubmit={handleSubmitUsername}>
            <label
              htmlFor="username-input"
              style={{
                display: 'block',
                fontSize: 13,
                fontWeight: 600,
                color: '#222222',
                marginBottom: 6,
              }}
            >
              Username
            </label>
            <input
              id="username-input"
              type="text"
              autoFocus
              value={usernameInput}
              maxLength={40}
              onChange={(e) => setUsernameInput(e.target.value)}
              placeholder="e.g. satoshi"
              style={{
                width: '100%',
                padding: '12px 14px',
                fontSize: 15,
                borderRadius: 10,
                border: '1px solid #b0b0b0',
                outline: 'none',
                marginBottom: error ? 8 : 18,
              }}
            />

            {error && (
              <p style={{ color: '#c13515', fontSize: 13, margin: '0 0 14px' }}>
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={status === 'saving'}
              style={{
                width: '100%',
                padding: '13px 16px',
                fontSize: 15,
                fontWeight: 600,
                color: '#ffffff',
                border: 'none',
                borderRadius: 10,
                background:
                  'linear-gradient(90deg,#e61e4d 0%,#d70466 50%,#bd1e59 100%)',
                opacity: status === 'saving' ? 0.75 : 1,
                cursor: status === 'saving' ? 'default' : 'pointer',
              }}
            >
              {status === 'saving' ? 'Saving…' : 'Submit'}
            </button>
          </form>
        </ModalShell>
      )}

      {/* Phantom-not-installed modal */}
      {noPhantom && (
        <ModalShell onClose={() => setNoPhantom(false)} title="Phantom not detected">
          <p style={{ fontSize: 15, color: '#484848', margin: '0 0 18px' }}>
            To sign in you need the Phantom wallet browser extension. Install it,
            then try signing in again.
          </p>
          <a
            href="https://phantom.app/download"
            target="_blank"
            rel="noreferrer"
            style={{
              display: 'block',
              textAlign: 'center',
              padding: '13px 16px',
              fontSize: 15,
              fontWeight: 600,
              color: '#ffffff',
              borderRadius: 10,
              background:
                'linear-gradient(90deg,#e61e4d 0%,#d70466 50%,#bd1e59 100%)',
            }}
          >
            Get Phantom
          </a>
        </ModalShell>
      )}

      {/* Connection-error toast (non-Phantom errors before the modal opens) */}
      {error && status === 'idle' && (
        <ModalShell onClose={() => setError(null)} title="Sign-in failed">
          <p style={{ fontSize: 15, color: '#484848', margin: 0 }}>{error}</p>
        </ModalShell>
      )}
    </>
  );
}

function ModalShell({
  title,
  onClose,
  children,
}: {
  title: string;
  onClose: () => void;
  children: React.ReactNode;
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [onClose]);

  return (
    <div
      onMouseDown={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0,0,0,0.45)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
        padding: 16,
      }}
    >
      <div
        onMouseDown={(e) => e.stopPropagation()}
        style={{
          width: '100%',
          maxWidth: 420,
          background: '#ffffff',
          borderRadius: 16,
          boxShadow: '0 12px 40px rgba(0,0,0,0.25)',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            position: 'relative',
            padding: '16px 20px',
            borderBottom: '1px solid #ebebeb',
            textAlign: 'center',
          }}
        >
          <button
            type="button"
            aria-label="Close"
            onClick={onClose}
            style={{
              position: 'absolute',
              left: 14,
              top: 12,
              width: 32,
              height: 32,
              borderRadius: '50%',
              border: 'none',
              background: 'transparent',
              fontSize: 18,
              lineHeight: 1,
              color: '#222222',
            }}
          >
            ✕
          </button>
          <h3 style={{ fontSize: 16, fontWeight: 700 }}>{title}</h3>
        </div>
        <div style={{ padding: 24 }}>{children}</div>
      </div>
    </div>
  );
}
