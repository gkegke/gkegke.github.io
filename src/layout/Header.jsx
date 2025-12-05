import { NavLink } from 'react-router-dom';
// Optimized import for tree-shaking
import { FaGithub } from '@react-icons/all-files/fa/FaGithub';
import { useMediaQuery } from '../hooks/useMediaQuery';
import useScrollDirection from '../hooks/useScrollDirection';
import Generator from './components/Generator';
import AskAIWidget from './components/AskAIWidget';
import SimpleTooltip from '../components/SimpleTooltip';

export default function Header() {
  const isVisible = useScrollDirection(); 
  const isMobile = useMediaQuery('(max-width: 640px)');

  const headerStyle = {
    backgroundColor: isMobile ? '#09090b' : 'rgba(9, 9, 11, 0.75)',
    backdropFilter: isMobile ? 'none' : 'blur(16px)',
    WebkitBackdropFilter: isMobile ? 'none' : 'blur(16px)',
  };

  const navLinkBase = "px-4 sm:px-6 py-2 text-sm font-medium rounded-full transition-all duration-300 relative overflow-hidden group";

  return (
    <div
      className={`
        fixed bottom-0 left-0 right-0 z-50 
        flex justify-between items-center px-3 sm:px-4 py-3 
        border-t border-white/10 shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.8)] 
        transform-gpu transition-transform duration-300 ease-in-out
        ${isVisible ? 'translate-y-0' : 'translate-y-[120%]'}
      `}
      style={headerStyle}
    >
      <div className="flex gap-2 sm:gap-6 justify-center items-center">
       
        {/* Desktop: Show Canvas Generator. */}
        {!isMobile && (
           <div className="hidden sm:block">
              <Generator />
           </div>
        )}

        {/* Mobile: Show Compact Text Logo to save space */}
        <div className="block sm:hidden text-white font-bold tracking-widest text-base pl-2">
           GKEGKE
        </div>

        <div className="w-[1px] h-8 bg-gray-700 hidden xs:block"></div>

        <SimpleTooltip content="Checkout my Github">
          <a href="https://github.com/gkegke" className="hidden xs:flex items-center justify-center text-gray-400 hover:text-white transition-colors transform hover:scale-110">
            <FaGithub className="text-2xl" />
          </a>
        </SimpleTooltip>
 
        <div className="w-[1px] h-8 bg-gray-700 hidden sm:block"></div>

        <AskAIWidget />

      </div>

      <div className="flex items-center">
        {/* Navigation Pills */}
        <div className="flex items-center gap-1 sm:gap-2 bg-black/20 p-1 rounded-full border border-white/5 backdrop-blur-md">
          <NavLink
            to="/blog"
            className={({ isActive }) => 
              `${navLinkBase} ${isActive 
                ? 'bg-blue-600/90 text-white shadow-glow-blue' 
                : 'text-gray-400 hover:text-white hover:bg-white/5'}`
            }
          >
            Blog
          </NavLink>
          <NavLink
            to="/projects"
            className={({ isActive }) => 
              `${navLinkBase} ${isActive 
                ? 'bg-blue-600/90 text-white shadow-glow-blue' 
                : 'text-gray-400 hover:text-white hover:bg-white/5'}`
            }
          >
            Projects
          </NavLink>
        </div>
      </div>
    </div>
  );
}