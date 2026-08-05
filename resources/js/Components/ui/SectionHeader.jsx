import React from 'react';
import Eyebrow from './Eyebrow';

/**
 * Editorial section masthead: a full-width hairline, then an asymmetric
 * split — kicker + large serif heading on the left, supporting description
 * on the right. `index` optionally prints a running section number.
 */
export default function SectionHeader({ eyebrow, heading, description, index, align = 'left' }) {
  const centered = align === 'center';

  return (
    <div className="mb-16">
      <div className="flex items-center gap-4 border-t border-border-strong pt-4">
        {index && (
          <span className="font-mono-ui text-xs tracking-[0.2em] text-text-muted">{index}</span>
        )}
        <Eyebrow>{eyebrow}</Eyebrow>
      </div>

      <div
        className={`mt-8 grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-end ${
          centered ? 'text-center' : ''
        }`}
      >
        <h2 className="font-display text-4xl md:text-5xl lg:text-6xl leading-[1.02] tracking-[-0.01em] text-text text-balance lg:col-span-8">
          {heading}
        </h2>
        {description && (
          <p className="text-text-muted leading-relaxed lg:col-span-4 lg:pb-2">
            {description}
          </p>
        )}
      </div>
    </div>
  );
}
