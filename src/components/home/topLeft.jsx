import { Tooltip } from 'antd';
import { useState } from 'react';

import {
  GithubOutlined,
} from '@ant-design/icons';

export default function TopLeft({ mode, setMode }) {
  return (
    <div
      className="absolute top-4 left-2 text-white justify-start items-center flex gap-4"
      style={{zIndex: 9999}}
    >
      <div className="flex gap-2 items-center">
        <Tooltip title="checkout my github">
          <a href="https://github.com/gkegke" className="hover:bg-blue-500 p-2">
            <GithubOutlined className="text-white text-4xl" />
          </a>
        </Tooltip>
        <div className="text-nowrap text-2xl font-bold">
          __ gkegke
          <div className="text-sm text-wrap">just some random thoughts</div>
        </div>
      </div>
      <div className="flex items-center">
        <button
          className={`px-4 py-2 rounded-l font-bold transition-colors duration-200 ${
            mode === 'blog'
              ? 'bg-gray-600 text-white'
              : 'text-gray-200 hover:bg-blue-200'
          }`}
          onClick={() => setMode('blog')}
        >
          Blog
        </button>
        <button
          className={`px-4 py-2 rounded-r font-bold transition-colors duration-200 ${
            mode === 'projects'
              ? 'bg-gray-600 text-white'
              : 'text-gray-200 hover:bg-blue-200'
          }`}
          onClick={() => setMode('projects')}
        >
          Projects
        </button>
      </div>
    </div>
  );
}