import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import FadeInSection from '../../../components/FadeInSection.jsx';
import { useScrollOpacity } from '../../../hooks/useScrollOpacity.jsx';
import { usePostMarkdown } from '../hooks/usePostMarkdown.jsx';
import { useUI } from '../../../context/UIContext.jsx';

export default function PostDetail({ postId }) {
  const mdText = usePostMarkdown(postId);
  const { isFocusMode, setIsFocusMode } = useUI();
  const readingModeOpacity = useScrollOpacity(100);

  const toggleFocusMode = () => {
    setIsFocusMode(!isFocusMode);
  };

  return (
    <article
      className={`flex flex-col relative justify-center items-start ${
        isFocusMode ? '' : 'max-w-[800px]'
      }`}
    >
      <button
        onClick={toggleFocusMode}
        className={`w-full pr-4 text-right text-sm text-blue-500 hover:text-white ${
          isFocusMode && 'mt-2'
        }`}
        style={{ opacity: readingModeOpacity }}
        aria-label={isFocusMode ? 'Exit reading mode' : 'Enter reading mode'}
      >
        {isFocusMode ? 'Cancel' : '+ Reading Mode'}
      </button>
 
      <FadeInSection>
        <div className={`prose prose-invert px-2 xs:px-3 xs:prose-lg md:prose-xl`}>
          <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}
            components={{ img: ({ node, ...props }) => <img style={{ maxWidth: '100%' }} {...props} /> }}
          >
            {mdText}
          </ReactMarkdown>
        </div>
      </FadeInSection>
    </article>
  );
}