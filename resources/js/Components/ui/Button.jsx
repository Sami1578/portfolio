import React from 'react';

const base =
  'group inline-flex items-center justify-center gap-2 font-semibold text-sm transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl';

const sizes = {
  md: 'px-6 py-3.5',
  sm: 'px-5 py-2.5 text-[13px]',
};

const variants = {
  // Confident dark/accent CTA — the primary action everywhere on the site.
  primary: 'bg-text text-bg hover:bg-accent hover:text-white hover:-translate-y-0.5',
  // Hairline-bordered secondary.
  ghost: 'border border-border-strong text-text bg-surface hover:bg-surface-2 hover:-translate-y-0.5',
  // Inline underlined text link.
  link: 'text-text hover:text-accent px-0 py-0 underline underline-offset-4 decoration-1 decoration-border-strong hover:decoration-accent rounded-none',
};

/**
 * Renders a <button> or, when `href` is passed, an <a> — same visual API
 * either way. Use `size="sm"` instead of overriding padding directly.
 */
export default function Button({ children, variant = 'primary', size = 'md', href, className = '', ...props }) {
  const classes = `${base} ${sizes[size]} ${variants[variant]} ${className}`;

  if (href) {
    return (
      <a href={href} className={classes} {...props}>
        {children}
      </a>
    );
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}
