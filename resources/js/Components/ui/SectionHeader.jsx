import React from 'react';

/**
 * Premium section masthead: small pill/label kicker, bold Manrope heading,
 * supporting description to the right on desktop. `index` is now an
 * optional small numeric badge next to the kicker rather than a hairline
 * rule — kept for backward compatibility with callers that still pass it.
 */
export default function SectionHeader({ eyebrow, heading, description, index, align = 'left' }) {
  const centered = align === 'center';

  return (
    <div className={`mb-14 ${centered ? 'text-center' : ''}`}>
      <div className={`flex items-center gap-3 mb-4 ${centered ? 'justify-center' : ''}`}>
        {index && (
          <span className="font-mono-ui text-[11px] text-accent-deep bg-accent-soft px-2 py-1 rounded-full">
            {index}
          </span>
        )}
        <span className="font-mono-ui text-xs font-semibold uppercase tracking-[0.16em] text-accent-deep">
          {eyebrow}
        </span>
      </div>

      <div className={`grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-end ${centered ? 'text-center' : ''}`}>
        <h2 className="font-display text-4xl md:text-5xl font-extrabold tracking-tight leading-[1.05] text-text text-balance lg:col-span-8">
          {heading}
        </h2>
        {description && (
          <p className={`text-text-muted leading-relaxed lg:col-span-4 ${centered ? '' : 'lg:pb-1'}`}>
            {description}
          </p>
        )}
      </div>
    </div>
  );
}
