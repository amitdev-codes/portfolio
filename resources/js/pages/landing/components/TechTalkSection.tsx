import {
    ChevronDown,
    Github,
    Linkedin,
    Mail,
    Download,
    ArrowUpRight,
    MapPin,
    Code2,
    Sun,
    Moon,
} from 'lucide-react';
interface TechTalkSectionProps {
    darkMode: boolean;
    textPrimary: string;
    textMuted: string;
    bg: string;
    bgWhite: string;
    bgCard: string;
    borderColor: string;
    handleCursorHover: (hover: boolean) => void;
}
export default function TechTalkSection({
    darkMode,
    textPrimary,
    textMuted,
    bg,
    bgWhite,
    handleCursorHover,
    borderColor,
}: TechTalkSectionProps) {
    const dm = darkMode;
    const techTalks = [
        {
            id: 1,
            number: '01',
            category: 'Finding',
            categoryColor: dm
                ? 'bg-indigo-900/50 text-indigo-300'
                : 'bg-indigo-100 text-indigo-700',
            title: 'Why Your Laravel Queries Are Slow (And How to Fix Them)',
            excerpt:
                "Discovered a bottleneck that dropped response times from 2s to 80ms. Here's the exact technique.",
            date: 'Mar 2025',
            readTime: '5 min',
        },
        {
            id: 2,
            number: '02',
            category: 'Tips',
            categoryColor: dm
                ? 'bg-pink-900/50 text-pink-300'
                : 'bg-pink-100 text-pink-700',
            title: 'React Hooks: Building Custom Hooks for Production',
            excerpt:
                'A practical guide to reusable custom hooks that make your React code cleaner and more maintainable.',
            date: 'Feb 2025',
            readTime: '8 min',
        },
        {
            id: 3,
            number: '03',
            category: 'Deep Dive',
            categoryColor: dm
                ? 'bg-purple-900/50 text-purple-300'
                : 'bg-purple-100 text-purple-700',
            title: 'Understanding Laravel Queues in Production',
            excerpt:
                'Complete guide to job chaining, batching, rate limiting, and failure handling in Laravel.',
            date: 'Jan 2025',
            readTime: '12 min',
        },
    ];

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
                    <a
                        href="#"
                        className="mt-4 flex items-center gap-1 text-sm font-bold text-indigo-600 md:mt-0"
                    >
                        Read all <ArrowUpRight size={16} />
                    </a>
                </div>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                    {techTalks.map((talk, i) => (
                        <a
                            key={talk.id}
                            href="#"
                            onMouseEnter={() => handleCursorHover(true)}
                            onMouseLeave={() => handleCursorHover(false)}
                            className={`fade-up group ${bg} rounded-3xl border p-8 ${borderColor} flex flex-col transition-all duration-300 hover:-translate-y-1 hover:border-indigo-200 hover:shadow-lg`}
                            style={{ animationDelay: `${i * 100}ms` }}
                        >
                            <div className="mb-6 flex items-start justify-between">
                                <span
                                    className={`text-5xl font-black ${dm ? 'text-slate-700' : 'text-slate-200'} transition-colors group-hover:text-indigo-200`}
                                >
                                    {talk.number}
                                </span>
                                <span
                                    className={`rounded-full px-3 py-1 text-xs font-bold ${talk.categoryColor}`}
                                >
                                    {talk.category}
                                </span>
                            </div>
                            <h3
                                className={`text-base font-black ${textPrimary} mb-3 flex-grow transition-colors group-hover:text-indigo-600`}
                            >
                                {talk.title}
                            </h3>
                            <p
                                className={`${textMuted} mb-6 flex-grow text-sm leading-relaxed`}
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
            </div>
        </section>
    );
}
