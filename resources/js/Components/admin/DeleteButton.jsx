import { router } from '@inertiajs/react';
import { Trash2 } from 'lucide-react';

/**
 * Confirms, then sends a DELETE request to the given route.
 */
export default function DeleteButton({ href, label = 'Delete', confirmMessage = 'Are you sure you want to delete this? This cannot be undone.', iconOnly = false }) {
  const handleDelete = () => {
    if (window.confirm(confirmMessage)) {
      router.delete(href, { preserveScroll: true });
    }
  };

  if (iconOnly) {
    return (
      <button
        type="button"
        onClick={handleDelete}
        className="rounded-md p-1.5 text-text-muted transition-colors hover:bg-accent/10 hover:text-accent"
        aria-label={label}
      >
        <Trash2 size={16} />
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={handleDelete}
      className="inline-flex items-center gap-1.5 rounded-md border border-accent/40 px-3 py-1.5 text-xs font-medium text-accent transition-colors hover:bg-accent/10"
    >
      <Trash2 size={14} /> {label}
    </button>
  );
}
