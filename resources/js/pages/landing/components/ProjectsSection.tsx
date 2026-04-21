'use client';

import {
    ArrowUpRight,
    ChevronLeft,
    ChevronRight,
    ExternalLink,
} from 'lucide-react';
import { useCallback, useRef } from 'react';

interface Project {
    id: number;
    title: string;
    short_description: string;
    full_description: string;
    images: string[];
    tech: string[];
    link: string;
    color: string;
    image_count?: number;
    has_cover?: boolean;
}

interface ProjectsSectionProps {
    projects: Project[];
    darkMode: boolean;
    bg: string;
    bgCard: string;
    textPrimary: string;
    textMuted: string;
    borderColor: string;
}

export default function ProjectsSection({
                                            projects,
                                            bg,
                                            bgCard,
                                            textPrimary,
                                            textMuted,
                                        }: ProjectsSectionProps) {
    const scrollRefs = useRef<{ [key: number]: HTMLDivElement | null }>({});
    const expandedProjectRef = useRef<number | null>(null);

    const scrollProject = useCallback((projectId: number, direction: 'left' | 'right') => {
        const container = scrollRefs.current[projectId];

        if (!container) {
return;
}

        const scrollAmount = container.clientWidth * 0.9;
        const currentScroll = container.scrollLeft;
        const maxScroll = container.scrollWidth - container.clientWidth;

        if (direction === 'left') {
            container.scrollTo({
                left: Math.max(0, currentScroll - scrollAmount),
                behavior: 'smooth'
            });
        } else {
            container.scrollTo({
                left: Math.min(maxScroll, currentScroll + scrollAmount),
                behavior: 'smooth'
            });
        }
    }, []);

    const scrollToImage = useCallback((projectId: number, imageIndex: number) => {
        const container = scrollRefs.current[projectId];

        if (!container) {
return;
}

        container.scrollTo({
            left: imageIndex * (container.clientWidth * 0.9),
            behavior: 'smooth'
        });
    }, []);

    const toggleExpanded = useCallback((projectId: number) => {
        expandedProjectRef.current = expandedProjectRef.current === projectId ? null : projectId;
    }, []);

    const isExpanded = (projectId: number) => expandedProjectRef.current === projectId;

    return (
        <section id="projects" className={`px-4 py-16 lg:px-8 ${bg}`}>
            <div className="mx-auto max-w-7xl">
                {/* Header - Compact */}
                <div className="mb-12 flex flex-col items-start gap-3 lg:flex-row lg:items-end lg:gap-0">
                    <div>
                        <span className="inline-block bg-linear-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent text-[11px] font-bold tracking-[0.3em] uppercase">
                            Featured Work
                        </span>
                        <h2 className={`mt-1 text-3xl sm:text-4xl font-black ${textPrimary} leading-tight`}>
                            Recent{' '}
                            <span className="bg-linear-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                                Projects
                            </span>
                        </h2>
                    </div>
                    <a href="/projects" className="group flex items-center gap-2 text-xs font-bold text-indigo-600 hover:text-indigo-700">
                        View all <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-1" />
                    </a>
                </div>

                {/* Projects Grid - Optimized Height */}
                <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
                    {projects.map((project, index) => (
                        <div
                            key={project.id}
                            className={`
                                fade-up group relative overflow-hidden rounded-xl
                                ${bgCard} border border-white/10
                                shadow-lg shadow-black/5 hover:shadow-xl hover:shadow-black/10
                                bg-gradient-to-br from-white/80 to-white/50 backdrop-blur-sm
                                dark:from-slate-900/80 dark:to-slate-900/50 dark:border-white/5
                                transition-all duration-500 hover:-translate-y-2 hover:scale-[1.01]
                            `}
                            style={{ animationDelay: `${index * 120}ms` }}
                        >
                            {/* Image Container - Reduced Height to 180px */}
                            <div className="relative h-44 overflow-hidden bg-linear-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900">
                                {/* Scroll Container */}
                                <div
                                    ref={(el) => (scrollRefs.current[project.id] = el)}
                                    className="absolute inset-0 flex snap-x snap-mandatory overflow-x-auto scrollbar-hide"
                                    style={{
                                        scrollbarWidth: 'none',
                                        WebkitOverflowScrolling: 'touch',
                                        scrollSnapType: 'x mandatory'
                                    }}
                                >
                                    {project.images.map((src, si) => (
                                        <div
                                            key={`${project.id}-${si}`}
                                            className="flex h-full w-[95%] shrink-0 snap-center items-center justify-center px-2"
                                        >
                                            <div className="relative h-full w-full rounded-lg overflow-hidden shadow-lg ring-1 ring-white/20">
                                                <img
                                                    src={src}
                                                    alt={`${project.title} ${si === 0 ? 'cover' : `screenshot ${si}`}`}
                                                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                                                    loading={si === 0 ? "eager" : "lazy"}
                                                />
                                                <div className="absolute inset-0 bg-linear-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Navigation Buttons - Smaller */}
                                <button
                                    onClick={() => scrollProject(project.id, 'left')}
                                    className="absolute left-2 top-1/2 z-30 h-8 w-8 -translate-y-1/2 transform bg-white/95 backdrop-blur-xl shadow-lg ring-1 ring-white/50 opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110 hover:bg-white hover:ring-indigo-500/50 rounded-full"
                                >
                                    <ChevronLeft className="h-4 w-4 text-slate-800 mx-auto" />
                                </button>
                                <button
                                    onClick={() => scrollProject(project.id, 'right')}
                                    className="absolute right-2 top-1/2 z-30 h-8 w-8 -translate-y-1/2 transform bg-white/95 backdrop-blur-xl shadow-lg ring-1 ring-white/50 opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110 hover:bg-white hover:ring-indigo-500/50 rounded-full"
                                >
                                    <ChevronRight className="h-4 w-4 text-slate-800 mx-auto" />
                                </button>

                                {/* Dots Indicator - Smaller */}
                                {project.images.length > 1 && (
                                    <div className="absolute bottom-2 left-1/2 z-30 flex -translate-x-1/2 gap-1.5">
                                        {project.images.map((_, i) => (
                                            <button
                                                key={i}
                                                onClick={() => scrollToImage(project.id, i)}
                                                className={`h-1.5 w-1.5 rounded-full transition-all duration-300 shadow-lg ${
                                                    i === 0
                                                        ? 'bg-white shadow-white/50 scale-125 ring-1 ring-white/50'
                                                        : 'bg-white/60 hover:bg-white hover:scale-125 shadow-white/30'
                                                }`}
                                            />
                                        ))}
                                    </div>
                                )}

                                {/* Color Gradient Bar - Thinner */}
                                <div className={`absolute top-0 left-0 right-0 h-1 ${project.color} shadow-sm`} />
                            </div>

                            {/* Content - Compact */}
                            <div className="p-4">
                                <h3 className={`text-lg font-black mb-2 ${textPrimary} leading-tight`}>
                                    {project.title}
                                </h3>

                                <p className={`${textMuted} mb-2 text-xs leading-relaxed ${
                                    isExpanded(project.id) ? '' : 'line-clamp-2'
                                } transition-all duration-200`}>
                                    {isExpanded(project.id)
                                        ? project.full_description
                                        : project.short_description}
                                </p>

                                {/* Read More Button - Extra Small */}
                                <button
                                    onClick={() => toggleExpanded(project.id)}
                                    className="mb-3 inline-flex items-center gap-0.5 text-[10px] font-semibold text-indigo-600 hover:text-indigo-700 transition-colors uppercase tracking-wide"
                                >
                                    {isExpanded(project.id) ? 'Read less' : 'Read more'}
                                    <span className="text-xs ml-0.5">•</span>
                                </button>

                                {/* Tech Stack - Compact */}
                                <div className="mb-4 flex flex-wrap gap-1.5">
                                    {project.tech.slice(0, 4).map((tech) => (
                                        <span
                                            key={tech}
                                            className="px-2 py-1 text-[10px] font-semibold rounded-md bg-indigo-50/50 text-indigo-700 border border-indigo-200/50 backdrop-blur-sm hover:bg-indigo-100 transition-all dark:bg-slate-800/50 dark:text-slate-200 dark:border-slate-600"
                                        >
                                            {tech}
                                        </span>
                                    ))}
                                    {project.tech.length > 4 && (
                                        <span className="px-2 py-1 text-[10px] font-semibold text-slate-500 bg-slate-100/50 rounded-md">
                                            +{project.tech.length - 4}
                                        </span>
                                    )}
                                </div>

                                {/* CTA Button - Smaller */}
                                <a
                                    href={project.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`
                                        group/btn flex items-center justify-center gap-2 py-2 px-3 rounded-lg
                                        font-bold text-sm transition-all duration-300
                                        bg-gradient-to-r from-indigo-600 to-purple-600 text-white
                                        shadow-md hover:shadow-lg hover:scale-[1.02] hover:-translate-y-0.5
                                        hover:from-indigo-700 hover:to-purple-700 transform
                                    `}
                                >
                                    <span>View Project</span>
                                    <ExternalLink className="h-3.5 w-3.5 transition-transform group-hover/btn:translate-x-0.5" />
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <style jsx>{`
                .scrollbar-hide::-webkit-scrollbar { display: none; }
                .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
                .fade-up {
                    opacity: 0; transform: translateY(30px);
                    animation: fadeUp 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
                }
                @keyframes fadeUp {
                    to { opacity: 1; transform: translateY(0); }
                }
                .line-clamp-2 {
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                }
            `}</style>
        </section>
    );
}
