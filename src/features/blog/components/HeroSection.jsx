import React, { useRef, useMemo } from 'react';
import FireAnimation from './FireAnimation.jsx';
import styles from './HeroSection.module.scss';
import { useMediaQuery } from '../../../hooks/useMediaQuery.jsx';

export default function HeroSection({ isFocusMode }) {
  const containerRef = useRef(null);
  const isMobile = useMediaQuery('(max-width: 640px)');

  const handleMouseMove = (e) => {
    if (isMobile || !containerRef.current) return;

    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;

    // Calculate normalized coordinates (-1 to 1)
    const x = (clientX / innerWidth - 0.5) * 2;
    const y = (clientY / innerHeight - 0.5) * 2;

    containerRef.current.style.setProperty('--mouse-x', x);
    containerRef.current.style.setProperty('--mouse-y', y);
  };

  const embers = useMemo(() => {
    return Array.from({ length: 20 }).map((_, i) => ({
      id: i,
      // Random start position X (0% to 100% of container width)
      posX: `${Math.random() * 100}%`,
      // Random delay so they don't all start at once
      delay: `${Math.random() * 5}s`,
      // Random duration for variety in speed
      duration: `${3 + Math.random() * 4}s`,
      // Drift direction (-1 to 1)
      drift: Math.random() * 2 - 1
    }));
  }, []);

  return (
    <header
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className={`
        ${styles.heroContainer}
        transition-all duration-700 ease-in-out
        ${isFocusMode 
            ? 'opacity-0 h-0 min-h-0 invisible overflow-hidden' 
            : 'opacity-100 pb-8 pt-16'
        }
      `}
    >
      {/* Feature 2: Breathing Vignette */}
      <div className={styles.vignette} />

      {/* Feature 1: Particle Embers */}
      <div className={styles.emberContainer}>
        {embers.map((ember) => (
          <span
            key={ember.id}
            className={styles.ember}
            style={{
              '--pos-x': ember.posX,
              '--delay': ember.delay,
              '--duration': ember.duration,
              '--drift': ember.drift,
            }}
          />
        ))}
      </div>

      {/* Feature 4: Parallax Wrapper for Fire */}
      <div className={styles.fireWrapper}>
        <FireAnimation />
      </div>

    </header>
  );
}