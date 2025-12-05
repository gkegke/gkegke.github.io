import React, { useMemo, useState } from 'react';
import useScrollDirection from '../../../hooks/useScrollDirection';

const PostKeywordMatrix = ({ posts, onPostSelect, selectedPostId }) => {
  const [isOpen, setIsOpen] = useState(false);
  const isVisible = useScrollDirection();

  const { sortedPosts, maxScore } = useMemo(() => {
    if (!selectedPostId || posts.length === 0) {
      return { sortedPosts: [], maxScore: 0 };
    }

    const selectedPost = posts.find(p => p.id === selectedPostId);
    if (!selectedPost) {
      return { sortedPosts: [], maxScore: 0 };
    }
    
    const selectedPostKeywords = new Set(selectedPost.keywords?.map(kw => kw.text) || []);
    const maxPossibleScore = selectedPostKeywords.size;

    const postsWithScores = posts.map(post => {
        if (post.id === selectedPostId) {
            return { ...post, similarityScore: maxPossibleScore };
        }
        const matchingKeywords = post.keywords?.filter(kw => selectedPostKeywords.has(kw.text)) || [];
        return { ...post, similarityScore: matchingKeywords.length };
      });
      
    postsWithScores.sort((a, b) => b.similarityScore - a.similarityScore);

    return { sortedPosts: postsWithScores, maxScore: maxPossibleScore };

  }, [posts, selectedPostId]);
  
  if (sortedPosts.length === 0) {
    return null;
  }

  const handlePostClick = (id) => {
    onPostSelect(id);
    setIsOpen(false);
  };
  
  return (
    <>
      {/* --- Toggle Button --- */}
      <button
        onClick={() => setIsOpen(true)}
        className={`
          fixed top-2/3 right-0 -translate-y-1/2 z-40
          text-blue-500 font-bold
          py-6 px-1
          transition-all duration-300 ease-in-out
          hover:bg-zinc-700 hover:pr-3 hover:text-white
          ${isVisible ? 'translate-x-0' : 'translate-x-full pointer-events-none'}
        `}
      >
        <span style={{ writingMode: 'vertical-rl' }} className="text-md tracking-widest uppercase">Related</span>
      </button>

      {/* --- Modal --- */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex justify-center items-center p-4 transition-opacity duration-300"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="flex flex-col rounded-2xl w-[400px] max-w-[95vw] max-h-[80vh] border border-white/10 bg-[#121215] shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex-shrink-0 flex justify-between items-center p-6 border-b border-white/5 bg-zinc-900/50">
              <h3 className="font-bold text-white text-lg tracking-tight">Most Similar Post</h3>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-500 hover:text-white transition-colors text-2xl leading-none"
                aria-label="Close"
              >
                &times;
              </button>
            </div>
            
            <div className="flex flex-col gap-3 overflow-y-auto hide-scrollbar p-6">
              {sortedPosts.map(post => {
                  const barPercentage = maxScore > 0 ? (post.similarityScore / maxScore) * 100 : 0;
                  const isSelected = post.id === selectedPostId;

                  return (
                      <div 
                        key={post.id}
                        onClick={() => handlePostClick(post.id)}
                        className="group cursor-pointer"
                      >
                         <div className="flex justify-between items-end mb-1 px-1">
                            <span className={`text-sm truncate pr-4 ${isSelected ? 'text-blue-400 font-bold' : 'text-gray-300 group-hover:text-white'}`}>
                                {post.title}
                            </span>
                            <span className="text-xs text-gray-500 font-mono">{post.similarityScore}</span>
                         </div>
                         
                         {/* Bar Chart Track */}
                         <div className="w-full h-2 bg-zinc-800 rounded-full overflow-hidden">
                             <div 
                                className={`h-full rounded-full transition-all duration-700 ease-out 
                                    ${isSelected 
                                        ? 'bg-gradient-to-r from-blue-400 to-blue-600 shadow-glow-blue' 
                                        : 'bg-zinc-600 group-hover:bg-blue-500'
                                    }`}
                                style={{ width: `${barPercentage}%` }}
                             />
                         </div>
                      </div>
                  );
              })}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PostKeywordMatrix;