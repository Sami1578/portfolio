import React from 'react';

export default function StatusDot({ active = true }) {
  return (
    <span className="relative flex h-2 w-2">
      {active && (
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-status opacity-60" />
      )}
      <span className={`relative inline-flex h-2 w-2 rounded-full ${active ? 'bg-status' : 'bg-text-muted'}`} />
    </span>
  );
}