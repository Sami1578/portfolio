import React from 'react';

/**
 * The site's signature motif: four corner brackets, like a viewfinder or
 * a blueprint annotation. Applied to the hero panel, stat cards, skill
 * cards, project cards, and the contact panel, in place of glassmorphism
 * or gradient borders. Deliberately bold enough to register at a glance —
 * a 1px hairline here reads as "missing border", not "restrained".
 */
export default function BracketFrame({ children, className = '', size = 18 }) {
  const corner = 'absolute border-accent pointer-events-none';
  const s = `${size}px`;

  return (
    <div className={`relative ${className}`}>
      <span className={`${corner} -top-[2px] -left-[2px] border-t-2 border-l-2`} style={{ width: s, height: s }} />
      <span className={`${corner} -top-[2px] -right-[2px] border-t-2 border-r-2`} style={{ width: s, height: s }} />
      <span className={`${corner} -bottom-[2px] -left-[2px] border-b-2 border-l-2`} style={{ width: s, height: s }} />
      <span className={`${corner} -bottom-[2px] -right-[2px] border-b-2 border-r-2`} style={{ width: s, height: s }} />
      {children}
    </div>
  );
}
