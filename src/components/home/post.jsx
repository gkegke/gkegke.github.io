import { useState, useEffect, useCallback } from 'react';


import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw'

import '../common/markdown.css';

import {
  AudioMutedOutlined,
  AudioOutlined,
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

  return (<div className={`px-10 text-gray-100 shadow drop-shadow flex justify-center items-center `}
    style={focusedMode ? {minWidth: "300px", maxWidth: "800px", backgroundColor: "#0f0f0f"} : {minWidth: "400px", backgroundColor: "#0f0f0f"}}
    >
        <div className={`markdown-content`}
        >

  <button
    className="mt-4 rounded text-3xl text-blue-500"
    onClick={toggleFocusMode}
  >{focusedMode ? (<AudioOutlined />) : (<AudioMutedOutlined />) }</button>

            <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}
              components={{img:({node,...props})=><img style={{maxWidth:'100%'}}{...props}/>}}
            >
                {postId && mdText}
            </ReactMarkdown>

            </div>

    </div>)

}