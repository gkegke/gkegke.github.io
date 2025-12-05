import { useState, useEffect } from 'react';
import { FaArrowUp } from '@react-icons/all-files/fa/FaArrowUp';

const SCROLL_THRESHOLD = 1250; 

export default function ScrollToTopButton() {
  const [showButton, setShowButton] = useState(false);

  const handleScroll = () => {
    if (window.scrollY > SCROLL_THRESHOLD) {
      setShowButton(true);
    } else {
      setShowButton(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <button
      onClick={scrollToTop}
      aria-label="Scroll to top"
      // Replaced framer-motion with CSS transforms for better performance
      className={`
        fixed bottom-[90px] right-4 z-40 
        p-3 rounded-full bg-blue-600 shadow-glow-blue text-white 
        hover:bg-blue-500 transition-all duration-300 ease-out
        flex items-center justify-center
        ${showButton 
          ? 'opacity-100 translate-y-0 pointer-events-auto' 
          : 'opacity-0 translate-y-[20px] pointer-events-none'
        }
      `}
    >
      <FaArrowUp className="text-xl" />
    </button>
  );
}