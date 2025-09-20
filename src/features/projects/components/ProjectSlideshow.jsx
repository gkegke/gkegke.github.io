import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PATHS } from '../../../config/paths';

export default function ProjectSlideshow({ images }) {
    const [current, setCurrent] = useState(0);

    // Effect to reset internal 'current' when the 'images' prop changes (i.e., a new project is selected)
    useEffect(() => {
        // If the array of images itself changes, reset the internal index to 0
        setCurrent(0);
    }, [images]); // Only run when the images prop array itself changes

    const handleNext = useCallback(() => {
        setCurrent((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    }, [images.length]); // handleNext depends on images.length to know boundaries

    const handlePrev = useCallback(() => {
        setCurrent((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    }, [images.length]); // handlePrev depends on images.length to know boundaries

    const goTo = useCallback((idx) => {
        setCurrent(idx);
    }, []);

    // Auto-iterate using a chained setTimeout that re-runs the effect on each image change.
    useEffect(() => {
        // If no images or only one image, don't set a timer for auto-advance.
        if (!images || images.length <= 1) {
            return;
        }

        // Set a timer that will advance to the next slide.
        const timerId = setTimeout(handleNext, 2500);

        // The cleanup function is crucial. It clears the timer if the component
        // unmounts or if the effect re-runs (e.g., when 'current' changes).
        return () => clearTimeout(timerId);

    // This effect's dependency array is key. It will re-run whenever 'current' (the image index)
    // changes, or when the entire 'images' array is replaced (for a new project).
    }, [current, images, handleNext]);

    return (
        <div className="flex flex-col items-center w-full h-4/5">
            <div className="relative w-full flex justify-center items-center min-h-[250px]">
                <AnimatePresence mode="wait">
                    <motion.img
                        // Using current image directly from images array ensures correct image when 'current' state updates
                        key={images[current]} // Key the image itself for Framer Motion to animate image changes
                        src={`${PATHS.PROJECT_IMAGES}${images[current]}`}
                        alt={`Project screenshot ${current + 1}`}
                        className="object-cover"
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 1.02 }}
                        transition={{ duration: 0.5, ease: 'easeInOut' }}
                    />
                </AnimatePresence>
                {images.length > 1 && (
                    <>
                        <button
                            className="hidden absolute left-2 top-1/2 -translate-y-1/2 bg-black/60 text-white rounded-full p-2 text-xl hover:bg-blue-600 transition"
                            onClick={handlePrev}
                            aria-label="Previous Image"
                        >
                            &#8592;
                        </button>
                        <button
                            className="hidden absolute right-2 top-1/2 -translate-y-1/2 bg-black/60 text-white rounded-full p-2 text-xl hover:bg-blue-600 transition"
                            onClick={handleNext}
                            aria-label="Next Image"
                        >
                            &#8594;
                        </button>
                    </>
                )}
            </div>
            {/* Dots */}
            <div className="flex gap-2 mt-3">
                {images.map((_, idx) => (
                    <button
                        key={idx}
                        className={`w-4 h-4 rounded-full border-2 ${
                            idx === current
                                ? 'bg-blue-500 border-blue-700'
                                : 'bg-gray-400 border-gray-600'
                        }`}
                        onClick={() => goTo(idx)}
                        aria-label={`Go to image ${idx + 1}`}
                    />
                ))}
            </div>
        </div>
    );
}