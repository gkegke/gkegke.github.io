import React, { useRef, useState, useEffect } from 'react';

const WordCloud = React.memo(({ words, selected, maxFontSize = 25, pauseAnimation = false }) => {
  const containerRef = useRef(null);
  const [positions, setPositions] = useState([]);
  const [isHovered, setIsHovered] = useState(false);
  const animationFrameRef = useRef(null);
  const lastUpdateTimeRef = useRef(Date.now());

  useEffect(() => {
    const container = containerRef.current;
    const containerWidth = container.offsetWidth;
    const containerHeight = container.offsetHeight;

    const initialPositions = words.map(() => ({
      x: Math.random() * containerWidth,
      y: Math.random() * containerHeight,
      dx: Math.random() - 0.5,
      dy: Math.random() - 0.5,
    }));
    setPositions(initialPositions);

    animationFrameRef.current = requestAnimationFrame(updatePositions);

    return () => {
      cancelAnimationFrame(animationFrameRef.current);
    };
  }, [words]);

  const updatePositions = () => {
    const now = Date.now();
    const elapsed = now - lastUpdateTimeRef.current;

    // Only update positions if not hovered and not paused due to scrolling
    if (!isHovered && !pauseAnimation && elapsed >= 10) {
      setPositions((prevPositions) =>
        prevPositions.map(({ x, y, dx, dy }) => {
          // Update position logic (example)
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

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

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
    };
  };

  return (
    <div className="relative w-full h-full text-gray-300" ref={containerRef}>
      {words.map(({ text }, index) => (
        <div
          key={index}
          className={`
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