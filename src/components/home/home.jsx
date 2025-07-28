import { useState, useEffect } from 'react';

import TopLeft from './topLeft.jsx';
import Posts from './posts.jsx';
import Post from './post.jsx';
import Projects from './projects.jsx';

export default function Home() {
  const [postList, setPostList] = useState([]);
  const [selectedPostId, setSelectedPostId] = useState(8);
  const [mode, setMode] = useState('blog'); // 'blog' or 'projects'

  const togglePostButton = (postId) => {
    if (selectedPostId !== postId) {
      setSelectedPostId(postId);
      const searchParams = new URLSearchParams(window.location.search);
      searchParams.set('postId', postId);
      window.history.pushState({}, '', `${window.location.pathname}?${searchParams.toString()}`);
    }
  };

  async function initPosts() {
    const resp = await fetch('/posts.json');
    const data = await resp.json();
    setPostList(data.reverse());
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

  // Find min and max postId from postList
  const postIds = postList.map(p => p.id);
  const minPostId = postIds.length ? Math.min(...postIds) : 1;
  const maxPostId = postIds.length ? Math.max(...postIds) : 1;

  return (
    <div
      id="content"
      className={`flex flex-col justify-start items-start w-full scroll`}
      style={{ backgroundColor: "#0f0f0f" }}
    >
      <TopLeft mode={mode} setMode={setMode} />

      {mode === 'blog' ? (
        <>
          <Posts
            postList={postList}
            selectedPostId={selectedPostId}
            togglePostButton={togglePostButton}
          />
          <Post
            postId={selectedPostId}
            minPostId={minPostId}
            maxPostId={maxPostId}
            setSelectedPostId={setSelectedPostId}
          />
        </>
      ) : (
        <Projects />
      )}
    </div>
  );
}