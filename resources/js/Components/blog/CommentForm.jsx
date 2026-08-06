import React from 'react';
import { useForm } from '@inertiajs/react';
import { Send, Loader2 } from 'lucide-react';
import Button from '../ui/Button';

const inputClasses =
  'w-full bg-transparent border-0 border-b border-border py-3 text-text placeholder-text-muted/50 focus:outline-none focus:border-accent transition-colors duration-300';

export default function CommentForm({ postSlug, commenterEmail, parentId = null, compact = false, onCancel, onSuccess }) {
  const { data, setData, post, processing, recentlySuccessful, errors, reset } = useForm({
    author_name: '',
    author_email: commenterEmail ?? '',
    body: '',
    parent_id: parentId,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    post(`/posts/${postSlug}/comments`, {
      preserveScroll: true,
      onSuccess: () => {
        reset('body');
        onSuccess?.();
      },
    });
  };

  return (
    <div>
      {!compact && <h3 className="font-display text-xl font-bold text-text mb-6">Leave a comment</h3>}

      {recentlySuccessful && (
        <div className="mb-6 py-3 border-l-2 border-status pl-4 bg-status/5 text-status text-sm rounded-r">
          Thanks! Your {parentId ? 'reply is' : 'comment is'} awaiting review.
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="block font-mono-ui text-[11px] uppercase tracking-[0.18em] text-text-muted mb-2">
              Name
            </label>
            <input
              type="text"
              value={data.author_name}
              onChange={(e) => setData('author_name', e.target.value)}
              required
              className={inputClasses}
              placeholder="Jane Doe"
            />
            {errors.author_name && <p className="mt-1 text-xs text-accent">{errors.author_name}</p>}
          </div>

          <div>
            <label className="block font-mono-ui text-[11px] uppercase tracking-[0.18em] text-text-muted mb-2">
              Email
            </label>
            <input
              type="email"
              value={data.author_email}
              onChange={(e) => setData('author_email', e.target.value)}
              required
              className={inputClasses}
              placeholder="jane@example.com"
            />
            {errors.author_email && <p className="mt-1 text-xs text-accent">{errors.author_email}</p>}
          </div>
        </div>

        <div>
          <label className="block font-mono-ui text-[11px] uppercase tracking-[0.18em] text-text-muted mb-2">
            {parentId ? 'Reply' : 'Comment'}
          </label>
          <textarea
            rows={compact ? 2 : 3}
            value={data.body}
            onChange={(e) => setData('body', e.target.value)}
            required
            className={`${inputClasses} resize-none`}
            placeholder="Share your thoughts..."
          />
          {errors.body && <p className="mt-1 text-xs text-accent">{errors.body}</p>}
        </div>

        <div className="flex items-center gap-3">
          <Button type="submit" variant="primary" size={compact ? 'sm' : 'md'} disabled={processing}>
            {processing ? (
              <>
                <Loader2 size={16} className="animate-spin" /> Posting...
              </>
            ) : (
              <>
                <Send size={16} /> {parentId ? 'Post reply' : 'Post comment'}
              </>
            )}
          </Button>
          {onCancel && (
            <Button type="button" variant="ghost" size="sm" onClick={onCancel}>
              Cancel
            </Button>
          )}
        </div>
      </form>
    </div>
  );
}
