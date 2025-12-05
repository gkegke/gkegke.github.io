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
        },
      }}
    >
      {content}
    </Markdown>
  );
}