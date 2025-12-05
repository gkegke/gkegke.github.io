import { useState, useEffect } from 'react';

/**
 * Hook that returns the scroll direction and visibility status for a sticky header.
 * Returns 'true' (visible) if scrolling up or at the top.
 * Returns 'false' (hidden) if scrolling down past a threshold.
 */
export default function useScrollDirection() {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const threshold = 10; // Minimum scroll amount to trigger change

    const updateScrollDirection = () => {
      const scrollY = window.scrollY;

      // Always show at the very top to avoid getting stuck
      if (scrollY < 50) {
        setIsVisible(true);
        setLastScrollY(scrollY);
        return;
      }

      // Check if scroll difference is significant enough to trigger animation
      if (Math.abs(scrollY - lastScrollY) < threshold) {
        return;
      }

      // Determine direction: true if scrolling up, false if scrolling down
      const isScrollingUp = scrollY < lastScrollY;
      setIsVisible(isScrollingUp);
      setLastScrollY(scrollY > 0 ? scrollY : 0);
    };

    const onScroll = () => {
      window.requestAnimationFrame(updateScrollDirection);
    };

    window.addEventListener('scroll', onScroll);

    return () => window.removeEventListener('scroll', onScroll);
  }, [lastScrollY]);

  return isVisible;
}