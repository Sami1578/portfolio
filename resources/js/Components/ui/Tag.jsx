import React from 'react';

export default function Tag({ children, className = '' }) {
  return (
    <span className={`px-2.5 py-1 border border-border text-xs font-mono-ui text-text-muted ${className}`}>
      {children}
    </span>
  );
}
