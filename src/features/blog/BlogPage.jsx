import PostSelector from './components/PostSelector.jsx';
import PostDetail from './components/PostDetail';
import PostKeywordMatrix from './components/PostKeywordMatrix.jsx';
import ReadingProgress from './components/ReadingProgress.jsx';
import { useBlog } from './hooks/useBlog.jsx';
import { useUI } from '../../context/UIContext.jsx';

export default function BlogPage() {
  const { postList, selectedPostId, selectPost } = useBlog();
  const { isFocusMode } = useUI();

  return (
    <>
      <ReadingProgress />

      <div className={`w-full h-full gap-4 group ${isFocusMode ? 'is-focus' : ''}`}>
        <div className="transition-opacity duration-300 group-[.is-focus]:opacity-0 group-[.is-focus]:h-0 group-[.is-focus]:invisible">
          <PostSelector
            postList={postList}
            selectedPostId={selectedPostId}
            onSelectPost={selectPost}
          />
        </div>

        <div className="flex gap-4 justify-center items-start">
          <PostDetail
            postId={selectedPostId}
          />
          
          <div className="transition-opacity duration-300 group-[.is-focus]:opacity-0 group-[.is-focus]:invisible">
            <PostKeywordMatrix
              posts={postList}
              onPostSelect={selectPost}
              selectedPostId={selectedPostId}
            />
          </div>
        </div>
      </div>
    </>
  );
}