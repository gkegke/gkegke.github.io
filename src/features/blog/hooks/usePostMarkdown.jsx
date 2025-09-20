import { useState, useEffect } from 'react';
import { getPostContent } from '../services/postService';

export const usePostMarkdown = (postId) => {
  const [mdText, setMDText] = useState("");

  useEffect(() => {
    if (!postId) {
      setMDText("");
      return;
    }

    async function fetchMarkdown(id) {
      const content = await getPostContent(id);
      setMDText(content);
    }

    fetchMarkdown(postId);
  }, [postId]);

  return mdText;
};