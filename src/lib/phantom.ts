// Minimal Phantom (Solana) provider typing + connect helper.

type PhantomPublicKey = { toString: () => string };

export type PhantomProvider = {
  isPhantom?: boolean;
  publicKey: PhantomPublicKey | null;
  isConnected: boolean;
  connect: (opts?: { onlyIfTrusted?: boolean }) => Promise<{
    publicKey: PhantomPublicKey;
  }>;
  disconnect: () => Promise<void>;
};

declare global {
  interface Window {
    solana?: PhantomProvider;
    phantom?: { solana?: PhantomProvider };
  }
}

export function getPhantomProvider(): PhantomProvider | null {
  if (typeof window === 'undefined') return null;
  const provider = window.phantom?.solana ?? window.solana;
  return provider?.isPhantom ? provider : null;
}

export class PhantomNotFoundError extends Error {
  constructor() {
    super('Phantom wallet was not detected.');
    this.name = 'PhantomNotFoundError';
  }
}

// Prompts Phantom to connect and returns the wallet address (base58 string).
export async function connectPhantom(): Promise<string> {
  const provider = getPhantomProvider();
  if (!provider) throw new PhantomNotFoundError();
  const { publicKey } = await provider.connect();
  return publicKey.toString();
}
