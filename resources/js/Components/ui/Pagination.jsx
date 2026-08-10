import React from 'react';
import { Link } from '@inertiajs/react';

/**
 * Renders Laravel's default paginator `links` array (from
 * LengthAwarePaginator::toArray()), which looks like:
 *   [{ url: string|null, label: string, active: boolean }, ...]
 * The first and last entries are always the "Previous"/"Next" labels
 * (as HTML entities like &laquo;), so we render those with dangerouslySetInnerHTML.
 *
 * Usage: <Pagination links={posts.links} />
 * Works for both the public blog and the admin dashboard since both use
 * Eloquent's default paginate() shape.
 */
export default function Pagination({ links = [], className = '' }) {
  // Nothing to paginate (only prev/next placeholders, no page numbers) or no links at all.
  if (!links || links.length <= 3) return null;

  return (
    <nav
      aria-label="Pagination"
      className={`mt-12 flex flex-wrap items-center justify-center gap-1.5 ${className}`}
    >
      {links.map((link, idx) => {
        const isTextArrow = idx === 0 || idx === links.length - 1;

        if (!link.url) {
          return (
            <span
              key={idx}
              className="rounded-lg px-3 py-1.5 font-mono-ui text-xs text-text-muted/40 cursor-not-allowed select-none"
              dangerouslySetInnerHTML={{ __html: link.label }}
            />
          );
        }

        return (
          <Link
            key={idx}
            href={link.url}
            preserveScroll
            preserveState
            className={[
              'rounded-lg px-3 py-1.5 font-mono-ui text-xs transition-colors',
              link.active
                ? 'bg-accent-soft text-accent-deep font-semibold'
                : 'text-text-muted hover:bg-accent-soft/50 hover:text-text',
              isTextArrow ? 'uppercase tracking-widest' : '',
            ].join(' ')}
            dangerouslySetInnerHTML={{ __html: link.label }}
          />
        );
      })}
    </nav>
  );
}
