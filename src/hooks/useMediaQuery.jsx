import { useState, useEffect } from 'react';

/**
 * A custom hook that tracks the state of a CSS media query.
 * @param {string} query The media query string to watch.
 * @returns {boolean} `true` if the media query matches, otherwise `false`.
 */
export const useMediaQuery = (query) => {
  const [matches, setMatches] = useState(() => {
    // Check initial value on the client side
    if (typeof window !== 'undefined') {
      return window.matchMedia(query).matches;
    }
    return false;
  });

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const mediaQueryList = window.matchMedia(query);
    
    const listener = (event) => {
      setMatches(event.matches);
    };
    
    // Modern browsers use addEventListener
    mediaQueryList.addEventListener('change', listener);

    // Initial check in case the state got stale during SSR or initial load
    setMatches(mediaQueryList.matches);

    // Cleanup function to remove the listener
    return () => {
      mediaQueryList.removeEventListener('change', listener);
    };
  }, [query]);

  return matches;
};