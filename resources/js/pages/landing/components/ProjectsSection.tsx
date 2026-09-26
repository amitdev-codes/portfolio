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
    darkMode?: boolean;
}

export default function ProjectsSection({
                                            projects,
                                            bg,
                                            bgCard,
                                            textPrimary,
                                            textMuted,
                                            darkMode = false,
                                        }: ProjectsSectionProps) {
    const scrollRefs = useRef<Map<number, HTMLDivElement>>(new Map());
                                            const projectsScrollerRef = useRef<HTMLDivElement>(null);
                                            const [expandedProject, setExpandedProject] = useState<number | null>(null);

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

            const scrollAmount = container.clientWidth;
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
            left: index * container.clientWidth,
            behavior: 'smooth',
        });
    }, []);

    const toggleExpanded = useCallback((id: number) => {
        setExpandedProject((prev) => (prev === id ? null : id));
    }, []);

    const scrollProjects = (direction: 'left' | 'right') => {
        const container = projectsScrollerRef.current;

        if (!container) {
            return;
        }

        container.scrollBy({
            left:
                direction === 'left'
                    ? -container.clientWidth
                    : container.clientWidth,
            behavior: 'smooth',
        });
    };

    const isExpanded = (id: number) => expandedProject === id;

    const arrowButtonClass = `absolute top-1/2 z-30 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full border backdrop-blur-sm transition-colors ${
        darkMode
            ? 'border-white/20 bg-black/45 text-white hover:bg-black/70'
            : 'border-white/80 bg-white/90 text-slate-800 shadow-sm hover:bg-white'
    }`;

    return (
        <section id="projects" className={`px-6 py-24 lg:px-8 ${bg}`}>
            <div className="mx-auto max-w-7xl">
                <div className="fade-up mb-16 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
                    <div>
                        <span className="text-xs font-bold tracking-[0.2em] text-indigo-600 uppercase">
                            Featured Work
                        </span>
                        <h2
                            className={`mt-3 text-4xl font-black sm:text-5xl ${textPrimary}`}
                        >
                            Recent{' '}
                            <span className="text-indigo-600">Projects</span>
                        </h2>
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="flex gap-2">
                            <button
                                type="button"
                                aria-label="Scroll projects left"
                                onClick={() => scrollProjects('left')}
                                className={`flex h-10 w-10 items-center justify-center rounded-full border transition-colors ${
                                    darkMode
                                        ? 'border-slate-700 text-slate-200 hover:bg-slate-800'
                                        : 'border-slate-200 text-slate-700 hover:bg-white'
                                }`}
                            >
                                <ChevronLeft size={18} />
                            </button>
                            <button
                                type="button"
                                aria-label="Scroll projects right"
                                onClick={() => scrollProjects('right')}
                                className={`flex h-10 w-10 items-center justify-center rounded-full border transition-colors ${
                                    darkMode
                                        ? 'border-slate-700 text-slate-200 hover:bg-slate-800'
                                        : 'border-slate-200 text-slate-700 hover:bg-white'
                                }`}
                            >
                                <ChevronRight size={18} />
                            </button>
                        </div>
                        <Link
                            href="/projects"
                            className="group flex items-center gap-1 text-sm font-bold text-indigo-600 hover:text-indigo-700"
                        >
                            View all
                            <ArrowUpRight
                                size={16}
                                className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                            />
                        </Link>
                    </div>
                </div>

                <div
                    ref={projectsScrollerRef}
                    className="scrollbar-hide grid snap-x snap-mandatory auto-cols-[85%] grid-flow-col grid-rows-1 items-stretch gap-6 overflow-x-auto pb-4 sm:auto-cols-[45%] lg:auto-cols-[calc(25%-1.125rem)]"
                >
                    {projects.map((project) => {
                        const tech = Array.isArray(project.tech)
                            ? project.tech
                            : [];

                        return (
                            <div
                                key={project.id}
                                className={`fade-up group flex h-full snap-start flex-col overflow-hidden rounded-3xl border shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${bgCard} ${
                                    darkMode
                                        ? 'border-slate-700/80'
                                        : 'border-slate-200/80'
                                }`}
                            >
                                <div className="relative h-48 shrink-0 overflow-hidden">
                                    <div
                                        data-project-id={project.id}
                                        ref={setScrollRef}
                                        className="scrollbar-hide absolute inset-0 flex snap-x snap-mandatory overflow-x-auto"
                                    >
                                        {project.images.map((src, i) => (
                                            <img
                                                key={i}
                                                src={src}
                                                alt=""
                                                className="h-full w-full shrink-0 snap-center object-cover"
                                            />
                                        ))}
                                    </div>

                                    {project.images.length > 1 && (
                                        <>
                                            <button
                                                type="button"
                                                aria-label={`Previous image for ${project.title}`}
                                                onClick={() =>
                                                    scrollProject(
                                                        project.id,
                                                        'left',
                                                    )
                                                }
                                                className={`${arrowButtonClass} left-3`}
                                            >
                                                <ChevronLeft size={16} />
                                            </button>
                                            <button
                                                type="button"
                                                aria-label={`Next image for ${project.title}`}
                                                onClick={() =>
                                                    scrollProject(
                                                        project.id,
                                                        'right',
                                                    )
                                                }
                                                className={`${arrowButtonClass} right-3`}
                                            >
                                                <ChevronRight size={16} />
                                            </button>
                                            <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5">
                                                {project.images.map((_, i) => (
                                                    <button
                                                        key={i}
                                                        type="button"
                                                        aria-label={`Show image ${i + 1}`}
                                                        onClick={() =>
                                                            scrollToImage(
                                                                project.id,
                                                                i,
                                                            )
                                                        }
                                                        className="h-1.5 w-1.5 rounded-full bg-white/80"
                                                    />
                                                ))}
                                            </div>
                                        </>
                                    )}
                                </div>

                                <div className="flex flex-1 flex-col p-5">
                                    <div className="mb-2 flex items-start justify-between gap-3">
                                        <h3
                                            className={`text-lg font-black ${textPrimary}`}
                                        >
                                            {project.title}
                                        </h3>
                                        <Link
                                            href={project.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            title="View Project"
                                            aria-label={`View ${project.title} project`}
                                            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-indigo-600 text-white transition-colors hover:bg-indigo-500"
                                        >
                                            <ExternalLink size={14} />
                                        </Link>
                                    </div>

                                    <p
                                        className={`text-sm leading-relaxed ${textMuted} ${
                                            isExpanded(project.id)
                                                ? ''
                                                : 'line-clamp-3'
                                        }`}
                                    >
                                        {isExpanded(project.id)
                                            ? project.full_description
                                            : project.short_description}
                                    </p>

                                    {tech.length > 0 && (
                                        <div className="mt-4 flex flex-wrap gap-1.5">
                                            {tech.slice(0, 4).map((item) => (
                                                <span
                                                    key={item}
                                                    className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${
                                                        darkMode
                                                            ? 'bg-slate-700 text-slate-200'
                                                            : 'bg-slate-100 text-slate-700'
                                                    }`}
                                                >
                                                    {item}
                                                </span>
                                            ))}
                                            {tech.length > 4 && (
                                                <span
                                                    className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${
                                                        darkMode
                                                            ? 'bg-slate-700 text-slate-200'
                                                            : 'bg-slate-100 text-slate-700'
                                                    }`}
                                                >
                                                    +{tech.length - 4}
                                                </span>
                                            )}
                                        </div>
                                    )}

                                    <button
                                        type="button"
                                        onClick={() =>
                                            toggleExpanded(project.id)
                                        }
                                        className="mt-auto pt-4 text-left text-xs font-bold text-indigo-600"
                                    >
                                        {isExpanded(project.id)
                                            ? 'Read less'
                                            : 'Read more'}
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
