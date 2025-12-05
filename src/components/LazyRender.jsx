import React, { useState, useEffect, useRef } from 'react';

/**
 * LazyRender
 * 
 * Only renders the `children` when the component enters the viewport.
 * Used to defer heavy computations (like Canvas/WordClouds) until necessary.
 * 
 * @param {ReactNode} children - The heavy component to render.
 * @param {string} rootMargin - Intersection observer margin (default: '100px' to load slightly before view).
 * @param {ReactNode} placeholder - What to show before loading (default: null).
 */
export default function LazyRender({ children, rootMargin = '100px', placeholder = null }) {
  const [isIntersecting, setIntersecting] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (isIntersecting) return; // Once loaded, keep it loaded.

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIntersecting(true);
          observer.disconnect();
        }
      },
      { rootMargin }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [isIntersecting, rootMargin]);

  return (
    <div ref={ref} className="w-full h-full">
      {isIntersecting ? children : placeholder}
    </div>
  );
}