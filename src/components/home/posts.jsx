import { useRef, useState, useEffect, useMemo } from 'react';

import { Tooltip } from 'antd';

import {
  GithubOutlined,
} from '@ant-design/icons';

import FadeInSection from '../common/fadeInSection.jsx';
import WordCloud from '../common/wordcloud.jsx';

export default function Posts({ postList, getPost, selectedPostId, togglePostButton }) {
  const containerRef = useRef(null);
  const [filterText, setFilterText] = useState('');

  const filteredPostList = useMemo(() => {
    return postList.filter(
      (post) =>
        post.title.toLowerCase().includes(filterText.toLowerCase()) ||
        post.keywords.some((keyword) =>
          keyword.text.toLowerCase().includes(filterText.toLowerCase())
        )
    );
  }, [postList, filterText]);

  return (
    <div
      ref={containerRef}
      className="relative w-full overflow-hidden"
    >
      <TopLeft />
      <PostListSection
        postList={filteredPostList}
        getPost={getPost}
        selectedPostId={selectedPostId}
        togglePostButton={togglePostButton}
      />
    </div>
  );
}

function TopLeft() {
  return (
    <div
      className="absolute top-4 left-2 text-white justify-start items-start flex flex-col"
      style={{zIndex: 9999}}
    >
      <div className="flex gap-2 items-center">
        <Tooltip title="checkout my github">
          <a href="https://github.com/gkegke" className="hover:bg-blue-500 p-2">
            <GithubOutlined className="text-white text-4xl" />
          </a>
        </Tooltip>
        <div className="text-nowrap text-2xl font-bold">
          __ gkegke
          <div className="text-sm text-wrap">just some random thoughts</div>
        </div>
      </div>
    </div>
  );
}

function PostListSection({ postList, getPost, selectedPostId, togglePostButton }) {
  const scrollContainerRef = useRef(null);
  const [filterText, setFilterText] = useState('');

  const filteredPostList = useMemo(() => {
    return postList.filter(
      (post) =>
        post.title.toLowerCase().includes(filterText.toLowerCase()) ||
        post.keywords.some((keyword) =>
          keyword.text.toLowerCase().includes(filterText.toLowerCase())
        )
    );
  }, [postList, filterText]);

  const handleRangeChange = throttle((e) => {
    const container = scrollContainerRef.current;
    if (container) {
      const maxScrollLeft = container.scrollWidth - container.clientWidth;
      container.scrollLeft = (e.target.value / 100) * maxScrollLeft;
    }
  }, 100); // Adjust the throttle limit (in milliseconds) as needed

  const startIndicator = postList.length > 0 ? postList[0].date : 'Start';
  const endIndicator = postList.length > 0 ? postList[postList.length - 1].date : 'End';

  return (
    <div className="mt-20 w-full">
      {/* Filter Input */}
      <div className="flex justify-center mb-4">
        <input
          type="text"
          placeholder="Filter posts..."
          value={filterText}
          onChange={(e) => setFilterText(e.target.value)}
          className="text-white bg-gray-800 px-2 py-1 rounded focus:outline-none focus:ring focus:ring-blue-500"
        />
      </div>

      {/* Post List */}
      <div
        ref={scrollContainerRef}
        className="flex gap-x-12 hide-scrollbar overflow-x-auto overflow-y-hidden scroll-smooth"
        style={{ scrollBehavior: 'smooth', minHeight: "350px" }}
      >
        {filteredPostList.map((post, i) => (
          <FadeInSection key={`post:${i}`}>
            <div style={{ minWidth: "175px", maxWidth: "175px" }}>
              <PostButton
                post={post}
                getPost={() => getPost(post.id)}
                selected={post.id === selectedPostId}
                togglePostButton={togglePostButton}
              />
            </div>
          </FadeInSection>
        ))}
      </div>

      {/* Scroll Range Input */}
      <div className="flex mb-2 w-full">
        <input
          type="range"
          min="0"
          max="100"
          onInput={handleRangeChange}
          className="mx-4"
          disabled={postList.length === 0}
        />
      </div>

      {/* Start and End Indicators */}
      {postList.length > 0 && (
        <div className="flex w-full justify-between items-center text-gray-200">
          <div className="ml-4 w-14 text-sm">{startIndicator}</div>
          <div className="w-14 text-sm">{endIndicator}</div>
        </div>
      )}
    </div>
  );
}

function PostButton({ post, selected, togglePostButton }) {
  const handleClick = () => {
    togglePostButton(post.id);
  };

  const memoizedWords = useMemo(() => post.keywords.slice(0, 10), [post.keywords]);

  return (
    <button
      className={`relative text-white ${selected ? '' : 'opacity-70'}`}
      style={{ minWidth: "175px", maxWidth: "175px", height: "350px" }}
      onClick={handleClick}
    >
      <div className="z-50 absolute left-2 bottom-2 text-white px-2 rounded items-center">
        <div className="ml-1 text-sm flex justify-center items-center">{post.date}</div>
        <div className="text-white rounded flex m-1 p-1 text-base font-bold">
          {post.title}
        </div>
      </div>
      <WordCloud words={memoizedWords} maxFontSize={25} />
    </button>
  );
}

function throttle(func, limit) {
  let lastFunc;
  let lastRan;
  return function (...args) {
    const context = this;
    if (!lastRan) {
      func.apply(context, args);
      lastRan = Date.now();
    } else {
      clearTimeout(lastFunc);
      lastFunc = setTimeout(function () {
        if (Date.now() - lastRan >= limit) {
          func.apply(context, args);
          lastRan = Date.now();
        }
      }, limit - (Date.now() - lastRan));
    }
  };
}