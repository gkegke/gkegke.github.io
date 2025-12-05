import { useRef, useState, useEffect, useMemo, useCallback } from 'react';
import FadeInSection from '../../../components/FadeInSection.jsx';
import PostButton from './PostButton.jsx';
import { throttle } from '../../../utils/helpers.js';

export default function PostSelector({ postList, selectedPostId, onSelectPost }) {
  const scrollContainerRef = useRef(null);
  const [sliderValue, setSliderValue] = useState(0);

  const filteredPostList = useMemo(() => {
    // Note: The filter input is currently disabled in the UI.
    // This logic is kept for potential future use.
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
      const throttledScrollHandler = throttle(handleScroll, 100);
      container.addEventListener('scroll', throttledScrollHandler);
      handleScroll();
      return () => {
        container.removeEventListener('scroll', throttledScrollHandler);
      };
    }
  }, [handleScroll]);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container && filteredPostList.length > 0 && selectedPostId) {
      const selectedButton = container.querySelector(`#post-button-${selectedPostId}`);
      if (selectedButton) {
        selectedButton.scrollIntoView({ behavior: 'auto', inline: 'center' });
      }
    }
  }, [selectedPostId, filteredPostList]);

  return (
    <div className="w-full flex flex-col items-center justify-start overflow-hidden pl-2">
      <div className="w-full flex flex-col items-center justify-start">
        <div
          ref={scrollContainerRef}
          className="flex flex-row gap-x-4 hide-scrollbar overflow-x-auto scroll-smooth w-full"
          style={{ scrollBehavior: 'smooth' }}
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
        
        <div className="w-3/4 lg:w-1/2 flex justify-center items-center my-4">
          <input
            type="range"
            min="0"
            max="100"
            value={sliderValue}
            onInput={handleRangeChange}
            className="w-full post-scroll-slider"
            disabled={postList.length === 0}
          />
        </div>
      </div>
    </div>
  );
}