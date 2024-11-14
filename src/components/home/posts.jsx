
import { useState, useEffect } from 'react';

import Generator from '../common/generator.jsx';
import WordCloud from '../common/wordcloud.jsx';

export default function Posts({ postList, getPost, selectedPostId, togglePostButton }) {

  return (
    <div
      id="posts"
    >

            <Generator />

      {postList.map((post, i) => (
              <PostButton
                  key={`post:${i}`}
                  post={post}
                  getPost={() => getPost(post.id)}
                  selected={post.id === selectedPostId}
                  togglePostButton={togglePostButton}
              />
          )
        )}

    </div>
  );
}

function PostButton({ post, selected, togglePostButton }) {

    const handleClick = () => {
    togglePostButton(post.id);

  };

  return (
    <button
      className={`text-white drop-shadow w-40 h-80 overflow-hidden ${
        selected ?
        'text-underline' :
        'opacity-70'}`
      }
      onClick={handleClick}
    >
      <div className="flex p-1 text-base md:text-lg font-bold">{post.title}</div>
      <div className="flex justify-center items-center">{post.date}</div>
      <WordCloud words={post.keywords.slice(0, 10)} maxFontSize={25} />
    </button>
  );
}