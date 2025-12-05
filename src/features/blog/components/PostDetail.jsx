import React, { useMemo, lazy, Suspense } from 'react';
import FadeInSection from '../../../components/FadeInSection.jsx';
import { useScrollOpacity } from '../../../hooks/useScrollOpacity.jsx';
import { usePostMarkdown } from '../hooks/usePostMarkdown.jsx';
import { useUI } from '../../../context/UIContext.jsx';
import SEO from '../../../components/SEO.jsx';

// Lazy load the heavy markdown engine
const MarkdownRenderer = lazy(() => import('./MarkdownRenderer.jsx'));

export default function PostDetail({ postId, postList }) {
  const mdText = usePostMarkdown(postId);
  const { isFocusMode, setIsFocusMode } = useUI();
  const readingModeOpacity = useScrollOpacity(100);

  // Find the current post for metadata
  const currentPost = useMemo(() => {
      if (!postId || postList.length === 0) return null;
      const numericPostId = parseInt(postId, 10);
      return postList.find(p => p.id === numericPostId);
  }, [postId, postList]);

  const toggleFocusMode = () => {
    setIsFocusMode(!isFocusMode);
  };
 
  return (
    <>
      {/* SEO Management */}
      <SEO 
        title={currentPost?.title}
        description={currentPost?.description}
        type="article"
      />

      <article
        className={`
          flex flex-col relative justify-center items-center transition-all duration-500
          ${isFocusMode ? 'w-full max-w-4xl' : 'w-full max-w-[800px]'}
        `}
      >
        <div className="w-full flex justify-end mb-2">
           <button
              onClick={toggleFocusMode}
              className={`text-xs font-bold uppercase tracking-widest text-blue-500 hover:text-white transition-colors duration-300 ${
              isFocusMode && 'mt-2'
              }`}
              style={{ opacity: readingModeOpacity }}
              aria-label={isFocusMode ? 'Exit reading mode' : 'Enter reading mode'}
          >
              {isFocusMode ? 'Exit Focus' : 'Focus Mode'}
          </button>
        </div>
   
        <FadeInSection>
          <div className={`
              prose prose-invert prose-lg md:prose-xl max-w-none
              ${!isFocusMode ? 'md:bg-zinc-900/30 md:p-12 md:rounded-2xl' : ''}
              px-4 xs:px-6 pb-20
          `}>
            <Suspense fallback={
              <div className="flex flex-col gap-4 animate-pulse mt-8">
                <div className="h-4 bg-zinc-800 rounded w-3/4"></div>
                <div className="h-4 bg-zinc-800 rounded w-full"></div>
                <div className="h-4 bg-zinc-800 rounded w-5/6"></div>
                <div className="h-64 bg-zinc-800 rounded w-full mt-4"></div>
              </div>
            }>
               {mdText ? <MarkdownRenderer content={mdText} /> : null}
            </Suspense>
          </div>
        </FadeInSection>
      </article>
    </>
  );
}