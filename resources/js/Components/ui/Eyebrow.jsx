import React from 'react';

/**
 * Small monospace label used above section headings — part of the
 * "technical dossier" motif (field labels, not decorative numbering).
 */
export default function Eyebrow({ children, className = '' }) {
  return (
    <span className={`inline-flex items-center gap-2 font-mono-ui text-xs tracking-[0.25em] uppercase text-accent ${className}`}>
      <span className="w-1.5 h-1.5 bg-accent" />
      {children}
    </span>
  );
}
