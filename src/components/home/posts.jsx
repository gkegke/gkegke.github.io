
import { useRef, useState, useEffect } from 'react';

import { Space, Tooltip } from 'antd';

import {
  AudioMutedOutlined,
  AudioOutlined,
  GithubOutlined,
} from '@ant-design/icons';

import FadeInSection from '../common/fadeInSection.jsx';
import WordCloud from '../common/wordcloud.jsx';

export default function Posts({ postList, getPost, selectedPostId, togglePostButton }) {

  return (
    <div
      id="posts"
      className="w-screen flex overflow-x-scroll overflow-y-hidden "
    >

          <TopLeft />

      {postList.map((post, i) => (
        <FadeInSection
                  key={`post:${i}`}
        >
              <PostButton
                  post={post}
                  getPost={() => getPost(post.id)}
                  selected={post.id === selectedPostId}
                  togglePostButton={togglePostButton}
              />
</FadeInSection>
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
      <div className="absolute left-2 bottom-2 text-white opacity-70 px-2 rounded items-center">
        <div className="text-white rounded flex m-1 p-1 text-base font-bold">
          {post.id} : {post.title}
        </div>
        <div className="ml-1 text-sm flex justify-center items-center">{post.date}</div>
      </div>
      <WordCloud words={post.keywords.slice(0, 10)} maxFontSize={25} />
    </button>
  );
}

function TopLeft() {

  const generatorRef = useRef();
 
    useEffect(() => {
    const handleResize = () => {
      const isMobile = window.innerWidth <= 500;
      const generator = generatorRef.current;

      if (generator) {
        generator.style.minWidth = isMobile ? "200px" : "350px";
        generator.style.maxWidth = isMobile ? "200px" : "350px";
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Initialize on mount

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (<>
    <div 
      id="generator"
      ref={generatorRef}
      className={`relative overflow-hidden`}
      style={{height:"400px"}}
      >
     <div
       className="absolute bottom-2 left-2 text-white justify-start items-start flex flex-col"
      >
    <div 
      className={`flex gap-2 items-center`}
      >
        <Tooltip title="checkout my github">
          <a
            href="https://github.com/gkegke"
            className="hover:bg-blue-500 p-2"
          >
          <GithubOutlined className="text-white text-4xl" />
        </a>
        </Tooltip>
        <div className="text-nowrap text-2xl font-bold">
          __ gkegke
          
        <div className="text-sm text-wrap">
          just some random thoughts
        </div>
        </div>
      </div>
      </div>
    </div>
  </>);
}
