import { useEffect, useRef, useState } from 'react';

export function useInView(options = 0.25) {
  const ref = useRef(null);
  const [isInView, setIsInView] = useState(() => {
    if (typeof window === 'undefined') return false;
    return !('IntersectionObserver' in window);
  });

  const threshold = typeof options === 'number'
    ? options
    : (typeof options?.threshold === 'number' ? options.threshold : 0.25);

  const rootMargin = typeof options === 'object' && options?.rootMargin ? options.rootMargin : '0px';

  useEffect(() => {
    const node = ref.current;
    if (!node || !('IntersectionObserver' in window)) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
    };
  }, [threshold, rootMargin]);

  return [ref, isInView];
}

