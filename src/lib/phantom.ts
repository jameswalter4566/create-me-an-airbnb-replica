// Lightweight typings + helpers for the injected Phantom wallet provider.
// Phantom injects its Solana provider at window.phantom.solana (and, for
// backwards compatibility, window.solana). We talk to it directly so no extra
// wallet-adapter dependency is required.

export interface PhantomPublicKey {
  toString(): string;
  toBytes(): Uint8Array;
}

export interface PhantomProvider {
  isPhantom?: boolean;
  publicKey: PhantomPublicKey | null;
  isConnected: boolean;
  connect(options?: { onlyIfTrusted?: boolean }): Promise<{ publicKey: PhantomPublicKey }>;
  disconnect(): Promise<void>;
  signMessage(
    message: Uint8Array,
    display?: 'utf8' | 'hex'
  ): Promise<{ signature: Uint8Array; publicKey: PhantomPublicKey }>;
  on(event: 'connect' | 'disconnect' | 'accountChanged', handler: (arg: unknown) => void): void;
  removeListener(event: string, handler: (arg: unknown) => void): void;
}

declare global {
  interface Window {
    phantom?: { solana?: PhantomProvider };
    solana?: PhantomProvider;
  }
}

/** Returns the injected Phantom provider, or null when it is not installed. */
export function getPhantomProvider(): PhantomProvider | null {
  if (typeof window === 'undefined') return null;

  const fromNamespace = window.phantom?.solana;
  if (fromNamespace?.isPhantom) return fromNamespace;

  const legacy = window.solana;
  if (legacy?.isPhantom) return legacy;

  return null;
}

export const PHANTOM_DOWNLOAD_URL = 'https://phantom.app/download';

/** Shorten a base58 address to `Abc1…Z9xy` for display. */
export function shortenAddress(address: string, chars = 4): string {
  if (address.length <= chars * 2 + 1) return address;
  return `${address.slice(0, chars)}…${address.slice(-chars)}`;
}
