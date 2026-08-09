import React, { useState } from 'react';
import type { Listing } from '../data/listings';

function StarIcon() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="#222222"
      style={{ display: 'inline-block', verticalAlign: 'middle', marginRight: '4px' }}
      aria-hidden="true"
    >
      <path d="M12 2l2.9 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l7.1-1.01L12 2z" />
    </svg>
  );
}

export default function ListingCard({ listing }: { listing: Listing }) {
  const [fav, setFav] = useState(false);

  return (
    <div className="listing-card">
      <div className="listing-img-wrap">
        <img className="listing-img" src={listing.image} alt={listing.title} loading="lazy" />

        {listing.guestFavorite ? <span className="fav-badge">Guest favorite</span> : null}

        <button
          type="button"
          className="heart-btn"
          aria-label={fav ? 'Remove from wishlist' : 'Save to wishlist'}
          aria-pressed={fav}
          onClick={(e) => {
            e.stopPropagation();
            setFav((v) => !v);
          }}
        >
          <svg width="24" height="24" viewBox="0 0 32 32" aria-hidden="true">
            <path
              d="M16 28c7-4.7 13-10.3 13-16.1C29 7.5 26 4.5 22.5 4.5c-2.6 0-5 1.6-6.5 4-1.5-2.4-3.9-4-6.5-4C6 4.5 3 7.5 3 11.9 3 17.7 9 23.3 16 28z"
              fill={fav ? '#ff385c' : 'rgba(0,0,0,0.5)'}
              stroke="#ffffff"
              strokeWidth="2"
            />
          </svg>
        </button>
      </div>

      <div style={{ marginTop: '10px' }}>
        <div
          style={{
            fontSize: '15px',
            fontWeight: 600,
            color: '#222',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          {listing.title}
        </div>
        <div style={{ fontSize: '15px', color: '#6a6a6a', marginTop: '2px' }}>
          {listing.meta}
          {listing.rating != null ? (
            <>
              {' · '}
              <StarIcon />
              {listing.rating.toFixed(listing.rating % 1 === 0 ? 1 : 2)}
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
}
