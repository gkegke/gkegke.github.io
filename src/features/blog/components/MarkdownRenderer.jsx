import React from 'react';
import Markdown from 'markdown-to-jsx';
import LazyImage from '../../../components/LazyImage.jsx';

export default function MarkdownRenderer({ content }) {
  // markdown-to-jsx is significantly lighter than react-markdown + remark ecosystem
  // and allows easy component overrides.
  return (
    <Markdown
      options={{
        overrides: {
          img: {
            component: LazyImage,
          },
          // Override H1 to enforce responsive sizing and avoid layout breaks
          h1: {
            component: ({ children, ...props }) => (
              <h1 
                className="text-2xl xs:text-3xl md:text-5xl font-bold mb-6 mt-2 leading-tight break-words" 
                {...props}
              >
                {children}
              </h1>
            ),
          },
          // Optional: Tweak H2 for better scaling too
          h2: {
             component: ({ children, ...props }) => (
              <h2 
                className="text-xl xs:text-2xl md:text-3xl font-bold mb-4 mt-8 leading-snug break-words" 
                {...props}
              >
                {children}
              </h2>
            ),
          }
        },
      }}
    >
      {content}
    </Markdown>
  );
}