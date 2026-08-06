import React from 'react';
import { Link } from '@inertiajs/react';
import { Eye } from 'lucide-react';

export default function PostCard({ post }) {
  return (
    <Link
      href={`/posts/${post.slug}`}
      className="group flex flex-col overflow-hidden rounded-xl border border-border bg-surface transition-all duration-300 hover-lift"
    >
      <div className="image-zoom aspect-[16/9] w-full overflow-hidden bg-surface-2">
        {post.featured_image_path ? (
          <img
            src={`/storage/${post.featured_image_path}`}
            alt={post.title}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-text-muted">
            <span className="font-display text-2xl">SA.</span>
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-3 p-6">
        {post.tech_tags?.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {post.tech_tags.slice(0, 3).map((tag, idx) => (
              <span
                key={idx}
                className="rounded-full bg-accent-soft px-2.5 py-0.5 font-mono-ui text-[10px] uppercase tracking-[0.1em] text-accent-deep"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        <h3 className="font-display text-xl font-bold leading-snug text-text transition-colors duration-300 group-hover:text-accent">
          {post.title}
        </h3>

        {post.excerpt && <p className="text-sm leading-relaxed text-text-muted">{post.excerpt}</p>}

        <div className="mt-auto flex items-center justify-between pt-2 font-mono-ui text-[11px] uppercase tracking-[0.1em] text-text-muted">
          <span>
            {post.published_at &&
              new Date(post.published_at).toLocaleDateString(undefined, {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
              })}
          </span>
          <span className="inline-flex items-center gap-1">
            <Eye size={13} /> {post.view_count}
          </span>
        </div>
      </div>
    </Link>
  );
}
