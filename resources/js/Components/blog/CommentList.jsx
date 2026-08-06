import React from 'react';
import { MessageCircle } from 'lucide-react';

export default function CommentList({ comments = [] }) {
  return (
    <div>
      <h3 className="font-display text-xl font-bold text-text mb-6 flex items-center gap-2">
        <MessageCircle size={20} className="text-accent" />
        {comments.length > 0 ? `${comments.length} Comment${comments.length > 1 ? 's' : ''}` : 'Comments'}
      </h3>

      {comments.length === 0 ? (
        <p className="text-sm text-text-muted">Be the first to comment.</p>
      ) : (
        <ul className="flex flex-col gap-6">
          {comments.map((comment) => (
            <li key={comment.id} className="border-b border-border pb-6">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium text-text">{comment.author_name}</span>
                <span className="font-mono-ui text-[11px] uppercase tracking-[0.1em] text-text-muted">
                  {new Date(comment.created_at).toLocaleDateString(undefined, {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                  })}
                </span>
              </div>
              <p className="text-sm text-text-muted leading-relaxed whitespace-pre-wrap">{comment.body}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
