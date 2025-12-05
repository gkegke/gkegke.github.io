import React, { useRef, useState, useEffect } from 'react';

const WordCloud = React.memo(({ words, selected, maxFontSize = 25, pauseAnimation = false }) => {
  const containerRef = useRef(null);
  const [positions, setPositions] = useState([]);
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false); // Track intersection
  const [isReady, setIsReady] = useState(false); // Track initial delay
  
  const animationFrameRef = useRef(null);
  const lastUpdateTimeRef = useRef(Date.now());

  // 1. Initial Setup with Delay and Intersection Observer
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const containerWidth = container.offsetWidth;
    const containerHeight = container.offsetHeight;

    // Initialize random positions
    const initialPositions = words.map(() => ({
      x: Math.random() * containerWidth,
      y: Math.random() * containerHeight,
      dx: Math.random() - 0.5,
      dy: Math.random() - 0.5,
    }));
    setPositions(initialPositions);

    // Observer to pause animation when off-screen
    const observer = new IntersectionObserver(([entry]) => {
      setIsVisible(entry.isIntersecting);
    }, { threshold: 0.1 });
    
    observer.observe(container);

    // Delay start of animation to prioritize main thread for page load
    const startTimer = setTimeout(() => {
      setIsReady(true);
    }, 1000 + Math.random() * 1000); // Stagger start slightly

    return () => {
      observer.disconnect();
      clearTimeout(startTimer);
      cancelAnimationFrame(animationFrameRef.current);
    };
  }, [words]);

  // 2. Animation Loop Logic
  const updatePositions = () => {
    const now = Date.now();
    const elapsed = now - lastUpdateTimeRef.current;

    // Only update if: Not hovered, Not paused by parent, Component is In View, and Delay passed
    if (!isHovered && !pauseAnimation && isVisible && isReady && elapsed >= 16) { // ~60fps cap
      setPositions((prevPositions) =>
        prevPositions.map(({ x, y, dx, dy }) => {
          let newX = x + dx;
          let newY = y + dy;
          // Simple bounds check (bounce effect)
          if (newX < 0 || newX > containerRef.current.offsetWidth) dx = -dx;
          if (newY < 0 || newY > containerRef.current.offsetHeight) dy = -dy;
          return { x: newX, y: newY, dx, dy };
        })
      );
      lastUpdateTimeRef.current = now;
    }
    animationFrameRef.current = requestAnimationFrame(updatePositions);
  };

  // 3. Manage Animation Loop
  useEffect(() => {
    if (isVisible && isReady) {
      animationFrameRef.current = requestAnimationFrame(updatePositions);
    } else {
      cancelAnimationFrame(animationFrameRef.current);
    }

    return () => cancelAnimationFrame(animationFrameRef.current);
  }, [isVisible, isReady, isHovered, pauseAnimation]);

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  const listItemStyle = (index) => {
    const { x, y } = positions[index] || { x: 0, y: 0 };
    const minSize = 10;
    const maxSize = maxFontSize;
    const sizeRange = maxSize - minSize;
    const sizes = words.map(({ weight }) => parseFloat(weight));
    const sizeRatio = (sizes[index] - Math.min(...sizes)) / (Math.max(...sizes) - Math.min(...sizes));
    const fontSize = Math.round(minSize + sizeRatio * sizeRange);
    return {
      fontFamily: 'Arial',
      fontSize: `${fontSize}px`,
      position: 'absolute',
      top: `${y}px`,
      left: `${x}px`,
      willChange: 'top, left', // Hint to browser for optimization
    };
  };

  return (
    <div className="relative w-full h-full text-gray-300 overflow-hidden" ref={containerRef}>
      {words.map(({ text }, index) => (
        <div
          key={index}
          className={`
            select-none cursor-default transition-colors duration-300
            ${selected ?
              isHovered && 'text-black' :
              isHovered && 'text-white'
          }`}
          style={listItemStyle(index)}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {text}
        </div>
      ))}
    </div>
  );
});

export default WordCloud;