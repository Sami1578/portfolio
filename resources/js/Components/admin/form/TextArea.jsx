export default function TextArea({ className = '', invalid = false, rows = 4, ...props }) {
  return (
    <textarea
      rows={rows}
      className={`w-full rounded-md border bg-bg px-3 py-2 text-sm leading-relaxed text-text outline-none transition-colors placeholder:text-text-muted/60 focus:border-accent ${
        invalid ? 'border-accent' : 'border-border'
      } ${className}`}
      {...props}
    />
  );
}
