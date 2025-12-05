import { useState, useEffect } from 'react';
import { m, AnimatePresence } from 'framer-motion';
import ProjectSlideshow from './components/ProjectSlideshow.jsx';
import ProjectsList from './components/ProjectsList.jsx';
import { getProjects } from './services/projectService.js';

export default function ProjectsPage() {
    const [projects, setProjects] = useState([]);
    const [current, setCurrent] = useState(0);

    useEffect(() => {
        setProjects(getProjects());
    }, []);

    if (projects.length === 0) {
        return null; 
    }

    const project = projects[current];

    function handlePrev() {
        setCurrent((prev) => (prev === 0 ? projects.length - 1 : prev - 1));
    }
    function handleNext() {
        setCurrent((prev) => (prev === projects.length - 1 ? 0 : prev + 1));
    }

    return (
        <div className="boder mt-4 pb-20 flex flex-row flex-col items-center justify-center w-full h-full text-white gap-8">
            <ProjectsList
                projects={projects}
                current={current}
                onSelect={setCurrent}
            />
            {/* Left Side: Info */}
            <AnimatePresence mode="wait">
                <m.div
                    key={current + '-left'}
                    initial={{ y: -60, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -60, opacity: 0 }}
                    transition={{ type: 'tween', stiffness: 50, damping: 11 }}
                    className="flex flex-col items-start justify-center max-w-md bg-black/60 rounded-lg p-8 shadow-lg"
                >
                    <h2 className="text-3xl font-bold mb-2">{project.name}</h2>
                    <p className="mb-4 text-lg">{project.description}</p>
					<a
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block px-5 py-2 bg-blue-600 hover:bg-blue-800 text-white rounded font-semibold transition-colors"
                    >
                        Visit Project
                    </a>
                    <div className="flex gap-2 mt-8">
                        <button
                            className="p-2 rounded-full bg-gray-700 hover:bg-blue-600 transition-colors text-2xl"
                            onClick={handlePrev}
                            aria-label="Previous Project"
                        >
                            &#8592;
                        </button>
                        <button
                            className="p-2 rounded-full bg-gray-700 hover:bg-blue-600 transition-colors text-2xl"
                            onClick={handleNext}
                            aria-label="Next Project"
                        >
                            &#8594;
                        </button>
                    </div>
                </m.div>
            </AnimatePresence>
            {/* Right Side: Slideshow */}
            <AnimatePresence mode="wait">
                <m.div
                    key={current + '-right'}
                    initial={{ y: 60, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 60, opacity: 0 }}
                    transition={{ type: 'tween', stiffness: 50, damping: 11 }}
                >
                    <ProjectSlideshow images={project.images} />
                </m.div>
            </AnimatePresence>
        </div>
    );
}