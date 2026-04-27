import React from 'react';

export default function Spinner({ size = 6 }) {
  return (
    <div className={`animate-spin rounded-full border-4 border-eco-200 border-t-eco-600 w-${size} h-${size}`} role="status" aria-label="loading">
      <span className="sr-only">Loading...</span>
    </div>
  );
}
