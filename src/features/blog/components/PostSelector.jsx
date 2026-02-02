import { useRef, useState, useEffect, useMemo, useCallback } from 'react';
import FadeInSection from '../../../components/FadeInSection.jsx';
import PostButton from './PostButton.jsx';
import { throttle } from '../../../utils/helpers.js';

export default function PostSelector({ postList, selectedPostId, onSelectPost }) {
  const scrollContainerRef = useRef(null);
  const [sliderValue, setSliderValue] = useState(0);
  
  // Track initial load to prevent unwanted smooth-scroll animations on refresh
  const isFirstRun = useRef(true);

  const filteredPostList = useMemo(() => {
    return postList;
  }, [postList]);

  const handleRangeChange = (e) => {
    const newValue = parseFloat(e.target.value);
    setSliderValue(newValue);
    
    const container = scrollContainerRef.current;
    if (container) {
      const maxScrollLeft = container.scrollWidth - container.clientWidth;
      container.scrollLeft = (newValue / 100) * maxScrollLeft;
    }
  };
  
  const handleScroll = useCallback(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    // Fix: Close any open popovers instantly when scrolling starts
    window.dispatchEvent(new Event('scroll-close-popover'));

    const { scrollLeft, scrollWidth, clientWidth } = container;
    const maxScrollLeft = scrollWidth - clientWidth;
    
    if (maxScrollLeft <= 0) {
      setSliderValue(0);
      return;
    }
    
    const scrollPercentage = (scrollLeft / maxScrollLeft) * 100;
    setSliderValue(scrollPercentage);
  }, []);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      const throttledScrollHandler = throttle(handleScroll, 30);
      container.addEventListener('scroll', throttledScrollHandler);
      handleScroll();
      return () => {
        container.removeEventListener('scroll', throttledScrollHandler);
      };
    }
  }, [handleScroll]);

  // Auto-scroll logic with robust math
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container && filteredPostList.length > 0 && selectedPostId) {
      const selectedButton = container.querySelector(`#post-button-${selectedPostId}`);
      
      if (selectedButton) {
        // USE getBoundingClientRect for Robustness against Transforms
        const containerRect = container.getBoundingClientRect();
        const buttonRect = selectedButton.getBoundingClientRect();

        // Calculate centers relative to the viewport
        const buttonCenter = buttonRect.left + buttonRect.width / 2;
        const containerCenter = containerRect.left + containerRect.width / 2;

        // Calculate the distance to shift (offset)
        const offset = buttonCenter - containerCenter;
        
        // Apply offset to current scroll position
        const targetScrollLeft = container.scrollLeft + offset;

        // Behavior: Instant on first load, Smooth on user clicks
        const behavior = isFirstRun.current ? 'auto' : 'smooth';

        container.scrollTo({
          left: targetScrollLeft,
          behavior: behavior
        });

        // Sync slider immediately if instant scroll (because scroll event might not fire/sync perfectly)
        const maxScrollLeft = container.scrollWidth - container.clientWidth;
        if (behavior === 'auto' && maxScrollLeft > 0) {
             const clampedTarget = Math.max(0, Math.min(targetScrollLeft, maxScrollLeft));
             const exactPercentage = (clampedTarget / maxScrollLeft) * 100;
             setSliderValue(exactPercentage);
        }

        isFirstRun.current = false;
      }
    }
  }, [selectedPostId, filteredPostList]);

  return (
    <div className="w-full flex flex-col items-center justify-start overflow-hidden pl-2 pb-4">
      <div className="w-full flex flex-col items-center justify-start">
        
        {/* Posts Row */}
        <div
          ref={scrollContainerRef}
          className="flex flex-row gap-x-3 xs:gap-x-4 hide-scrollbar overflow-x-auto scroll-smooth w-full px-2 py-4"
        >
          {filteredPostList.map((post, i) => {
            const isSelected = post.id === selectedPostId;
            return (
              <FadeInSection key={`post:${i}`} alwaysVisible={isSelected}>
                <PostButton
                  post={post}
                  selected={isSelected}
                  onSelect={onSelectPost}
                />
              </FadeInSection>
            );
          })}
        </div>
        
        {/* Slider Controls */}
        <div className="w-3/4 lg:w-1/3 flex justify-center items-center mt-2 mb-2 opacity-50 hover:opacity-100 transition-opacity duration-300">
          <input
            type="range"
            min="0"
            max="100"
            value={sliderValue}
            onInput={handleRangeChange}
            className="w-full post-scroll-slider h-1" 
            disabled={postList.length === 0}
            aria-label="Scroll through posts"
          />
        </div>
      </div>
    </div>
  );
}