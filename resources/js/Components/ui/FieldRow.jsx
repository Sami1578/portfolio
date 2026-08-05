import React from 'react';

/**
 * A "spec sheet" label:value row — e.g. ROLE / Full-Stack Developer.
 * Editorial treatment: tracked uppercase label on the left, serif-adjacent
 * value on the right, separated by a hairline.
 */
export default function FieldRow({ label, value }) {
  return (
    <div className="flex items-baseline justify-between gap-6 py-3.5 border-b border-border">
      <span className="font-mono-ui text-[11px] uppercase tracking-[0.18em] text-text-muted shrink-0">
        {label}
      </span>
      <span className="text-text text-sm text-right">{value}</span>
    </div>
  );
}