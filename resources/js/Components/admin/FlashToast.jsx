import { useEffect, useState } from 'react';
import { usePage } from '@inertiajs/react';
import { CheckCircle2, AlertCircle, X } from 'lucide-react';

export default function FlashToast() {
  const { flash } = usePage().props;
  const [visible, setVisible] = useState(false);
  const [content, setContent] = useState({ type: 'success', message: '' });

  useEffect(() => {
    const message = flash?.success || flash?.error;
    if (!message) return;

    setContent({ type: flash.success ? 'success' : 'error', message });
    setVisible(true);

    const timer = setTimeout(() => setVisible(false), 4000);
    return () => clearTimeout(timer);
  }, [flash]);

  if (!visible) return null;

  const isSuccess = content.type === 'success';
  const Icon = isSuccess ? CheckCircle2 : AlertCircle;

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed bottom-6 right-6 z-50 flex max-w-sm items-start gap-3 rounded-lg border border-border bg-surface px-4 py-3 shadow-lg"
    >
      <Icon size={18} className={isSuccess ? 'text-status' : 'text-accent'} />
      <p className="flex-1 text-sm text-text">{content.message}</p>
      <button
        onClick={() => setVisible(false)}
        className="text-text-muted transition-colors hover:text-text"
        aria-label="Dismiss notification"
      >
        <X size={16} />
      </button>
    </div>
  );
}
