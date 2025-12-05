import React, { useRef, useState, useEffect, useCallback } from "react";

// --- Constants ---
const CHAR_THRESHOLDS = [0.005, 0.3, 0.4, 0.5, 1];
const CHARS = ["♪", "、", "ヽ", "｀", " "];
const COLOR_THRESHOLDS = [0.05, 0.15, 0.3, 0.5, 1];
const COLORS = ["#ffffff", "#ffff00", "#088395", "#0080ff", "#e1e1e1"];
const FONT_SIZE = 35;
const CHAR_WIDTH = 10;
const LINE_HEIGHT = 15;
const ANIMATION_INTERVAL = 750; // ms

// --- Helper Function ---
function findIndexByThreshold(thresholds, value) {
  return thresholds.findIndex(threshold => value < threshold);
}

export default function Generator() {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const [context, setContext] = useState(null);
  const animationFrameId = useRef(null);
  const lastUpdateTime = useRef(0);
  const [isIntersecting, setIsIntersecting] = useState(false);

  // --- Canvas Drawing Logic ---
  const generate = useCallback((ctx, width, height) => {
    ctx.clearRect(0, 0, width, height);
    ctx.font = `${FONT_SIZE}px Verdana`;
    
    const charsPerLine = Math.floor(width / CHAR_WIDTH);
    const numLines = Math.ceil(height / LINE_HEIGHT);
    const numChars = charsPerLine * numLines;

    for (let i = 0; i < numChars; i++) {
      const x = Math.random();
      const y = Math.random();
      
      const charIndex = findIndexByThreshold(CHAR_THRESHOLDS, x);
      const colorIndex = findIndexByThreshold(COLOR_THRESHOLDS, y);
      
      const char = CHARS[charIndex];
      const color = COLORS[colorIndex];
      
      const currentX = (i % charsPerLine) * CHAR_WIDTH;
      const currentY = Math.floor(i / charsPerLine) * LINE_HEIGHT;
      
      ctx.fillStyle = color;
      ctx.fillText(char, currentX, currentY);
    }
  }, []);

  // --- Animation Loop ---
  const animate = useCallback((timestamp) => {
    if (context) {
      const elapsed = timestamp - lastUpdateTime.current;
      
      if (elapsed > ANIMATION_INTERVAL) {
        lastUpdateTime.current = timestamp;
        const canvas = canvasRef.current;
        if (canvas) {
          generate(context, canvas.width, canvas.height);
        }
      }
    }
    animationFrameId.current = requestAnimationFrame(animate);
  }, [context, generate]);

  // --- Initialization and Resizing ---
  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    let observer;

    if (canvas && container) {
      const ctx = canvas.getContext("2d");
      
      const resizeObserver = new ResizeObserver(entries => {
        for (let entry of entries) {
          const { width, height } = entry.contentRect;
          canvas.width = width;
          canvas.height = height;
          if (ctx) {
            generate(ctx, width, height);
          }
        }
      });
      
      resizeObserver.observe(container);
      setContext(ctx);

      observer = new IntersectionObserver(
        ([entry]) => {
          setIsIntersecting(entry.isIntersecting);
        },
        { threshold: 0.1 }
      );
      observer.observe(container);

      return () => {
        resizeObserver.disconnect();
        if (observer) observer.disconnect();
      };
    }
  }, [generate]);
  
  // --- Start/Stop Animation ---
  useEffect(() => {
    if (isIntersecting) {
      animationFrameId.current = requestAnimationFrame(animate);
    } else {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    }
    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [isIntersecting, animate]);

  return (
    <div 
      id="generator"
      ref={containerRef}
      className="relative overflow-hidden h-[50px] w-[150px]"
    >
      <canvas ref={canvasRef} className="w-full h-full" /> 
      {/* Replaced Antd Space with simple flex */}
      <div className="absolute bottom-2 left-5 text-white flex gap-2 items-start">
        <div className="text-xl font-bold">__ gkegke</div>
      </div>
    </div>
  );
}