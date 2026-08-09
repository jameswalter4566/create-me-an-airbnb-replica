import { useCallback, useEffect, useState } from 'react';
import { getPhantomProvider } from '../lib/phantom';

export type PhantomStatus = 'idle' | 'connecting' | 'signing' | 'connected' | 'error';

export interface PhantomAuth {
  /** Base58 wallet address of the connected account, or null. */
  account: string | null;
  status: PhantomStatus;
  error: string | null;
  /** Whether the Phantom provider is injected in this browser. */
  hasProvider: boolean;
  /** Connect + prove ownership by signing a sign-in message. */
  connect: () => Promise<void>;
  disconnect: () => Promise<void>;
  /** Clear a transient error and return to the resting state. */
  reset: () => void;
}

/**
 * Talks to the injected Phantom (Solana) provider directly. `connect()` must be
 * called from within a user-gesture event handler (e.g. an onClick) so the
 * browser lets Phantom open its approval popup.
 */
export function usePhantom(): PhantomAuth {
  const [account, setAccount] = useState<string | null>(null);
  const [status, setStatus] = useState<PhantomStatus>('idle');
  const [error, setError] = useState<string | null>(null);
  const [hasProvider, setHasProvider] = useState(false);

  // Detect the provider, restore a trusted session and keep state in sync.
  useEffect(() => {
    const provider = getPhantomProvider();
    setHasProvider(Boolean(provider));
    if (!provider) return;

    provider
      .connect({ onlyIfTrusted: true })
      .then(({ publicKey }) => {
        setAccount(publicKey.toString());
        setStatus('connected');
      })
      .catch(() => {
        /* Not previously authorized — the user must sign in manually. */
      });

    const handleAccountChanged = (publicKey: unknown) => {
      if (publicKey && typeof (publicKey as { toString?: unknown }).toString === 'function') {
        setAccount((publicKey as { toString(): string }).toString());
        setStatus('connected');
      } else {
        setAccount(null);
        setStatus('idle');
      }
    };
    const handleDisconnect = () => {
      setAccount(null);
      setStatus('idle');
    };

    provider.on('accountChanged', handleAccountChanged);
    provider.on('disconnect', handleDisconnect);

    return () => {
      provider.removeListener('accountChanged', handleAccountChanged);
      provider.removeListener('disconnect', handleDisconnect);
    };
  }, []);

  const connect = useCallback(async () => {
    setError(null);
    const provider = getPhantomProvider();

    if (!provider) {
      setHasProvider(false);
      setStatus('error');
      setError('Phantom wallet not found. Install the Phantom extension, then try again.');
      return;
    }

    try {
      setStatus('connecting');
      const { publicKey } = await provider.connect();
      const walletAddress = publicKey.toString();
      setAccount(walletAddress);

      // Prove ownership by signing a human-readable, off-chain message.
      setStatus('signing');
      const message =
        `Sign in to Nomadly\n\n` +
        `Wallet: ${walletAddress}\n` +
        `Issued: ${new Date().toISOString()}\n\n` +
        `Signing is free and will not trigger a blockchain transaction.`;
      await provider.signMessage(new TextEncoder().encode(message), 'utf8');

      setStatus('connected');
    } catch (err) {
      const code = (err as { code?: number })?.code;
      setStatus('error');
      if (code === 4001) {
        setError('Request rejected. Approve the connection in Phantom to sign in.');
      } else {
        setError(err instanceof Error ? err.message : 'Could not connect to Phantom.');
      }
    }
  }, []);

  const disconnect = useCallback(async () => {
    const provider = getPhantomProvider();
    try {
      await provider?.disconnect();
    } catch {
      /* ignore */
    }
    setAccount(null);
    setStatus('idle');
    setError(null);
  }, []);

  const reset = useCallback(() => {
    setError(null);
    setStatus((prev) => (prev === 'error' ? (account ? 'connected' : 'idle') : prev));
  }, [account]);

  return { account, status, error, hasProvider, connect, disconnect, reset };
}
