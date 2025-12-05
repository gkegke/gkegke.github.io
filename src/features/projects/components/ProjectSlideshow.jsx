import React, { useState, useEffect, useCallback } from 'react';
import { m, AnimatePresence } from 'framer-motion';
import { PATHS } from '../../../config/paths';

export default function ProjectSlideshow({ images }) {
    const [current, setCurrent] = useState(0);

    useEffect(() => {
        setCurrent(0);
    }, [images]);

    const handleNext = useCallback(() => {
        setCurrent((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    }, [images.length]);

    const handlePrev = useCallback(() => {
        setCurrent((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    }, [images.length]);

    const goTo = useCallback((idx) => {
        setCurrent(idx);
    }, []);

    useEffect(() => {
        if (!images || images.length <= 1) return;
        const timerId = setTimeout(handleNext, 4000); 
        return () => clearTimeout(timerId);
    }, [current, images, handleNext]);

    return (
        <div className="flex flex-col items-center w-full max-w-3xl mx-auto">
            <div className="relative w-full aspect-video bg-zinc-900 rounded-lg border border-white/10 shadow-2xl overflow-hidden group">
                {/* Frame/Glass reflection effect */}
                <div className="absolute inset-0 z-10 pointer-events-none bg-gradient-to-br from-white/5 to-transparent opacity-50"></div>
                
                <AnimatePresence mode="wait">
                    <m.img
                        key={images[current]}
                        src={`${PATHS.PROJECT_IMAGES}${images[current]}`}
                        alt={`Project screenshot ${current + 1}`}
                        className="object-cover w-full h-full"
                        initial={{ opacity: 0, scale: 1.05 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.7, ease: [0.32, 0.72, 0, 1] }}
                    />
                </AnimatePresence>

                {images.length > 1 && (
                    <>
                        <button
                            className="absolute z-20 left-4 top-1/2 -translate-y-1/2 bg-black/40 backdrop-blur text-white rounded-full p-3 opacity-0 group-hover:opacity-100 hover:bg-blue-600 transition-all duration-300"
                            onClick={handlePrev}
                        >
                            &#8592;
                        </button>
                        <button
                            className="absolute z-20 right-4 top-1/2 -translate-y-1/2 bg-black/40 backdrop-blur text-white rounded-full p-3 opacity-0 group-hover:opacity-100 hover:bg-blue-600 transition-all duration-300"
                            onClick={handleNext}
                        >
                            &#8594;
                        </button>
                    </>
                )}
            </div>
            
            {/* Dots */}
            <div className="flex gap-3 mt-6">
                {images.map((_, idx) => (
                    <button
                        key={idx}
                        className={`
                            h-1.5 rounded-full transition-all duration-300
                            ${idx === current ? 'w-8 bg-blue-500 shadow-glow-blue' : 'w-2 bg-zinc-700 hover:bg-zinc-500'}
                        `}
                        onClick={() => goTo(idx)}
                        aria-label={`Go to image ${idx + 1}`}
                    />
                ))}
            </div>
        </div>
    );
}