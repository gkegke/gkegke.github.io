import React from 'react';

/**
 * A lightweight CSS-only tooltip component to replace Ant Design.
 * Uses group-hover pattern. 
 * Note: Be careful using this inside containers with overflow:hidden.
 */
export default function SimpleTooltip({ children, content }) {
  if (!content) return children;

  return (
    <div className="group relative flex items-center justify-center">
      {children}
      <div className="
        absolute bottom-full mt-2 left-1/2 -translate-x-1/2 
        hidden group-hover:block w-max max-w-[200px] z-50
        px-2 py-1 text-xs text-white bg-zinc-800 border border-white/10 rounded shadow-xl
        pointer-events-none transition-opacity duration-200 opacity-0 group-hover:opacity-100
      ">
        {content}
        {/* Little arrow */}
        <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-zinc-800 rotate-45 border-l border-t border-white/10"></div>
      </div>
    </div>
  );
}