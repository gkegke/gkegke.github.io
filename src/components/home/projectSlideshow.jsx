import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ProjectSlideshow({ images }) {
    const [current, setCurrent] = useState(0);

    function handlePrev() {
        setCurrent((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    }
    function handleNext() {
        setCurrent((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    }
    function goTo(idx) {
        setCurrent(idx);
    }

    // Auto-iterate every 2.5 seconds
    useEffect(() => {
        if (images.length <= 1) return;
        const interval = setInterval(() => {
            setCurrent((prev) => (prev === images.length - 1 ? 0 : prev + 1));
        }, 2500);
        return () => clearInterval(interval);
    }, [images.length]);

    return (
        <div className="flex flex-col items-center w-full h-4/5">
            <div className="relative w-full flex justify-center items-center min-h-[250px]">
                <AnimatePresence mode="wait">
                    <motion.img
                        key={images[current]}
                        src={`/imgs/${images[current]}`}
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