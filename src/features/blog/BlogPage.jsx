import PostSelector from './components/PostSelector.jsx';
import PostDetail from './components/PostDetail';
import PostKeywordMatrix from './components/PostKeywordMatrix.jsx';
import ReadingProgress from './components/ReadingProgress.jsx';
import ScrollToTopButton from './components/ScrollToTopButton.jsx';
import HeroSection from './components/HeroSection.jsx'; 
import { useBlog } from './hooks/useBlog.jsx';
import { useUI } from '../../context/UIContext.jsx';

export default function BlogPage() {
  const { postList, selectedPostId, selectPost } = useBlog();
  const { isFocusMode } = useUI();

  return (
    <>
      <ReadingProgress />

      <div className={`w-full min-h-screen flex flex-col gap-6 group ${isFocusMode ? 'is-focus' : ''}`}>
        
      {!isFocusMode && <HeroSection /> }

        {/* 
           Post Selector Strip 
           Collapses upwards and fades out when Focus Mode is active.
        */}
        <div className="
            relative z-10
            flex flex-col items-center justify-center w-full max-w-[100vw]
            transition-all duration-500 ease-in-out 
            group-[.is-focus]:opacity-0 group-[.is-focus]:h-0 group-[.is-focus]:invisible 
            group-[.is-focus]:-translate-y-10
        ">
          {/* Subtle separator line/gradient */}
          <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-4"></div>

          <div className="w-full max-w-[95vw] xl:max-w-7xl">
            <PostSelector
              postList={postList}
              selectedPostId={selectedPostId}
              onSelectPost={selectPost}
            />
          </div>
        </div>

        {/* Main Reading Area */}
        <div className="flex gap-4 justify-center items-start w-full px-2 relative z-0">
          <PostDetail
            postId={selectedPostId}
            postList={postList}
          />
          
          {/* Sidebar / Matrix */}
          <div className="transition-opacity duration-300 group-[.is-focus]:opacity-0 group-[.is-focus]:invisible">
            <PostKeywordMatrix
              posts={postList}
              onPostSelect={selectPost}
              selectedPostId={selectedPostId}
            />
          </div>
        </div>
      </div>
      
      {!isFocusMode && <ScrollToTopButton />}
    </>
  );
}