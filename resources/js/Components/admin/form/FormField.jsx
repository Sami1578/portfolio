export default function FormField({ label, htmlFor, error, hint, required, children }) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label
          htmlFor={htmlFor}
          className="font-mono-ui text-xs uppercase tracking-[0.14em] text-text-muted"
        >
          {label} {required && <span className="text-accent">*</span>}
        </label>
      )}
      {children}
      {hint && !error && <p className="text-xs text-text-muted">{hint}</p>}
      {error && <p className="text-xs text-accent">{error}</p>}
    </div>
  );
}
