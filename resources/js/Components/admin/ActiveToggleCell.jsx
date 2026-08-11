import React, { useState } from 'react';
import { router } from '@inertiajs/react';

/**
 * Small inline switch for the admin table row, PATCHes
 * admin.resources.toggle-active directly instead of routing through the
 * full edit form. Kept separate from Components/admin/form/Toggle.jsx
 * since that component is built for label+description form fields, not a
 * bare table cell — this one owns its own optimistic state so the row
 * flips instantly instead of waiting on the round trip.
 */
export default function ActiveToggleCell({ resource, routeName = 'admin.resources.toggle-active' }) {
  const [isActive, setIsActive] = useState(resource.is_active);
  const [pending, setPending] = useState(false);

  const toggle = () => {
    const next = !isActive;
    setIsActive(next);
    setPending(true);

    router.patch(
      route(routeName, resource.id),
      {},
      {
        preserveScroll: true,
        preserveState: true,
        onError: () => setIsActive(!next), // roll back on failure
        onFinish: () => setPending(false),
      }
    );
  };

  return (
    <button
      type="button"
      onClick={toggle}
      disabled={pending}
      aria-pressed={isActive}
      className={[
        'relative inline-flex h-5 w-9 shrink-0 items-center rounded-full transition-colors disabled:opacity-60',
        isActive ? 'bg-accent' : 'bg-border',
      ].join(' ')}
    >
      <span
        className={[
          'inline-block h-3.5 w-3.5 transform rounded-full bg-white transition-transform',
          isActive ? 'translate-x-[18px]' : 'translate-x-1',
        ].join(' ')}
      />
    </button>
  );
}
