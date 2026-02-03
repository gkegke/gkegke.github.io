import { useState } from 'react';
import { getPosts } from '../services/postService';

export const usePosts = () => {
  // Initialize directly. Since getPosts reads local JSON (and is now cached), 
  // we don't need a useEffect delay. This prevents the "empty flash" on first render.
  const [postList] = useState(() => getPosts());

  return postList;
};