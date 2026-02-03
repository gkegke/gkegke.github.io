import { useEffect, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { usePosts } from './usePosts';

export const useBlog = () => {
  const { postId } = useParams();
  const navigate = useNavigate();
  const postList = usePosts();

  // DERIVED STATE:
  // Instead of syncing local state with a useEffect (which causes a render gap),
  // we calculate the active ID immediately.
  const selectedPostId = useMemo(() => {
    if (postList.length === 0) return null;

    // 1. If URL has an ID, try to use it
    if (postId) {
      const parsedId = parseInt(postId, 10);
      if (postList.find(p => p.id === parsedId)) {
        return parsedId;
      }
    }

    // 2. Fallback to newest post
    return postList[0].id;
  }, [postId, postList]);

  // EFFECT: Handle URL synchronization only.
  // If the user lands on /blog (no ID), or an invalid ID, we update the URL.
  // The UI is already showing the correct post thanks to the derived state above.
  useEffect(() => {
    if (postList.length > 0) {
      const currentUrlId = postId ? parseInt(postId, 10) : null;
      
      // If the URL ID doesn't match our determined selectedPostId (e.g. it was null or invalid)
      if (currentUrlId !== selectedPostId) {
        navigate(`/blog/${selectedPostId}`, { replace: !postId }); // Replace history if fixing a default load
      }
    }
  }, [postList, postId, selectedPostId, navigate]);

  const selectPost = (id) => {
    if (selectedPostId !== id) {
      navigate(`/blog/${id}`);
    }
  };

  return { postList, selectedPostId, selectPost };
};