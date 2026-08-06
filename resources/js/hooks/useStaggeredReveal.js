import { useEffect, useRef, useState } from 'react';

/**
 * Fades + slides multiple child elements in sequence (staggered) once parent
 * enters viewport. Each child reveals with a delay creating a cascade effect.
 * Uses data-stagger-index to determine order. Respects prefers-reduced-motion.
 */
export default function useStaggeredReveal(options = { threshold: 0.15, staggerDelay: 100 }) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setIsVisible(true);
      return;
    }

    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.disconnect();
      }
    }, options);

    observer.observe(node);
    return () => observer.disconnect();
  }, [options]);

  return { ref, isVisible, staggerDelay: options.staggerDelay };
}
