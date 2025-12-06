import { FaReact } from '@react-icons/all-files/fa/FaReact';
import { FaPython } from '@react-icons/all-files/fa/FaPython';
import { FaJs } from '@react-icons/all-files/fa/FaJs';
import { FaDatabase } from '@react-icons/all-files/fa/FaDatabase';
import { FaCode } from '@react-icons/all-files/fa/FaCode';
import { FaTools } from '@react-icons/all-files/fa/FaTools';
import { FaMobileAlt } from '@react-icons/all-files/fa/FaMobileAlt';
import { FaWindows } from '@react-icons/all-files/fa/FaWindows';
import { FaGraduationCap } from '@react-icons/all-files/fa/FaGraduationCap';

/**
 * Maps lowercase tag strings to React Icons.
 * If a tag isn't found here, it will just render without an icon.
 */
export const TAG_ICONS = {
  'react': FaReact,
  'python': FaPython,
  'js': FaJs,
  'javascript': FaJs,
  'full stack': FaDatabase,
  'data analysis': FaDatabase,
  'tooling': FaTools,
  'devops': FaTools,
  'mobile': FaMobileAlt,
  'windows': FaWindows,
  'c#': FaCode,
  'golang': FaCode,
  'education': FaGraduationCap,
  'math': FaCode,
};

/**
 * Returns a styling object based on an index (hashing) to ensure
 * consistency for specific tags without hardcoding every single color.
 */
export const getTagStyle = (tagString) => {
  // Simple hash function to get a number from a string
  let hash = 0;
  for (let i = 0; i < tagString.length; i++) {
    hash = tagString.charCodeAt(i) + ((hash << 5) - hash);
  }

  // Define our "Dark/Blue/White" palette classes
  const styles = [
    'bg-blue-900/40 border-blue-500/30 text-blue-100 hover:bg-blue-800/60',
    'bg-zinc-800/60 border-zinc-600/30 text-zinc-200 hover:bg-zinc-700/80',
    'bg-sky-900/30 border-sky-400/30 text-sky-100 hover:bg-sky-800/50',
    'bg-indigo-900/40 border-indigo-500/30 text-indigo-100 hover:bg-indigo-800/60',
    'bg-slate-800 border-slate-600/30 text-slate-200 hover:bg-slate-700'
  ];

  const index = Math.abs(hash) % styles.length;
  return styles[index];
};