import React from 'react';

export default function Tag({ children, className = '' }) {
  return (
    <span className={`inline-flex items-center font-mono-ui text-[11px] uppercase tracking-[0.12em] text-text-muted border-b border-border pb-0.5 ${className}`}>
      {children}
    </span>
  );
}