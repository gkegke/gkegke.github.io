
import { useState, useEffect } from 'react';

import Generator from '../common/generator.jsx';
import WordCloud from '../common/wordcloud.jsx';

export default function Posts({ postList, getPost, selectedPostId, togglePostButton }) {

  return (
    <div
      id="posts"
      className="w-screen flex overflow-x-scroll overflow-y-hidden mb-8"
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
      className={`relative text-white overflow-hidden ${
        selected ? '' : 'opacity-70'
      } ${
        post.id % 2 === 0 ? 'text-white' : 'text-white'
      }`}
      style={{minWidth: "175px", maxWidth: "175px", height: "400px"}}
      onClick={handleClick}
    > 
      <div className="absolute left-2 top-2 text-white opacity-70 px-2 rounded items-center">
        <div className="text-white rounded flex m-1 p-1 text-base font-bold">
          {post.id} : {post.title}
        </div>
        <div className="ml-1 text-sm flex justify-center items-center">{post.date}</div>
      </div>
      <WordCloud words={post.keywords.slice(0, 10)} maxFontSize={25} />
    </button>
  );
}