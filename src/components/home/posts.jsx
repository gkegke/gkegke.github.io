
import {useRef } from 'react';

import { Space, Tooltip } from 'antd';

import Generator from '../common/generator.jsx';
import WordCloud from '../common/wordcloud.jsx';

export default function Posts({ postList, getPost, selectedPostId, togglePostButton }) {

  return (
    <div
      className={`flex justify-start items-center overflow-x-scroll overflow-y-hidden py-2 m-2 scroll`}
    >


<div className="w-80 mx-1 flex flex-col rounded-md"
     >

<div id="scroller" className="animate-scrolling-image w-screen h-screen opacity-70"></div>


            <Generator />

      <div className="drop-shadow justify-start items-start text-sm z-20 m-3 flex flex-col gap-3 font-base text-gray-100">
        <Tooltip title="checkout"><a href="https://github.com/gkegke/LovoHato">LovoHato</a></Tooltip>
        <Tooltip title="checkout"><a href="https://github.com/gkegke/CardCraft">CardCraft</a></Tooltip>
        <Tooltip title="checkout"><a href="https://github.com/gkegke/ModernFileExplorer">ModernFileExplorer</a></Tooltip>
      </div>

</div>      


      <div className="grid grid-rows-2 grid-flow-col gap-2">
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

    </div>
  );
}

function PostButton({ post, selected, togglePostButton }) {
  //const buttonRef = useRef(null);

    const handleClick = () => {
    togglePostButton(post.id);

    //setTimeout(() => {
    //  if (buttonRef.current) {
    //    buttonRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    //  }
    //}, 500);
  };

      //ref={buttonRef}
  return (
    <button
      className={`text-white drop-shadow row-span-1 w-60 h-60 overflow-hidden rounded-lg ${
        selected ?
        'text-underline' :
        'opacity-70'}`
      }
      onClick={handleClick}
    >
      <div className="flex p-3 text-base md:text-lg font-bold">{post.title}</div>
      <div className="flex justify-center items-center">{post.date}</div>
      <WordCloud words={post.keywords.slice(0, 10)} maxFontSize={25} />
    </button>
  );
}