
import React, { useRef, useState, useEffect } from 'react';

const WordCloud = React.memo(({ words, maxFontSize = 25 }) => {
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

    if (!isHovered && elapsed >= 10) {
      setPositions((prevPositions) =>
        prevPositions.map(({ x, y, dx, dy }) => {
          const containerWidth = containerRef.current.offsetWidth;
          const containerHeight = containerRef.current.offsetHeight;

          let newX = x + dx;
          let newY = y + dy;

          if (newX < 0 || newX > containerWidth) dx *= -1;
          if (newY < 0 || newY > containerHeight) dy *= -1;

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
    <div className="relative w-full h-full text-gray-200" ref={containerRef}>
      {words.map(({ text }, index) => (
        <div
          key={index}
          className={`${isHovered && 'bg-white text-black'}`}
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