import { useState, useEffect } from 'react';

import Posts from './posts.jsx';
import Post from './post.jsx';

export default function Home() {

  const [postList, setPostList] = useState([]);
  const [selectedPostId, setSelectedPostId] = useState(1);

const togglePostButton = (postId) => {
    if (selectedPostId !== postId) {
      setSelectedPostId(postId);
      const searchParams = new URLSearchParams(window.location.search);
      searchParams.set('postId', postId);
      window.history.pushState({}, '', `${window.location.pathname}?${searchParams.toString()}`);
    }
  }

  async function initPosts() {
    const resp = await fetch('/posts.json');
    const data = await resp.json();
    setPostList(data);
    //console.log("gotton posts", data);
  }

  useEffect(() => {
    if (postList.length === 0) {
      initPosts();
    }

  }, [location.search, postList]);

  useEffect(() => {
    const postId = new URLSearchParams(window.location.search).get('postId');
    if (postId) {
      setSelectedPostId(parseInt(postId));
    }
  }, []);


  return (
    <div className={`flex flex-col overflow-hidden bg-black`}>

  <Posts
    postList={postList}
    selectedPostId={selectedPostId}
    togglePostButton={togglePostButton}
  />

  <Post
    postId={selectedPostId}
  />

    </div>
  );
}