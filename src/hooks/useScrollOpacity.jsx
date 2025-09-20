import { useState, useEffect } from 'react';

export const useScrollOpacity = (maxScroll = 100) => {
  const [opacity, setOpacity] = useState(1);

  const handleScroll = () => {
    const scrollY = window.scrollY;
    const newOpacity = Math.max(0, 1 - scrollY / maxScroll);
    setOpacity(newOpacity);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [maxScroll]);

  return opacity;
};