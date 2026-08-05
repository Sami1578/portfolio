import { Link } from '@inertiajs/react';

const variants = {
  primary: 'bg-accent text-surface hover:opacity-90 border border-transparent',
  secondary: 'bg-transparent text-text border border-border hover:border-border-strong',
  danger: 'bg-transparent text-accent border border-accent/40 hover:bg-accent/10',
};

const sizes = {
  sm: 'px-3 py-1.5 text-xs',
  md: 'px-4 py-2 text-sm',
};

export default function AdminButton({
  as = 'button',
  variant = 'primary',
  size = 'md',
  href,
  className = '',
  children,
  ...props
}) {
  const classes = `inline-flex items-center justify-center gap-1.5 rounded-md font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-50 ${variants[variant]} ${sizes[size]} ${className}`;

  if (as === 'link') {
    return (
      <Link href={href} className={classes} {...props}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}
