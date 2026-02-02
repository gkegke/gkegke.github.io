import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';

export default function MouseOverPopover({ children, content, title }) {
  const [isVisible, setIsVisible] = useState(false);
  const [coords, setCoords] = useState({ top: 0, left: 0 });
  const triggerRef = useRef(null);
  
  const handleMouseEnter = () => {
    if (triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      const scrollY = window.scrollY;
      
      setCoords({
        top: rect.bottom + scrollY + 10, 
        left: rect.left + rect.width / 2,
      });
      setIsVisible(true);
    }
  };

  const handleMouseLeave = () => {
    setIsVisible(false);
  };

  // Fix: Add listeners to close popover on scroll
  useEffect(() => {
    if (!isVisible) return;

    const closePopover = () => setIsVisible(false);

    window.addEventListener('scroll', closePopover, { passive: true });
    window.addEventListener('scroll-close-popover', closePopover);

    return () => {
      window.removeEventListener('scroll', closePopover);
      window.removeEventListener('scroll-close-popover', closePopover);
    };
  }, [isVisible]);

  return (
    <>
      <div 
        ref={triggerRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="inline-block"
      >
        {children}
      </div>

      {isVisible && createPortal(
        <div 
          className="absolute z-[9999] pointer-events-none transition-opacity duration-200 ease-out"
          style={{ 
            top: coords.top, 
            left: coords.left,
            transform: 'translateX(-50%)' 
          }}
        >
          <div className="
            bg-[#18181b]/95 backdrop-blur-md 
            border border-white/10 shadow-[0_20px_25px_-5px_rgba(0,0,0,0.5)] 
            rounded-xl p-4 w-[250px]
          ">
            {title && (
              <div className="mb-2 border-b border-gray-600 pb-2">
                {title}
              </div>
            )}
            {content}
          </div>
        </div>,
        document.body
      )}
    </>
  );
}