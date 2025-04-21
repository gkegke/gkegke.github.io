import { useState, useEffect } from 'react';

import Posts from './posts.jsx';
import Post from './post.jsx';

export default function Home() {

  const [postList, setPostList] = useState([]);
  const [selectedPostId, setSelectedPostId] = useState(8);

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
      id="content"
      className={`flex flex-col justify-start items-start w-full scroll`}
      style={{backgroundColor: "#0f0f0f"}}
    >

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