import React from 'react';

export default function ProjectsList({ projects, current, onSelect }) {
    return (
        <div className="w-full flex justify-center items-center overflow-x-auto gap-4 mb-8 px-2 py-3">
            {projects.map((project, idx) => (
                <button
                    key={project.name}
                    onClick={() => onSelect(idx)}
                    className={`px-4 py-2 font-semibold flex flex-col justify-center items-start gap-y-2 duration-300 transition-colors rounded-lg hover:bg-gray-700 
                        ${idx === current
                            ? 'text-white'
                            : 'text-gray-400'}
                    `}
                    style={
                        idx === current ? {width: '250px'} : {}
                    }
                >
                    <span className="text-lg pr-1 text-white">{idx + 1}.</span>
                    <hr className={`w-full ${
                        idx === current ? 'border-white' : 'border-gray-400'
                    }`} />
                    {project.name}
                </button>
            ))}
        </div>
    );
}