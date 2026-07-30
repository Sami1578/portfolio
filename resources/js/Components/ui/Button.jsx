import React from 'react';

const base =
  'inline-flex items-center justify-center gap-2 font-semibold tracking-wide transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed';

const sizes = {
  md: 'px-8 py-4 text-sm',
  sm: 'px-5 py-2.5 text-sm',
};

const variants = {
  primary: 'bg-accent text-bg hover:bg-white hover:-translate-y-0.5',
  ghost: 'border-2 border-border-strong text-text hover:border-accent hover:text-accent hover:-translate-y-0.5',
  link: 'text-text-muted hover:text-accent px-0 py-0',
};

/**
 * Renders a <button> or, when `href` is passed, an <a> — same visual API
 * either way so call sites don't need to think about it. Use `size="sm"`
 * instead of overriding padding classes directly (Tailwind utility
 * precedence between two padding classes at the same specificity depends
 * on generation order, not source order in your className string, so
 * mixing two px-* values on one element is fragile).
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
