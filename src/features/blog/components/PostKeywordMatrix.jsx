import React, { useMemo, useState } from 'react';
import { Tooltip } from 'antd';
import { useScrollOpacity } from '../../../hooks/useScrollOpacity'

const PostKeywordMatrix = ({ posts, onPostSelect, selectedPostId }) => {
  const [isOpen, setIsOpen] = useState(false);
  const componentOpacity = useScrollOpacity(150);

  // Memoize the calculation of similarity scores and the sorting of posts.
  const { sortedPosts, maxScore } = useMemo(() => {
    // If no post is selected or posts aren't loaded, return an empty state.
    if (!selectedPostId || posts.length === 0) {
      return { sortedPosts: [], maxScore: 0 };
    }

    const selectedPost = posts.find(p => p.id === selectedPostId);
    if (!selectedPost) {
      return { sortedPosts: [], maxScore: 0 };
    }
    
    // Create a Set of keywords from the selected post for efficient lookup.
    const selectedPostKeywords = new Set(selectedPost.keywords?.map(kw => kw.text) || []);
    const maxPossibleScore = selectedPostKeywords.size; // This is our 100% benchmark.

    // Calculate a similarity score for every post based on matching keywords.
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
  
  // Don't render the button if there's nothing to show
  if (sortedPosts.length === 0) {
    return null;
  }

  const handlePostClick = (id) => {
    onPostSelect(id);
    setIsOpen(false); // Close modal after selection
  };

  const buttonStyle = {
    opacity: componentOpacity,
    pointerEvents: componentOpacity < 0.1 ? 'none' : 'auto',
  };

  return (
    <>
      {/* --- Toggle Button --- */}
      <button
        onClick={() => setIsOpen(true)}
        style={buttonStyle}
        className={`
          fixed top-1/2 right-0 -translate-y-1/2 z-40
          bg-blue-600/80 text-white font-bold
          py-4 px-2 rounded-l-lg
          transition-all duration-300
          hover:bg-blue-500 hover:pr-4
        `}
      >
        <span style={{ writingMode: 'vertical-rl' }}>Related</span>
      </button>

      {/* --- Modal --- */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/70 z-50 flex justify-center items-center p-4"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="flex flex-col rounded-lg p-4 w-[350px] max-w-[95vw] max-h-[80vh] border border-gray-700 bg-[rgba(15,15,15,0.9)] backdrop-blur-[5px]"
            onClick={(e) => e.stopPropagation()} // Prevent modal from closing on content click
          >
            <div className="flex-shrink-0 flex justify-between items-center mb-4">
              <h3 className="font-bold text-white text-lg">Related Posts</h3>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-white text-2xl"
                aria-label="Close"
              >
                &times;
              </button>
            </div>
            
            <div className="flex flex-col gap-4 overflow-y-auto hide-scrollbar">
              {sortedPosts.map(post => {
                  const barPercentage = maxScore > 0 ? (post.similarityScore / maxScore) * 100 : 0;
                  const isSelected = post.id === selectedPostId;

                  return (
                      <Tooltip key={post.id} title={`${post.similarityScore} keyword matches`} placement="top">
                        <div
                          onClick={() => handlePostClick(post.id)}
                          className="cursor-pointer"
                        >
                            <div className="relative w-full h-14 bg-gray-800/50 rounded flex items-center overflow-hidden transition-all duration-300">
                                <div 
                                    className={`h-full rounded transition-[width,background-color] duration-500 ease-in-out ${isSelected ? 'bg-blue-200' : 'bg-blue-500'}`}
                                    style={{ width: `${barPercentage}%` }}
                                />
                                <span
                                  className={`text-wrap absolute top-1/2 -translate-y-1/2 left-3 text-white text-sm font-medium [text-shadow:1px_1px_2px_rgba(0,0,0,0.7)] pointer-events-none pr-2`}
                                >
                                    {post.title}
                                </span>
                            </div>
                        </div>
                      </Tooltip>
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