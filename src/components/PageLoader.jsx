import React from 'react';

export default function PageLoader() {
  return (
    <div className="w-full h-[50vh] flex flex-col items-center justify-center gap-4">
      <div className="relative w-12 h-12">
        <div className="absolute inset-0 border-4 border-zinc-800 rounded-full"></div>
        <div className="absolute inset-0 border-4 border-blue-500 rounded-full border-t-transparent animate-spin"></div>
      </div>
      <span className="text-zinc-500 text-sm font-mono animate-pulse">Loading...</span>
    </div>
  );
}