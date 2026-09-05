import { ArrowUpRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { useRef } from 'react';

export interface TechTalk {
    id: number;
    number: string;
    slug: string;
    category: string;
    categoryColor: string; // hex, e.g. "#6366f1", comes straight from the DB
    title: string;
    excerpt: string;
    date: string;
    readTime: string;
}

interface TechTalkSectionProps {
    darkMode: boolean;
    textPrimary: string;
    textMuted: string;
    bg: string;
    bgWhite: string;
    bgCard: string;
    borderColor: string;
    handleCursorHover: (hover: boolean) => void;
    techTalks: TechTalk[] | null;
}

// Turns a hex color into a light tint background + solid text color for the category badge,
// so we don't need per-category tailwind classes baked into the frontend anymore.
function badgeStyle(hex: string, darkMode: boolean) {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);

    return {
        backgroundColor: darkMode
            ? `rgba(${r}, ${g}, ${b}, 0.18)`
            : `rgba(${r}, ${g}, ${b}, 0.12)`,
        color: darkMode ? `rgb(${r}, ${g}, ${b})` : hex,
    };
}

export default function TechTalkSection({
    darkMode,
    textPrimary,
    textMuted,
    bg,
    bgWhite,
    handleCursorHover,
    borderColor,
    techTalks,
}: TechTalkSectionProps) {
    const dm = darkMode;
    const scrollerRef = useRef<HTMLDivElement>(null);
    const talks = techTalks ?? [];

    const scrollByAmount = (direction: 'left' | 'right') => {
        const el = scrollerRef.current;

        if (!el) {
            return;
        }

        const amount = el.clientWidth * 0.8;
        el.scrollBy({
            left: direction === 'left' ? -amount : amount,
            behavior: 'smooth',
        });
    };

    return (
        <section
            id="blog"
            className={`px-6 py-24 lg:px-8 ${bgWhite} transition-colors duration-500`}
        >
            <div className="mx-auto max-w-7xl">
                <div className="fade-up mb-16 flex flex-col items-start justify-between md:flex-row md:items-end">
                    <div>
                        <span className="text-xs font-bold tracking-[0.2em] text-indigo-600 uppercase">
                            Insights & Learning
                        </span>
                        <h2
                            className={`mt-3 text-5xl font-black ${textPrimary}`}
                        >
                            Tech <span className="text-indigo-600">Talks</span>
                        </h2>
                    </div>

                    <div className="mt-4 flex items-center gap-4 md:mt-0">
                        <a
                            href="#"
                            className="flex items-center gap-1 text-sm font-bold text-indigo-600"
                        >
                            Read all <ArrowUpRight size={16} />
                        </a>
                        <div className="hidden items-center gap-2 sm:flex">
                            <button
                                type="button"
                                aria-label="Scroll left"
                                onClick={() => scrollByAmount('left')}
                                onMouseEnter={() => handleCursorHover(true)}
                                onMouseLeave={() => handleCursorHover(false)}
                                className={`rounded-full border p-2 transition-colors ${borderColor} ${dm ? 'hover:bg-slate-800' : 'hover:bg-slate-100'}`}
                            >
                                <ChevronLeft
                                    size={18}
                                    className={textPrimary}
                                />
                            </button>
                            <button
                                type="button"
                                aria-label="Scroll right"
                                onClick={() => scrollByAmount('right')}
                                onMouseEnter={() => handleCursorHover(true)}
                                onMouseLeave={() => handleCursorHover(false)}
                                className={`rounded-full border p-2 transition-colors ${borderColor} ${dm ? 'hover:bg-slate-800' : 'hover:bg-slate-100'}`}
                            >
                                <ChevronRight
                                    size={18}
                                    className={textPrimary}
                                />
                            </button>
                        </div>
                    </div>
                </div>

                {talks.length === 0 && (
                    <p className={`${textMuted} text-sm`}>
                        No tech talks published yet.
                    </p>
                )}

                {talks.length > 0 && (
                    <div
                        ref={scrollerRef}
                        className="scrollbar-hide grid snap-x snap-mandatory auto-cols-[85%] grid-flow-col grid-rows-2 gap-6 overflow-x-auto pb-4 sm:auto-cols-[45%] lg:auto-cols-[calc(25%-1.125rem)]"
                    >
                        {talks.map((talk, i) => (
                            <a
                                key={talk.id}
                                href={`/tech-talk-details/${talk.slug}`}
                                onMouseEnter={() => handleCursorHover(true)}
                                onMouseLeave={() => handleCursorHover(false)}
                                className={`fade-up group ${bg} snap-start rounded-3xl border p-8 ${borderColor} flex flex-col transition-all duration-300 hover:-translate-y-1 hover:border-indigo-200 hover:shadow-lg`}
                                style={{ animationDelay: `${i * 60}ms` }}
                            >
                                <div className="mb-6 flex items-start justify-between">
                                    <span
                                        className={`text-5xl font-black ${dm ? 'text-slate-700' : 'text-slate-200'} transition-colors group-hover:text-indigo-200`}
                                    >
                                        {talk.number}
                                    </span>
                                    <span
                                        className="rounded-full px-3 py-1 text-xs font-bold"
                                        style={badgeStyle(
                                            talk.categoryColor,
                                            dm,
                                        )}
                                    >
                                        {talk.category}
                                    </span>
                                </div>
                                <h3
                                    className={`text-base font-black ${textPrimary} mb-3 grow transition-colors group-hover:text-indigo-600`}
                                >
                                    {talk.title}
                                </h3>
                                <p
                                    className={`${textMuted} mb-6 grow text-sm leading-relaxed`}
                                >
                                    {talk.excerpt}
                                </p>
                                <div
                                    className={`flex items-center justify-between text-xs ${textMuted} border-t pt-4 font-semibold ${dm ? 'border-slate-700' : 'border-slate-200'}`}
                                >
                                    <span>{talk.date}</span>
                                    <span>{talk.readTime} read</span>
                                </div>
                            </a>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}
