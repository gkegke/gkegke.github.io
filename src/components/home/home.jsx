import { useState, useEffect } from 'react';

import Posts from './posts.jsx';
import Post from './post.jsx';

export default function Home() {

  const [postList, setPostList] = useState([]);
  const [selectedPostId, setSelectedPostId] = useState(8);
  const [focusedMode, setFocusedMode] = useState(false);

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
    setPostList(data.reverse());
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
    <div
      className={`flex justify-start items-start w-full`}
      style={{backgroundColor: "#0f0f0f"}}
    >

<div className={`ease ${
  focusedMode ? 'opacity-0 w-10' : ''
}`}>
  <Posts
    postList={postList.reverse()}
    selectedPostId={selectedPostId}
    togglePostButton={togglePostButton}
  />
</div>

<div className="">
  <Post
    postId={selectedPostId}
    focusedMode={focusedMode}
    toggleFocusMode={() => setFocusedMode(!focusedMode)}
  />
</div>

    </div>
  );
}