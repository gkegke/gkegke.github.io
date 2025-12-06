import { useState, useEffect, useMemo } from 'react';
import { m, AnimatePresence } from 'framer-motion';
import ProjectSlideshow from './components/ProjectSlideshow.jsx';
import ProjectsList from './components/ProjectsList.jsx';
import TagCloud from './components/TagCloud.jsx';
import { getProjects } from './services/projectService.js';
import { FaSearch } from '@react-icons/all-files/fa/FaSearch';

export default function ProjectsPage() {
    // Master list of all projects
    const [allProjects, setAllProjects] = useState([]);
    // Currently displayed project index (relative to filtered list)
    const [current, setCurrent] = useState(0);
    // Active filter tag
    const [selectedTag, setSelectedTag] = useState(null);

    useEffect(() => {
        setAllProjects(getProjects());
    }, []);

    // Derived state: Filter projects based on selection
    const filteredProjects = useMemo(() => {
        if (!selectedTag) return allProjects;
        return allProjects.filter(p => 
            p.tags && p.tags.some(t => t.toLowerCase() === selectedTag.toLowerCase())
        );
    }, [selectedTag, allProjects]);

    // Reset index when filter changes to avoid out-of-bounds errors
    useEffect(() => {
        setCurrent(0);
    }, [selectedTag]);

    if (allProjects.length === 0) {
        return null; 
    }

    // Handlers for navigation
    function handlePrev() {
        setCurrent((prev) => (prev === 0 ? filteredProjects.length - 1 : prev - 1));
    }
    function handleNext() {
        setCurrent((prev) => (prev === filteredProjects.length - 1 ? 0 : prev + 1));
    }

    const project = filteredProjects[current];

    return (
        <div className="w-full min-h-screen pt-24 pb-20 px-4 flex flex-col items-center">
            
            {/* Tag Cloud / Filter Section */}
            <div className="w-full mb-8 animate-in fade-in slide-in-from-top-4 duration-700">
                <TagCloud 
                    projects={allProjects} 
                    selectedTag={selectedTag} 
                    onSelectTag={setSelectedTag} 
                />
            </div>

            {/* Empty State Handling */}
            {filteredProjects.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-[400px] text-zinc-500">
                    <FaSearch className="text-4xl mb-4 opacity-50" />
                    <p className="text-lg">No projects found with tag "{selectedTag}"</p>
                    <button 
                        onClick={() => setSelectedTag(null)}
                        className="mt-4 text-blue-400 hover:text-blue-300 underline"
                    >
                        Clear filter
                    </button>
                </div>
            ) : (
                <div className="flex flex-col w-full h-full gap-8 max-w-7xl">
                    
                    {/* Project Navigation List */}
                    <ProjectsList
                        projects={filteredProjects}
                        current={current}
                        onSelect={setCurrent}
                    />

                    <div className="flex flex-col lg:flex-row gap-8 items-start justify-center w-full">
                        {/* Left Side: Info */}
                        <AnimatePresence mode="wait">
                            <m.div
                                key={project ? project.id : 'empty-info'}
                                initial={{ x: -20, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                exit={{ x: -20, opacity: 0 }}
                                transition={{ type: 'tween', ease: 'easeOut', duration: 0.3 }}
                                className="flex flex-col items-start justify-center w-full lg:w-1/3 bg-zinc-900/40 backdrop-blur-md border border-white/5 rounded-2xl p-8 shadow-xl"
                            >
                                <div className="flex flex-wrap gap-2 mb-4">
                                    {project.tags?.map(tag => (
                                        <span key={tag} className="text-[10px] uppercase tracking-wider font-bold text-blue-400 bg-blue-900/20 px-2 py-1 rounded">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                                <h2 className="text-3xl font-bold mb-4 text-white">{project.name}</h2>
                                <p className="mb-6 text-lg text-zinc-300 leading-relaxed">{project.description}</p>
                                
                                <div className="flex items-center gap-4 w-full">
                                    <a
                                        href={project.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex-1 text-center px-6 py-3 bg-white text-black hover:bg-zinc-200 rounded-lg font-bold transition-colors shadow-[0_0_20px_rgba(255,255,255,0.1)]"
                                    >
                                        Visit Project
                                    </a>
                                    
                                    <div className="flex gap-2">
                                        <button
                                            className="p-3 rounded-lg bg-zinc-800 border border-white/10 hover:bg-zinc-700 hover:border-white/30 transition-all text-xl text-white"
                                            onClick={handlePrev}
                                            aria-label="Previous Project"
                                        >
                                            &#8592;
                                        </button>
                                        <button
                                            className="p-3 rounded-lg bg-zinc-800 border border-white/10 hover:bg-zinc-700 hover:border-white/30 transition-all text-xl text-white"
                                            onClick={handleNext}
                                            aria-label="Next Project"
                                        >
                                            &#8594;
                                        </button>
                                    </div>
                                </div>
                            </m.div>
                        </AnimatePresence>

                        {/* Right Side: Slideshow */}
                        <AnimatePresence mode="wait">
                            <m.div
                                key={project ? project.id : 'empty-slides'}
                                initial={{ x: 20, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                exit={{ x: 20, opacity: 0 }}
                                transition={{ type: 'tween', ease: 'easeOut', duration: 0.3 }}
                                className="w-full lg:w-2/3"
                            >
                                <ProjectSlideshow images={project.images} />
                            </m.div>
                        </AnimatePresence>
                    </div>
                </div>
            )}
        </div>
    );
}