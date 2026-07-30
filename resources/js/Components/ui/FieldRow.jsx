import React from 'react';

/**
 * A "spec sheet" label:value row — e.g. ROLE / Full-Stack Developer.
 * Used anywhere content reads like structured facts rather than prose.
 */
export default function FieldRow({ label, value }) {
  return (
    <div className="flex items-baseline justify-between gap-4 py-3 border-b border-border">
      <span className="font-mono-ui text-xs uppercase tracking-[0.15em] text-text-muted">
        {label}
      </span>
      <span className="text-text text-sm text-right">{value}</span>
    </div>
  );
}
