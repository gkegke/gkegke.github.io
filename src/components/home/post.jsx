import { useState, useEffect, useCallback } from 'react';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw'

import FadeInSection from './../common/fadeInSection.jsx';

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
  return <img {...props} style={{maxWidth: '90%'}} />
}

  return (
  
<div className="flex justify-center w-full boder border-ed-500"
>
  <div className={`borer px-4 text-gray-100 shaow dop-shadow flex flex-col justify-center items-center`}
    style={{maxWidth:"800px"}}
    >
<FadeInSection>
        <div className={`markdown-content`}
        >

            <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}
              components={{img:({node,...props})=><img style={{maxWidth:'100%'}}{...props}/>}}
            >
                {postId && mdText}
            </ReactMarkdown>

            </div>

</FadeInSection>
    </div></div>
    
    )

}