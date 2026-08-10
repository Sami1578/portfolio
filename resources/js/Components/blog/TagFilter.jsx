import React from 'react';
import { router } from '@inertiajs/react';

/**
 * Renders an "All" pill plus one pill per available tag. Clicking a tag
 * navigates via Inertia with the tag as a query param, letting the backend
 * do the filtering (rather than filtering an already-paginated client-side
 * list, which would break pagination math).
 */
export default function TagFilter({ tags = [], selectedTag = null }) {
  if (!tags.length) return null;

  const goToTag = (tag) => {
    router.get(
      route('blog.index'),
      tag ? { tag } : {},
      { preserveState: true, preserveScroll: true, replace: true }
    );
  };

  const pillClass = (isActive) =>
    [
      'rounded-full px-3 py-1 font-mono-ui text-[11px] uppercase tracking-widest transition-colors border',
      isActive
        ? 'bg-accent-soft border-accent-soft text-accent-deep font-semibold'
        : 'border-border text-text-muted hover:border-accent-soft hover:text-text',
    ].join(' ');

  return (
    <div className="mb-10 flex flex-wrap gap-2">
      <button type="button" onClick={() => goToTag(null)} className={pillClass(!selectedTag)}>
        All
      </button>
      {tags.map((tag) => (
        <button key={tag} type="button" onClick={() => goToTag(tag)} className={pillClass(selectedTag === tag)}>
          {tag}
        </button>
      ))}
    </div>
  );
}
