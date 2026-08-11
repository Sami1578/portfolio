import React, { useEffect, useRef, useState } from 'react';
import { router } from '@inertiajs/react';
import { Search } from 'lucide-react';

/**
 * Debounced search box that pushes `search` onto the query string for the
 * given route, preserving whatever else is already there (tags, page,
 * etc.) via extraParams. Used on both the admin and public resources list
 * pages; nothing here is resources-specific, so it's a fine candidate to
 * reuse anywhere else you add search later.
 */
export default function SearchInput({
  routeName,
  initialValue = '',
  extraParams = {},
  placeholder = 'Search…',
  className = '',
}) {
  const [value, setValue] = useState(initialValue);
  const isFirstRun = useRef(true);

  useEffect(() => {
    if (isFirstRun.current) {
      isFirstRun.current = false;
      return;
    }

    const handle = setTimeout(() => {
      const params = { ...extraParams };
      if (value.trim()) {
        params.search = value.trim();
      }

      router.get(route(routeName), params, {
        preserveState: true,
        preserveScroll: true,
        replace: true,
      });
    }, 350);

    return () => clearTimeout(handle);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return (
    <div className={['relative', className].join(' ')}>
      <Search size={15} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-md border border-border bg-transparent py-2 pl-9 pr-3 text-sm text-text placeholder:text-text-muted focus:border-accent-soft focus:outline-none"
      />
    </div>
  );
}
