import { useMemo } from 'react';
import { Popover } from 'antd';
import WordCloud from './Wordcloud';
import { useMediaQuery } from '../../../hooks/useMediaQuery';

export default function PostButton({ post, selected, onSelect }) {
  const handleClick = () => {
    onSelect(post.id);
  };

  // Conditionally disable popover on screens smaller than the 'xs' breakpoint (340px)
  const isMobile = useMediaQuery('(max-width: 340px)');

  const memoizedWords = useMemo(() => post.keywords?.slice(0, 10) || [], [post.keywords]);

  const popoverContent = (
    <p className="max-w-[250px] text-white">{post.description}</p>
  );

  const ButtonComponent = (
    <button
      id={`post-button-${post.id}`}
      className={`relative overflow-hidden rounded-b-lg shadow-lg flex-shrink-0
        ${selected ? 'bg-white text-black' : 'opacity-70 text-white'}
        h-[200px] xs:h-[350px] w-[225px] max-w-[85vw]
      `}
      onClick={handleClick}
    >
      <div className="z-10 absolute left-2 bottom-2 px-2 rounded items-center w-full">
        <div className="py-2 text-sm text-left">{post.date}</div>
        <hr className={`w-11/12 ${selected ? 'border-gray-500' : 'border-white'}`} />
        <div className="mt-2 rounded text-base font-bold text-left pr-2">
          {post.title}
        </div>
      </div>
      <WordCloud words={memoizedWords} selected={selected} maxFontSize={25} />
    </button>
  );

  // If on a mobile screen, return the button without the Popover wrapper.
  if (isMobile) {
    return ButtonComponent;
  }

  return (
    <Popover
      content={popoverContent}
      title={<p className="max-w-[200px] text-wrap font-bold text-white">{post.title}</p>}
      placement="bottom"
      trigger="hover"
      width="200"
      mouseEnterDelay={0.5} // Prevents popover from flashing while scrolling
      overlayInnerStyle={{
        backgroundColor: 'rgba(42, 42, 42, 0.9)', // Dark, slightly transparent background
        backdropFilter: 'blur(4px)',
        border: '1px solid #4a4a4a'
      }}
    >
      {ButtonComponent}
    </Popover>
  );
}