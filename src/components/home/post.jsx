import { useState, useEffect, useCallback } from 'react';

import { Space, Tooltip } from 'antd';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw'

import '../common/markdown.css';

import {
  AudioMutedOutlined,
  AudioOutlined,
  GithubOutlined,
} from '@ant-design/icons';

export default function Post({ postId, focusedMode, toggleFocusMode }) {

    const [mdText, setMDText] = useState("");

      const getPost = useCallback(async (postId) => {
      const response = await fetch(`/originals/${postId}.md`);
      const data = await response.text();

        setMDText(data);

  }, [postId]);

    useEffect(() => {

        if (postId !== null) {

            getPost(postId)

        }

    }, [postId]);

    function Image(props) {
  return <img {...props} style={{maxWidth: '90%'}} />
}

  return (<div className={`px-4 text-gray-100 shadow drop-shadow flex flex-col `}
    style={focusedMode ? {minWidth: "300px", maxWidth: "800px", backgroundColor: "#0f0f0f"} : {minWidth: "400px", backgroundColor: "#0f0f0f"}}
    >

<div className="flex gap-2 mt-4">

  <button
    className="rounded text-3xl text-blue-500"
    onClick={toggleFocusMode}
  >{focusedMode ? (<AudioOutlined />) : (<AudioMutedOutlined />) }</button>


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
          
        <div className="text-sm">
          just some random thoughts
        </div>
        </div>
    </div>
</div>

        <div className={`markdown-content`}
        >

            <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}
              components={{img:({node,...props})=><img style={{maxWidth:'100%'}}{...props}/>}}
            >
                {postId && mdText}
            </ReactMarkdown>

            </div>

    </div>)

}