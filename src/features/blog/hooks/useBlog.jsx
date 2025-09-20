import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { usePosts } from './usePosts';

export const useBlog = () => {
  const { postId } = useParams();
  const navigate = useNavigate();
  const postList = usePosts();
  const [selectedPostId, setSelectedPostId] = useState(null);

  useEffect(() => {
    if (postList.length > 0) {
      // When no specific post is selected via the URL, default to the newest post.
      const currentPostId = postId ? parseInt(postId, 10) : postList[0]?.id;

      if (currentPostId && postList.find(p => p.id === currentPostId)) {
        setSelectedPostId(currentPostId);
      } else if (postList[0]?.id) {
        // Fallback to the default post if the URL postId is invalid.
        navigate(`/blog/${postList[0].id}`, { replace: true });
      }
    }
  }, [postList, postId, navigate]);

  const selectPost = (id) => {
    if (selectedPostId !== id) {
      setSelectedPostId(id);
      navigate(`/blog/${id}`);
    }
  };

  return { postList, selectedPostId, selectPost };
};