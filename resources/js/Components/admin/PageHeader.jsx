export default function PageHeader({ eyebrow, title, description, actions }) {
  return (
    <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
      <div>
        {eyebrow && (
          <p className="mb-1 font-mono-ui text-xs uppercase tracking-[0.18em] text-text-muted">
            {eyebrow}
          </p>
        )}
        <h1 className="font-display text-2xl tracking-tight text-text sm:text-3xl">{title}</h1>
        {description && <p className="mt-1 max-w-xl text-sm text-text-muted">{description}</p>}
      </div>
      {actions && <div className="flex items-center gap-2">{actions}</div>}
    </div>
  );
}
