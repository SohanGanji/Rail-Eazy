import React from 'react';

export default function LoadingSkeleton() {
  return (
    <div className="flex flex-col gap-4" aria-label="Searching routes...">
      <div className="h-44 rounded-2xl border border-synth-border shimmer-card" />
      <div className="h-44 rounded-2xl border border-synth-border shimmer-card" />
      <div className="h-44 rounded-2xl border border-synth-border shimmer-card" />
    </div>
  );
}
