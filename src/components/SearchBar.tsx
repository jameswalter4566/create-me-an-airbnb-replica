import React, { useState } from 'react';
import { SearchIcon } from './icons';

const SEGMENTS = [
  { id: 'where', label: 'Where', placeholder: 'Search destinations', grow: 1.4 },
  { id: 'when', label: 'When', placeholder: 'Add dates', grow: 1 },
  { id: 'who', label: 'Who', placeholder: 'Add guests', grow: 1 },
];

export default function SearchBar() {
  const [hovered, setHovered] = useState<string | null>(null);
  const [btnHover, setBtnHover] = useState(false);

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        width: '100%',
        maxWidth: 640,
        margin: '0 auto',
        height: 66,
        background: '#ffffff',
        border: '1px solid #dddddd',
        borderRadius: 999,
        boxShadow: '0 3px 12px rgba(0,0,0,0.10)',
        padding: 6,
      }}
      onMouseLeave={() => setHovered(null)}
    >
      {SEGMENTS.map((seg, i) => {
        const isHovered = hovered === seg.id;
        const prevHovered = i > 0 && hovered === SEGMENTS[i - 1].id;
        const isLast = i === SEGMENTS.length - 1;
        return (
          <React.Fragment key={seg.id}>
            {i > 0 && (
              <span
                style={{
                  width: 1,
                  height: 32,
                  background:
                    isHovered || prevHovered ? 'transparent' : '#dddddd',
                  flex: '0 0 auto',
                }}
              />
            )}
            <button
              type="button"
              onMouseEnter={() => setHovered(seg.id)}
              onClick={(e) => e.preventDefault()}
              style={{
                flex: `${seg.grow} 1 0`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: 8,
                textAlign: 'left',
                border: 'none',
                background: isHovered ? '#ebebeb' : 'transparent',
                borderRadius: 999,
                padding: '10px 22px',
                height: 54,
                transition: 'background 0.18s ease',
              }}
            >
              <span>
                <span
                  style={{
                    display: 'block',
                    fontSize: 12,
                    fontWeight: 600,
                    color: '#222222',
                  }}
                >
                  {seg.label}
                </span>
                <span
                  style={{
                    display: 'block',
                    fontSize: 14,
                    color: '#6a6a6a',
                    marginTop: 1,
                    whiteSpace: 'nowrap',
                  }}
                >
                  {seg.placeholder}
                </span>
              </span>

              {isLast && (
                <span
                  onMouseEnter={() => setBtnHover(true)}
                  onMouseLeave={() => setBtnHover(false)}
                  style={{
                    flex: '0 0 auto',
                    width: 48,
                    height: 48,
                    borderRadius: '50%',
                    background:
                      'linear-gradient(135deg, #ff385c 0%, #e61e4d 55%, #d70466 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#ffffff',
                    boxShadow: btnHover
                      ? '0 2px 8px rgba(214,4,102,0.45)'
                      : 'none',
                    transform: btnHover ? 'scale(1.04)' : 'scale(1)',
                    transition: 'all 0.15s ease',
                  }}
                >
                  <SearchIcon size={17} />
                </span>
              )}
            </button>
          </React.Fragment>
        );
      })}
    </div>
  );
}
