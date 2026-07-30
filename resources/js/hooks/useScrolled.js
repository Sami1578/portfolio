import { useEffect, useState } from 'react';

/**
 * True once the page has scrolled past `threshold` px. Used by the navbar
 * to switch from a transparent to a solid background.
 */
export default function useScrolled(threshold = 50) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > threshold);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [threshold]);

  return scrolled;
}
