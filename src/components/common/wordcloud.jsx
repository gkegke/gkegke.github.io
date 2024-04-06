
import { useRef, useState, useEffect } from 'react';

const WordCloud = ({ words, maxFontSize = 25 }) => {
  const containerRef = useRef(null);
  const [positions, setPositions] = useState([]);
  const [isHovered, setIsHovered] = useState(false);
  const animationFrameRef = useRef(null);

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
    if (!isHovered) {
      setPositions(prevPositions =>
        prevPositions.map(position => {
          let { x, y, dx, dy } = position;
          x += dx;
          y += dy;

          const containerWidth = containerRef.current.offsetWidth;
          const containerHeight = containerRef.current.offsetHeight;

          if (x < 0 || x > containerWidth) {
            dx *= -1;
          }
          if (y < 0 || y > containerHeight) {
            dy *= -1;
          }

          return { ...position, x, y, dx, dy };
        })
      );

      animationFrameRef.current = requestAnimationFrame(updatePositions);
    }
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const listItemStyle = index => {
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
    <div className="flex justify-center relative w-full h-full" ref={containerRef}>
      {words.map(({ text }, index) =>
        <div
          key={index}
          className={` ${
            isHovered && 'bg-black text-white'
          }`}
          style={listItemStyle(index)}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {text}
        </div>
      )}
    </div>
  );
};

export default WordCloud;