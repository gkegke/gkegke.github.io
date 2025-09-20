import { useState, useEffect } from 'react';
import { getPosts } from '../services/postService';

export const usePosts = () => {
  const [postList, setPostList] = useState([]);

  useEffect(() => {
    const posts = getPosts();
    setPostList(posts);
  }, []);

  return postList;
};