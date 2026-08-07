// resources/js/Components/ui/FlipCard3D.jsx
import React, { useState } from 'react';

/**
 * A tap/click-to-flip 3D card. Unlike cursor-tilt effects, this reads
 * identically on mobile and desktop since it's driven by a click/tap,
 * not hover.
 *
 * `front` sits in normal document flow and defines the card's height.
 * `back` is absolutely positioned to overlay it exactly. (Don't make
 * both absolute — the wrapper then has nothing to size itself against
 * and collapses to 0px height, which clips both faces.)
 *
 * Usage:
 * <FlipCard3D
 *   className="w-full max-w-sm"
 *   front={<div className="p-6">...</div>}
 *   back={<div className="p-6">...</div>}
 * />
 */
export default function FlipCard3D({ front, back, className = '' }) {
  const [flipped, setFlipped] = useState(false);

  const toggle = () => setFlipped((f) => !f);

  return (
    <div
      className={`group/flip relative cursor-pointer select-none ${className}`}
      style={{ perspective: '1200px' }}
      onClick={toggle}
      role="button"
      tabIndex={0}
      aria-pressed={flipped}
      aria-label="Flip card"
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          toggle();
        }
      }}
    >
      <div
        className="relative w-full transition-transform duration-700"
        style={{
          transformStyle: 'preserve-3d',
          transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
          transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        {/* Front — normal flow, defines the card's height */}
        <div
          className="w-full rounded-2xl border border-border bg-surface shadow-xl shadow-black/10 overflow-hidden"
          style={{ backfaceVisibility: 'hidden' }}
        >
          {front}
        </div>

        {/* Back — absolutely overlays the front's box exactly */}
        <div
          className="absolute inset-0 w-full h-full rounded-2xl border border-border bg-surface shadow-xl shadow-black/10 overflow-hidden"
          style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
        >
          {back}
        </div>
      </div>

      <span className="absolute bottom-3 right-3 z-10 font-mono-ui text-[10px] uppercase tracking-[0.12em] text-text-muted/60 group-hover/flip:text-accent transition-colors pointer-events-none">
        {flipped ? '← back' : 'tap to flip →'}
      </span>
    </div>
  );
}