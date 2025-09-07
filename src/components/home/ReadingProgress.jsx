import React, { useState, useEffect } from 'react';

export default function ReadingProgress() {
    const [progress, setProgress] = useState(0);

    const handleScroll = () => {
        const totalHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrollPosition = window.scrollY;
        const scrollPercentage = (scrollPosition / totalHeight) * 100;
        setProgress(scrollPercentage);
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <div className="fixed top-0 left-0 w-full h-1 z-50">
            <div
                className="h-full bg-gradient-to-r from-sky-400 to-blue-500"
                style={{ width: `${progress}%` }}
            />
        </div>
    );
}