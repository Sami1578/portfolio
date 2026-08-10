import React from 'react';
import { router } from '@inertiajs/react';

/**
 * Multi-select tag filter. Clicking a tag toggles it in/out of the active
 * set rather than replacing the selection, so users can combine tags (e.g.
 * "Laravel" + "React" shows posts tagged with either). "All" clears every
 * selection.
 */
export default function TagFilter({ tags = [], selectedTags = [] }) {
  if (!tags.length) return null;

  const isSelected = (tag) => selectedTags.includes(tag);

  const toggleTag = (tag) => {
    const next = isSelected(tag)
      ? selectedTags.filter((t) => t !== tag)
      : [...selectedTags, tag];

    router.get(
      route('blog.index'),
      next.length ? { tags: next } : {},
      { preserveState: true, preserveScroll: true, replace: true }
    );
  };

  const clearAll = () => {
    router.get(route('blog.index'), {}, { preserveState: true, preserveScroll: true, replace: true });
  };

  const pillClass = (isActive) =>
    [
      'rounded-full px-3 py-1 font-mono-ui text-[11px] uppercase tracking-widest transition-colors border cursor-pointer',
      isActive
        ? 'bg-accent-soft border-accent-soft text-accent-deep font-semibold'
        : 'border-border text-text-muted hover:border-accent-soft hover:text-text',
    ].join(' ');

  return (
    <div className="mb-10 flex flex-wrap items-center gap-2">
      <button type="button" onClick={clearAll} className={pillClass(selectedTags.length === 0)}>
        All
      </button>
      {tags.map((tag) => (
        <button
          key={tag}
          type="button"
          onClick={() => toggleTag(tag)}
          aria-pressed={isSelected(tag)}
          className={pillClass(isSelected(tag))}
        >
          {tag}
        </button>
      ))}
      {selectedTags.length > 0 && (
        <button
          type="button"
          onClick={clearAll}
          className="font-mono-ui text-[11px] uppercase tracking-widest text-text-muted underline underline-offset-2 hover:text-text ml-1"
        >
          Clear ({selectedTags.length})
        </button>
      )}
    </div>
  );
}