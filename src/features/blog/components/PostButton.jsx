import { useMemo } from 'react';
import WordCloud from './Wordcloud';
import { useMediaQuery } from '../../../hooks/useMediaQuery';
import MouseOverPopover from '../../../components/MouseOverPopover';
import LazyRender from '../../../components/LazyRender';

export default function PostButton({ post, selected, onSelect }) {
  const handleClick = () => {
    onSelect(post.id);
  };

  // Fix: Detect touch/mobile to disable popovers
  const isTouchDevice = useMediaQuery('(hover: none) and (pointer: coarse)');
  const isSmallScreen = useMediaQuery('(max-width: 768px)');
  const shouldDisablePopover = isTouchDevice || isSmallScreen;

  const memoizedWords = useMemo(() => post.keywords?.slice(0, 10) || [], [post.keywords]);

  const popoverContent = (
    <p className="text-gray-200 text-sm leading-relaxed">{post.description}</p>
  );

  const popoverTitle = (
    <p className="max-w-[200px] text-wrap font-bold text-white mb-1">{post.title}</p>
  );

  const ButtonComponent = (
    <button
      id={`post-button-${post.id}`}
      onClick={handleClick}
      className={`
        relative overflow-hidden rounded-xl flex-shrink-0 transition-all duration-300 ease-out
        h-[200px] xs:h-[350px] w-[225px] max-w-[85vw]
        border border-white/5 group/button
        ${selected 
          ? 'bg-zinc-100 shadow-[0_0_30px_rgba(255,255,255,0.15)] scale-[1.02] border-white/20' 
          : 'bg-zinc-900/40 hover:bg-zinc-900/60 hover:border-white/10 hover:shadow-xl'
        }
      `}
    >
      <div className={`absolute inset-0 z-0`}>
        <LazyRender rootMargin="200px">
           <WordCloud 
              words={memoizedWords} 
              selected={selected} 
              maxFontSize={25} 
              baseColor={selected ? "#000" : "#fff"}
           />
        </LazyRender>
      </div>

      <div className={`
        absolute inset-0 z-10 flex flex-col justify-end p-4 text-left
        bg-card-fade
      `}>
        <div className={`
           transform transition-transform duration-300 origin-left
        `}>
          <div className={`text-xs font-mono tracking-widest uppercase mb-2 ${selected ? 'text-gray-100' : 'text-blue-400'}`}>
            {post.date}
          </div>
          <h3 className={`
            font-bold leading-tight text-lg line-clamp-3
            ${selected ? 'text-white' : 'text-white drop-shadow-md'}
          `}>
            {post.title}
          </h3>
          
          <div className={`
            h-1 rounded-full mt-3 transition-all duration-500
            ${selected ? 'bg-blue-500' : 'w-12 group-hover/button:w-full bg-white/50 group-hover/button:bg-blue-500'}
          `} />
        </div>
      </div>
    </button>
  );

  // Responsive Fix: Return raw button on mobile, wrapped popover on desktop
  if (shouldDisablePopover) {
    return ButtonComponent;
  }

  return (
    <MouseOverPopover
      content={popoverContent}
      title={popoverTitle}
    >
      {ButtonComponent}
    </MouseOverPopover>
  );
}