import React from 'react';
import { router } from '@inertiajs/react';

/**
 * Generalized version of Components/blog/TagFilter.jsx. That component is
 * hardcoded to route('blog.index'), so it can't be reused for the
 * resources pages as-is. This version takes the route name (and any extra
 * query params to preserve, e.g. an active `search` term) as props so the
 * same multi-select toggle behavior works anywhere.
 *
 * Blog's own TagFilter is left untouched to avoid touching a working page;
 * point it at this component whenever you're ready to de-duplicate.
 */
export default function TagFilter({ routeName, tags = [], selectedTags = [], extraParams = {} }) {
  if (!tags.length) return null;

  const isSelected = (tag) => selectedTags.includes(tag);

  const buildParams = (tagsList) => ({
    ...extraParams,
    ...(tagsList.length ? { tags: tagsList } : {}),
  });

  const toggleTag = (tag) => {
    const next = isSelected(tag)
      ? selectedTags.filter((t) => t !== tag)
      : [...selectedTags, tag];

    router.get(route(routeName), buildParams(next), {
      preserveState: true,
      preserveScroll: true,
      replace: true,
    });
  };

  const clearAll = () => {
    router.get(route(routeName), buildParams([]), {
      preserveState: true,
      preserveScroll: true,
      replace: true,
    });
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
