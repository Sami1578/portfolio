import React from 'react';

export default function Container({ children, className = '' }) {
  return (
    <div className={`max-w-6xl mx-auto px-6 sm:px-8 lg:px-10 ${className}`}>
      {children}
    </div>
  );
}