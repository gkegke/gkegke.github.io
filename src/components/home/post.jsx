import { useState, useEffect, useCallback } from 'react';


import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw'

import '../common/markdown.css';

export default function Post({ postId }) {

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
  return <img {...props} style={{maxWidth: '100%'}} />
}

  return (<div className={`z-20 w-full bg-gray-900 pb-20 text-gray-100 shadow drop-shadow flex justify-center items-center `}
    >
        <div className={`markdown-content transition duration-300 ease-in-out ${
            postId !== null ? 'm-3 ml-3 mr-5 translate-x-0' : '-translate-x-full w-0 overflow-hidden'
            }`}
            style={{width:"700px"}}
            >

            <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}
              components={{img:({node,...props})=><img style={{maxWidth:'100%'}}{...props}/>}}
            >
                {postId && mdText}
            </ReactMarkdown>

            </div>

    </div>)

}