'use client';

import { Link } from '@inertiajs/react';
import {
    ArrowUpRight,
    ChevronLeft,
    ChevronRight,
    ExternalLink,
} from 'lucide-react';
import { useCallback, useRef, useState } from 'react';


interface Project {
    id: number;
    title: string;
    short_description: string;
    full_description: string;
    images: string[];
    tech: string[];
    link: string;
    color: string;
}

interface ProjectsSectionProps {
    projects: Project[];
    bg: string;
    bgCard: string;
    textPrimary: string;
    textMuted: string;
}

export default function ProjectsSection({
    projects,
    bg,
    bgCard,
    textPrimary,
    textMuted,
}: ProjectsSectionProps) {
    // ✅ Use Map instead of object
    const scrollRefs = useRef<Map<number, HTMLDivElement>>(new Map());

    // ✅ Use state instead of ref for UI updates
    const [expandedProject, setExpandedProject] = useState<number | null>(null);

    // ✅ Stable ref callback (no dynamic creation in render)
    const setScrollRef = useCallback((el: HTMLDivElement | null) => {
        if (!el) {
            return;
        }

        const id = Number(el.dataset.projectId);

        if (!isNaN(id)) {
            scrollRefs.current.set(id, el);
        }
    }, []);

    const scrollProject = useCallback(
        (projectId: number, direction: 'left' | 'right') => {
            const container = scrollRefs.current.get(projectId);

            if (!container) {
                return;
            }

            const scrollAmount = container.clientWidth * 0.9;
            const currentScroll = container.scrollLeft;
            const maxScroll = container.scrollWidth - container.clientWidth;

            container.scrollTo({
                left:
                    direction === 'left'
                        ? Math.max(0, currentScroll - scrollAmount)
                        : Math.min(maxScroll, currentScroll + scrollAmount),
                behavior: 'smooth',
            });
        },
        [],
    );

    const scrollToImage = useCallback((projectId: number, index: number) => {
        const container = scrollRefs.current.get(projectId);

        if (!container) {
            return;
        }

        container.scrollTo({
            left: index * (container.clientWidth * 0.9),
            behavior: 'smooth',
        });
    }, []);

    const toggleExpanded = useCallback((id: number) => {
        setExpandedProject((prev) => (prev === id ? null : id));
    }, []);

    const isExpanded = (id: number) => expandedProject === id;

    return (
        <section id="projects" className={`px-4 py-16 lg:px-8 ${bg}`}>
            <div className="mx-auto max-w-7xl">
                {/* Header */}
                <div className="mb-12 flex flex-col items-start gap-3 lg:flex-row lg:items-end lg:gap-0">
                    <div>
                        <span className="inline-block bg-linear-to-r from-indigo-500 to-purple-600 bg-clip-text text-[11px] font-bold tracking-[0.3em] text-transparent uppercase">
                            Featured Work
                        </span>
                        <h2
                            className={`mt-1 text-3xl font-black sm:text-4xl ${textPrimary}`}
                        >
                            Recent{' '}
                            <span className="bg-linear-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                                Projects
                            </span>
                        </h2>
                    </div>

                    <Link
                        href="/projects"
                        className="group flex items-center gap-2 text-xs font-bold text-indigo-600 hover:text-indigo-700"
                    >
                        View all
                        <ArrowUpRight
                            size={14}
                            className="transition-transform group-hover:translate-x-1"
                        />
                    </Link>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
                    {projects.map((project, index) => (
                        <div
                            key={project.id}
                            className={`fade-up group relative overflow-hidden rounded-xl ${bgCard} border border-white/10 bg-linear-to-br from-white/80 to-white/50 shadow-lg backdrop-blur-sm transition-all duration-500 hover:-translate-y-2 hover:scale-[1.01] hover:shadow-xl`}
                            style={{ animationDelay: `${index * 120}ms` }}
                        >
                            {/* Image */}
                            <div className="relative h-44 overflow-hidden">
                                <div
                                    data-project-id={project.id}
                                    ref={setScrollRef}
                                    className="scrollbar-hide absolute inset-0 flex snap-x snap-mandatory overflow-x-auto"
                                >
                                    {project.images.map((src, i) => (
                                        <div
                                            key={i}
                                            className="flex h-full w-[95%] shrink-0 snap-center items-center justify-center px-2"
                                        >
                                            <img
                                                src={src}
                                                className="h-full w-full rounded-lg object-cover"
                                            />
                                        </div>
                                    ))}
                                </div>

                                {/* Nav */}
                                <button
                                    onClick={() =>
                                        scrollProject(project.id, 'left')
                                    }
                                    className="absolute top-1/2 left-2 z-30 -translate-y-1/2"
                                >
                                    <ChevronLeft />
                                </button>

                                <button
                                    onClick={() =>
                                        scrollProject(project.id, 'right')
                                    }
                                    className="absolute top-1/2 right-2 z-30 -translate-y-1/2"
                                >
                                    <ChevronRight />
                                </button>

                                {/* Dots */}
                                {project.images.length > 1 && (
                                    <div className="absolute bottom-2 left-1/2 flex -translate-x-1/2 gap-1">
                                        {project.images.map((_, i) => (
                                            <button
                                                key={i}
                                                onClick={() =>
                                                    scrollToImage(project.id, i)
                                                }
                                                className="h-2 w-2 rounded-full bg-white/60"
                                            />
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Content */}
                            <div className="p-4">
                                <h3
                                    className={`text-lg font-bold ${textPrimary}`}
                                >
                                    {project.title}
                                </h3>

                                <p
                                    className={`${textMuted} text-sm ${
                                        isExpanded(project.id)
                                            ? ''
                                            : 'line-clamp-2'
                                    }`}
                                >
                                    {isExpanded(project.id)
                                        ? project.full_description
                                        : project.short_description}
                                </p>

                                <button
                                    onClick={() => toggleExpanded(project.id)}
                                    className="text-xs text-indigo-600"
                                >
                                    {isExpanded(project.id)
                                        ? 'Read less'
                                        : 'Read more'}
                                </button>

                                <a
                                    href={project.link}
                                    target="_blank"
                                    className="mt-3 flex items-center gap-2 text-sm text-white"
                                >
                                    View Project <ExternalLink size={14} />
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Styles */}
            <style>{`
                .scrollbar-hide::-webkit-scrollbar { display: none; }
                .scrollbar-hide { scrollbar-width: none; }

                .fade-up {
                    opacity: 0;
                    transform: translateY(30px);
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
