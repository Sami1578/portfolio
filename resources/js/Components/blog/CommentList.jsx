import React, { useState } from 'react';
import { MessageCircle, Reply } from 'lucide-react';
import CommentForm from './CommentForm';

function CommentItem({ comment, postSlug, commenterEmail, isReply = false }) {
  const [replying, setReplying] = useState(false);

  return (
    <li className={isReply ? 'mt-5 border-t border-border pt-5' : 'border-b border-border pb-6'}>
      <div className="flex items-center justify-between mb-2">
        <span className="font-medium text-text">{comment.author_name}</span>
        <span className="font-mono-ui text-[11px] uppercase tracking-widest text-text-muted">
          {new Date(comment.created_at).toLocaleDateString(undefined, {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
          })}
        </span>
      </div>
      <p className="text-sm text-text-muted leading-relaxed whitespace-pre-wrap">{comment.body}</p>

      {!isReply && (
        <button
          type="button"
          onClick={() => setReplying((v) => !v)}
          className="mt-3 inline-flex items-center gap-1.5 font-mono-ui text-[11px] uppercase tracking-widest text-accent hover:text-accent-deep transition-colors"
        >
          <Reply size={13} /> {replying ? 'Cancel' : 'Reply'}
        </button>
      )}

      {replying && (
        <div className="mt-4 pl-4 border-l-2 border-accent/30">
          <CommentForm
            postSlug={postSlug}
            commenterEmail={commenterEmail}
            parentId={comment.id}
            compact
            onCancel={() => setReplying(false)}
            onSuccess={() => setReplying(false)}
          />
        </div>
      )}

      {comment.approved_replies?.length > 0 && (
        <ul className="pl-6">
          {comment.approved_replies.map((reply) => (
            <CommentItem key={reply.id} comment={reply} postSlug={postSlug} commenterEmail={commenterEmail} isReply />
          ))}
        </ul>
      )}
    </li>
  );
}

export default function CommentList({ comments = [], postSlug, commenterEmail }) {
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
            <CommentItem key={comment.id} comment={comment} postSlug={postSlug} commenterEmail={commenterEmail} />
          ))}
        </ul>
      )}
    </div>
  );
}

