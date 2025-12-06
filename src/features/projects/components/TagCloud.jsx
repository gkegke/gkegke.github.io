import React, { useMemo } from 'react';
import { TAG_ICONS, getTagStyle } from '../utils/tagConfig';
import { m, AnimatePresence } from 'framer-motion';

export default function TagCloud({ projects, selectedTag, onSelectTag }) {
  
  // Calculate tag frequency
  const tagData = useMemo(() => {
    const counts = {};
    projects.forEach(p => {
      if (p.tags && Array.isArray(p.tags)) {
        p.tags.forEach(tag => {
          const lower = tag.toLowerCase();
          counts[lower] = (counts[lower] || 0) + 1;
        });
      }
    });

    // Convert to array and sort by count (descending) then name
    return Object.entries(counts)
      .map(([tag, count]) => ({ tag, count }))
      .sort((a, b) => b.count - a.count || a.tag.localeCompare(b.tag));
  }, [projects]);

  if (tagData.length === 0) return null;

  // Helper to determine size class based on count relative to the set
  const getSizeClass = (count) => {
    if (count >= 4) return 'text-base px-5 py-2';
    if (count >= 2) return 'text-sm px-4 py-1.5';
    return 'text-xs px-3 py-1';
  };

  return (
    <div className="w-full max-w-4xl mx-auto mb-8">
       <div className="flex flex-wrap justify-center gap-3">
          <AnimatePresence>
            {/* "All" Filter Button */}
            <m.button
                layout
                onClick={() => onSelectTag(null)}
                className={`
                    rounded-full border transition-all duration-300 flex items-center gap-2
                    text-sm px-4 py-1.5 font-bold uppercase tracking-wider
                    ${selectedTag === null 
                        ? 'bg-white text-black border-white shadow-[0_0_15px_rgba(255,255,255,0.4)] scale-105' 
                        : 'bg-transparent text-zinc-500 border-zinc-700 hover:border-zinc-500 hover:text-zinc-300'}
                `}
            >
                All
            </m.button>

            {tagData.map(({ tag, count }) => {
                const Icon = TAG_ICONS[tag];
                const isSelected = selectedTag === tag;
                const baseStyle = getTagStyle(tag);
                const sizeClass = getSizeClass(count);

                return (
                    <m.button
                        layout
                        key={tag}
                        onClick={() => onSelectTag(isSelected ? null : tag)}
                        className={`
                            rounded-full border backdrop-blur-sm
                            transition-all duration-300 flex items-center justify-center gap-2
                            font-medium group
                            ${sizeClass}
                            ${isSelected 
                                ? 'bg-blue-600 border-blue-400 text-white shadow-[0_0_20px_rgba(37,99,235,0.5)] scale-110 z-10' 
                                : baseStyle}
                        `}
                        whileHover={{ scale: isSelected ? 1.1 : 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        {Icon && (
                            <Icon className={`${isSelected ? 'text-white' : 'text-current opacity-70'} text-lg`} />
                        )}
                        <span className="capitalize">{tag}</span>
                        {/* Optional: Show count if greater than 1 */}
                        {count > 1 && (
                            <span className={`
                                ml-1 text-[10px] bg-black/30 px-1.5 rounded-full
                                ${isSelected ? 'text-white' : 'text-current opacity-60'}
                            `}>
                                {count}
                            </span>
                        )}
                    </m.button>
                );
            })}
          </AnimatePresence>
       </div>
    </div>
  );
}