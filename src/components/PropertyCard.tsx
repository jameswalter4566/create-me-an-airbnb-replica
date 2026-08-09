import React, { useState } from 'react';
import type { Listing } from '../data/listings';
import { HeartIcon, StarIcon, ChevronLeft, ChevronRight } from './icons';

export default function PropertyCard({ listing }: { listing: Listing }) {
  const { images, title, subtitle, rating, badge, showFeesNote } = listing;
  const [index, setIndex] = useState(0);
  const [liked, setLiked] = useState(false);
  const [hover, setHover] = useState(false);

  const count = images.length;
  const dots = Math.min(count, 5);

  const go = (dir: number) => (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIndex((i) => Math.min(Math.max(i + dir, 0), count - 1));
  };

  return (
    <a
      href="#"
      onClick={(e) => e.preventDefault()}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{ display: 'block', color: 'inherit' }}
    >
      {/* Image carousel */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          aspectRatio: '20 / 19',
          borderRadius: 12,
          overflow: 'hidden',
          background: '#eee',
        }}
      >
        <div
          style={{
            display: 'flex',
            height: '100%',
            transform: `translateX(-${index * 100}%)`,
            transition: 'transform 0.4s cubic-bezier(0.25, 0.1, 0.25, 1)',
          }}
        >
          {images.map((src, i) => (
            <img
              key={i}
              src={src}
              alt={title}
              draggable={false}
              loading="lazy"
              style={{
                flex: '0 0 100%',
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                display: 'block',
              }}
            />
          ))}
        </div>

        {/* Guest favorite badge */}
        {badge && (
          <span
            style={{
              position: 'absolute',
              top: 12,
              left: 12,
              background: '#ffffff',
              color: '#222222',
              fontSize: 12.5,
              fontWeight: 600,
              padding: '6px 10px',
              borderRadius: 999,
              boxShadow: '0 1px 3px rgba(0,0,0,0.18)',
            }}
          >
            {badge}
          </span>
        )}

        {/* Heart */}
        <button
          type="button"
          aria-label={liked ? 'Remove from wishlist' : 'Save to wishlist'}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setLiked((v) => !v);
          }}
          style={{
            position: 'absolute',
            top: 10,
            right: 10,
            background: 'none',
            border: 'none',
            padding: 2,
            lineHeight: 0,
            transition: 'transform 0.15s ease',
            transform: hover ? 'scale(1.06)' : 'scale(1)',
          }}
        >
          <HeartIcon size={24} filled={liked} />
        </button>

        {/* Chevrons (hover) */}
        {hover && index > 0 && (
          <CarouselButton side="left" onClick={go(-1)} />
        )}
        {hover && index < count - 1 && (
          <CarouselButton side="right" onClick={go(1)} />
        )}

        {/* Dots */}
        <div
          style={{
            position: 'absolute',
            bottom: 10,
            left: 0,
            right: 0,
            display: 'flex',
            justifyContent: 'center',
            gap: 6,
            pointerEvents: 'none',
          }}
        >
          {Array.from({ length: dots }).map((_, i) => {
            const active = i === Math.min(index, dots - 1);
            return (
              <span
                key={i}
                style={{
                  width: active ? 7 : 6,
                  height: active ? 7 : 6,
                  borderRadius: '50%',
                  background: active ? '#ffffff' : 'rgba(255,255,255,0.6)',
                  boxShadow: '0 0 2px rgba(0,0,0,0.25)',
                  transition: 'all 0.2s ease',
                }}
              />
            );
          })}
        </div>
      </div>

      {/* Meta */}
      <div style={{ padding: '10px 2px 4px' }}>
        <div
          style={{
            fontSize: 15,
            fontWeight: 600,
            color: '#222222',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          {title}
        </div>
        <div
          style={{
            fontSize: 13,
            color: '#6a6a6a',
            marginTop: 1,
            lineHeight: 1.35,
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          {subtitle}
          {rating != null && (
            <span style={{ whiteSpace: 'nowrap' }}>
              {' · '}
              <StarIcon
                size={11}
                style={{
                  color: '#222222',
                  display: 'inline-block',
                  verticalAlign: 'middle',
                  marginTop: -2,
                }}
              />{' '}
              {rating.toFixed(rating % 1 === 0 ? 1 : 2)}
            </span>
          )}
        </div>
        {showFeesNote && (
          <div style={{ fontSize: 13, color: '#9b9b9b', marginTop: 1 }}>
            Prices include all fees
          </div>
        )}
      </div>
    </a>
  );
}

function CarouselButton({
  side,
  onClick,
}: {
  side: 'left' | 'right';
  onClick: (e: React.MouseEvent) => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={side === 'left' ? 'Previous photo' : 'Next photo'}
      style={{
        position: 'absolute',
        top: '50%',
        transform: 'translateY(-50%)',
        [side]: 10,
        width: 28,
        height: 28,
        borderRadius: '50%',
        background: 'rgba(255,255,255,0.9)',
        border: '1px solid rgba(0,0,0,0.08)',
        boxShadow: '0 1px 3px rgba(0,0,0,0.25)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#222',
        padding: 0,
      }}
    >
      {side === 'left' ? <ChevronLeft size={12} /> : <ChevronRight size={12} />}
    </button>
  );
}
