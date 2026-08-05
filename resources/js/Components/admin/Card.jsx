export default function Card({ title, description, children, className = '' }) {
  return (
    <section className={`rounded-xl border border-border bg-surface ${className}`}>
      {(title || description) && (
        <header className="border-b border-border px-5 py-4">
          {title && <h2 className="font-display text-lg tracking-tight text-text">{title}</h2>}
          {description && <p className="mt-0.5 text-sm text-text-muted">{description}</p>}
        </header>
      )}
      <div className="p-5">{children}</div>
    </section>
  );
}
