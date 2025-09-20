import { NavLink } from 'react-router-dom';
import { Tooltip } from 'antd';
import { GithubOutlined } from '@ant-design/icons';
import { useScrollOpacity } from '../hooks/useScrollOpacity';
import Generator from './components/Generator';

export default function Header() {
  const headerOpacity = useScrollOpacity(150);

  const headerStyle = {
    opacity: headerOpacity,
    pointerEvents: headerOpacity < 0.1 ? 'none' : 'auto',
    backgroundColor: 'rgba(15, 15, 15, 0.6)',
    backdropFilter: 'blur(2px)',
    WebkitBackdropFilter: 'blur(2px)',
  };

  const navLinkClasses = "px-5 py-2 text-sm font-bold rounded-full transition-all duration-300";

  return (
    <div
      className="rounded-tl-lg fixed bottom-0 right-0 z-50 flex justify-between items-center transition-opacity duration-300 shadow-lg"
      style={headerStyle}
    >
      <div className="flex gap-4 justify-center items-center">
        <Tooltip title="Checkout my Github">
          <a href="https://github.com/gkegke" className="hidden xs:flex items-center justify-center rounded-full transition-colors hover:bg-gray-700">
            <GithubOutlined className="text-white text-3xl" />
          </a>
        </Tooltip>
        <div className="hidden text-nowrap text-2xl font-bold">
          __ gkegke
          <div className="text-sm text-wrap hidden xs:flex font-light text-gray-300">
            Just some random thoughts
          </div>
        </div>
        <Generator />
      </div>

      <div className="flex items-center bg-gray-800/50 rounded-full p-1">
        <NavLink
          to="/blog"
          className={({ isActive }) => 
            `${navLinkClasses} ${isActive ? 'bg-blue-600 text-white' : 'text-gray-300 hover:bg-gray-700/80'}`
          }
        >
          Blog
        </NavLink>
        <NavLink
          to="/projects"
          className={({ isActive }) => 
            `${navLinkClasses} ${isActive ? 'bg-blue-600 text-white' : 'text-gray-300 hover:bg-gray-700/80'}`
          }
        >
          Projects
        </NavLink>
      </div>
    </div>
  );
}