import React from 'react';

/**
 * Editorial kicker — a short accent rule followed by a tracked, uppercase
 * label. Replaces the old blueprint "field label" motif.
 */
export default function Eyebrow({ children, className = '' }) {
  return (
    <span className={`inline-flex items-center gap-3 font-mono-ui text-xs tracking-[0.28em] uppercase text-text-muted ${className}`}>
      <span className="h-px w-7 bg-accent" />
      {children}
    </span>
  );
}