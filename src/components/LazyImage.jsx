import React, { useState } from 'react';

/**
 * A robust image component for Markdown content.
 * Handles loading states to reduce visual jank (UX CLS).
 */
export default function LazyImage({ src, alt, ...props }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  return (
    <span className="block my-8 relative rounded-xl overflow-hidden bg-zinc-800/50 min-h-[200px] w-full">
      {/* Skeleton / Loading State */}
      {!isLoaded && !hasError && (
        <span className="absolute inset-0 flex items-center justify-center bg-zinc-800 animate-pulse z-0">
           <span className="text-zinc-600 text-sm font-mono">Loading image...</span>
        </span>
      )}

      {/* Actual Image */}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        onLoad={() => setIsLoaded(true)}
        onError={() => setHasError(true)}
        className={`
           relative z-10 w-full h-auto object-cover transition-opacity duration-500 ease-in-out
           ${isLoaded ? 'opacity-100' : 'opacity-0'}
        `}
        {...props}
      />
      
      {/* Error State */}
      {hasError && (
        <span className="absolute inset-0 flex items-center justify-center bg-zinc-900 border border-red-900/30 text-zinc-500">
           Failed to load image
        </span>
      )}
    </span>
  );
}