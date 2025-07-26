import { useState, useEffect, useCallback } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw'
import FadeInSection from './../common/fadeInSection.jsx';
import '../common/markdown.css';

import { LeftOutlined, RightOutlined } from '@ant-design/icons';

export default function Post({ postId, minPostId, maxPostId, setSelectedPostId }) {
  const [mdText, setMDText] = useState("");

  const getPost = useCallback(async (postId) => {
      const response = await fetch(`/originals/${postId}.md`);
      const data = await response.text();
      setMDText(data);
  }, [postId]);

  useEffect(() => {
    if (postId !== null) {
      getPost(postId);
    }
  }, [postId, getPost]);

  // Left: go to newer (higher id), Right: go to older (lower id)
  function handleLeft() {
    if (postId < maxPostId) setSelectedPostId(postId + 1);
  }
  function handleRight() {
    if (postId > minPostId) setSelectedPostId(postId - 1);
  }

  return (
    <div className="flex justify-center w-full bordr">
      {/* Left Button: Older (lower id) */}
      {postId < maxPostId && (
        <button
          className="opacity-70 hover:opacity-100 fixed bottom-4 left-8 flex items-center justify-center bg-white hover:bg-red-500 transition-colors duration-200 rounded-full p-4"
          onClick={handleLeft}
          aria-label="Older Post"
          style={{
            zIndex: 9999,
          }}
        >
          <LeftOutlined className="text-3xl text-gray-500" />
        </button>
      )}

      <div className={`borer px-4 text-gray-100 shaow dop-shadow flex flex-col justify-center items-center`}
        style={{maxWidth:"800px"}}
      >
        <FadeInSection>
          <div className={`markdown-content`}>
            <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}
              components={{img:({node,...props})=><img style={{maxWidth:'100%'}}{...props}/>}}
            >
              {postId && mdText}
            </ReactMarkdown>
          </div>
        </FadeInSection>
      </div>

      {/* Right Button: Newer (higher id) */}
      {postId > minPostId && (
        <button
          className="fixed bottom-4 right-8 flex items-center justify-center bg-white hover:bg-red-500 transition-colors duration-200 rounded-full p-4"
          onClick={handleRight}
          aria-label="Newer Post"
        >
          <RightOutlined className="text-3xl text-gray-500" />
        </button>
      )}
    </div>
  )
}