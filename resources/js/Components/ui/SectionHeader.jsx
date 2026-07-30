import React from 'react';
import Eyebrow from './Eyebrow';

export default function SectionHeader({ eyebrow, heading, description, align = 'center' }) {
  const alignment = align === 'center' ? 'text-center items-center' : 'text-left items-start';

  return (
    <div className={`flex flex-col ${alignment} mb-16 gap-4`}>
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2 className="font-display text-4xl md:text-5xl font-semibold text-text">
        {heading}
      </h2>
      {description && (
        <p className={`text-text-muted max-w-2xl ${align === 'center' ? 'mx-auto' : ''}`}>
          {description}
        </p>
      )}
    </div>
  );
}
