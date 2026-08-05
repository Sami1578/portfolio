import { forwardRef } from 'react';

const TextInput = forwardRef(function TextInput(
  { type = 'text', className = '', invalid = false, ...props },
  ref
) {
  return (
    <input
      ref={ref}
      type={type}
      className={`w-full rounded-md border bg-bg px-3 py-2 text-sm text-text outline-none transition-colors placeholder:text-text-muted/60 focus:border-accent ${
        invalid ? 'border-accent' : 'border-border'
      } ${className}`}
      {...props}
    />
  );
});

export default TextInput;
