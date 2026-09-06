import React from 'react';

export default function LoadingSkeleton() {
  return (
    <div className="results-container" aria-label="Loading route results">
      <div className="skeleton-card" />
      <div className="skeleton-card" />
      <div className="skeleton-card" />
    </div>
  );
}
