import React from 'react';

type IconProps = { size?: number; className?: string; style?: React.CSSProperties };

/* ------------------------------ Brand logo ------------------------------ */
export function AirbnbLogo({ height = 32 }: { height?: number }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
      <svg
        viewBox="0 0 24 24"
        height={height}
        width={height}
        aria-hidden
        style={{ display: 'block' }}
      >
        <path
          fill="#ff385c"
          d="M12.001 18.275c-1.353-1.697-2.148-3.184-2.413-4.457-.263-1.027-.16-1.848.291-2.465.477-.71 1.188-1.056 2.121-1.056s1.643.345 2.12 1.063c.446.61.558 1.432.286 2.465-.291 1.298-1.085 2.785-2.412 4.458zm9.601 1.14c-.185 1.246-1.034 2.28-2.2 2.783-2.253.98-4.483-.583-6.392-2.704 3.157-3.951 3.74-7.028 2.385-9.018-.795-1.14-1.933-1.695-3.394-1.695-2.944 0-4.563 2.49-3.927 5.382.37 1.565 1.352 3.343 2.917 5.332-.98 1.085-1.91 1.856-2.732 2.333-.636.344-1.245.558-1.828.609-2.679.399-4.778-2.2-3.825-4.88.132-.345.395-.98.845-1.961l.025-.053c1.464-3.178 3.242-6.79 5.285-10.795l.053-.132.58-1.116c.45-.822.635-1.19 1.351-1.643.346-.21.77-.315 1.246-.315.954 0 1.698.558 2.016 1.007.158.239.345.557.582.953l.558 1.089.08.159c2.041 4.004 3.821 7.608 5.279 10.794l.026.025.533 1.22.318.764c.243.613.294 1.222.213 1.858zm1.22-2.39c-.186-.583-.505-1.271-.9-2.094v-.03c-1.889-4.006-3.642-7.608-5.307-10.844l-.111-.163C15.317 1.461 14.468 0 12.001 0c-2.44 0-3.476 1.695-4.535 3.898l-.081.16c-1.669 3.236-3.421 6.843-5.303 10.847v.053l-.559 1.22c-.21.504-.317.768-.345.847C-.172 20.74 2.611 24 5.98 24c.027 0 .132 0 .265-.027h.372c1.75-.213 3.554-1.325 5.384-3.317 1.829 1.989 3.635 3.104 5.382 3.317h.372c.133.027.239.027.265.027 3.37.003 6.152-3.261 4.802-6.975z"
        />
      </svg>
      <span
        style={{
          color: '#ff385c',
          fontSize: height * 0.72,
          fontWeight: 700,
          letterSpacing: '-0.02em',
        }}
      >
        airbnb
      </span>
    </div>
  );
}

/* -------------------------- Nav category icons -------------------------- */
export function GlobeStandIcon({ size = 26 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" aria-hidden>
      <circle cx="16" cy="13" r="9.4" fill="#e9f1f5" stroke="#5a7a86" strokeWidth="1.2" />
      <path
        d="M16 3.6c-3 2.4-3 16.4 0 18.8M16 3.6c3 2.4 3 16.4 0 18.8M6.9 10.5h18.2M6.9 15.6h18.2"
        fill="none"
        stroke="#5a7a86"
        strokeWidth="1.1"
      />
      <path d="M13 24h6l-1 3.4h-4z" fill="#c98a52" />
      <rect x="10.5" y="27.2" width="11" height="1.9" rx="0.95" fill="#8a5a33" />
    </svg>
  );
}

export function HomeIcon({ size = 26 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" aria-hidden>
      <path d="M5 15.5 16 6l11 9.5V28a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1z" fill="#dfe7ea" />
      <path d="M3.5 16.2 16 5.4l12.5 10.8" fill="none" stroke="#c1352f" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M6 15v13.5h20V15" fill="none" stroke="#7c8a90" strokeWidth="1.3" strokeLinejoin="round" />
      <rect x="13.4" y="20" width="5.2" height="8.5" rx="0.6" fill="#b6c3c8" stroke="#7c8a90" strokeWidth="1" />
    </svg>
  );
}

export function BalloonIcon({ size = 26 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" aria-hidden>
      <path d="M16 3c5 0 8.7 3.7 8.7 8.7 0 4-2.7 7.6-5.6 10.1-1 .9-1.9 1.5-3.1 1.5s-2.1-.6-3.1-1.5C10 19.3 7.3 15.7 7.3 11.7 7.3 6.7 11 3 16 3z" fill="#ff5a5f" />
      <path d="M16 3c2 1.6 3.2 5 3.2 8.7 0 3.9-1.2 7.9-3.2 10.6-2-2.7-3.2-6.7-3.2-10.6C12.8 8 14 4.6 16 3z" fill="#e23744" />
      <rect x="14.4" y="23.2" width="3.2" height="2.6" rx="0.5" fill="#c98a52" />
      <path d="M14.6 22.4 15.4 26M17.4 22.4 16.6 26" stroke="#7c8a90" strokeWidth="0.7" />
      <rect x="14" y="25.6" width="4" height="3.4" rx="0.8" fill="#8a5a33" />
    </svg>
  );
}

export function ServiceIcon({ size = 26 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" aria-hidden>
      <path d="M5 21c0-6 4.9-10.5 11-10.5S27 15 27 21z" fill="#c8ced1" stroke="#7c8a90" strokeWidth="1.2" strokeLinejoin="round" />
      <circle cx="16" cy="8.6" r="1.9" fill="#7c8a90" />
      <rect x="4" y="21" width="24" height="2.6" rx="1.3" fill="#9aa4a8" />
    </svg>
  );
}

/* ------------------------------ UI icons ------------------------------- */
export function SearchIcon({ size = 16, style }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" style={style} aria-hidden>
      <circle cx="11" cy="11" r="7" />
      <path d="M20 20l-3.6-3.6" />
    </svg>
  );
}

export function HeartIcon({ size = 24, filled = false }: IconProps & { filled?: boolean }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" aria-hidden style={{ display: 'block' }}>
      <path
        d="M16 28c7.5-6 12-10.4 12-15.3C28 8.5 25.2 6 21.7 6c-2.3 0-4.3 1.2-5.7 3.2C14.6 7.2 12.6 6 10.3 6 6.8 6 4 8.5 4 12.7 4 17.6 8.5 22 16 28z"
        fill={filled ? '#ff385c' : 'rgba(0,0,0,0.5)'}
        stroke="#ffffff"
        strokeWidth="2"
      />
    </svg>
  );
}

export function StarIcon({ size = 12, style }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" style={style} aria-hidden>
      <path d="M12 1.5l3.09 6.26 6.91 1-5 4.87 1.18 6.87L12 17.27l-6.18 3.25L7 13.63l-5-4.87 6.91-1z" />
    </svg>
  );
}

export function ChevronLeft({ size = 16, style }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" style={style} aria-hidden>
      <path d="M15 5l-7 7 7 7" />
    </svg>
  );
}

export function ChevronRight({ size = 16, style }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" style={style} aria-hidden>
      <path d="M9 5l7 7-7 7" />
    </svg>
  );
}

export function ArrowRight({ size = 16, style }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" style={style} aria-hidden>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

export function MenuIcon({ size = 16, style }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" style={style} aria-hidden>
      <path d="M3 6h18M3 12h18M3 18h18" />
    </svg>
  );
}

export function UserIcon({ size = 30, style }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="#717171" style={style} aria-hidden>
      <path d="M16 16a5 5 0 1 0 0-10 5 5 0 0 0 0 10zM16 18c-4.4 0-8 2.9-8 6.5V26h16v-1.5c0-3.6-3.6-6.5-8-6.5z" />
    </svg>
  );
}
