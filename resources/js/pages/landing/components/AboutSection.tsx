interface AboutSectionProps {
    darkMode: boolean;
    textPrimary: string;
    textMuted: string;
    bg: string;
    bgCard: string;
    borderColor: string;
}
const experiences = [
    {
        year: '2024–Now',
        role: 'Senior Full Stack Developer',
        company: 'TechCorp Nepal',
        desc: 'Led a team of 4 developers building SaaS products used by 50k+ users.',
    },
    {
        year: '2022–2024',
        role: 'Full Stack Developer',
        company: 'Digital Agency',
        desc: 'Built 10+ client projects across e-commerce, healthcare, and fintech.',
    },
    {
        year: '2021–2022',
        role: 'Junior Developer',
        company: 'StartupXYZ',
        desc: 'Developed internal tools and APIs in Laravel + Vue.js stack.',
    },
];

export default function AboutSection({
    darkMode,
    textPrimary,
    textMuted,
    bg,
    bgCard,
    borderColor,
}: AboutSectionProps) {
    const dm = darkMode;

    return (
        <section
            id="about"
            className={`px-6 py-24 lg:px-8 ${bgCard} transition-colors duration-500`}
        >
            <div className="mx-auto max-w-7xl">
                {/* Header */}
                <div className="fade-up mb-16">
                    <span className="text-xs font-bold tracking-[0.2em] text-indigo-600 uppercase">
                        About Me
                    </span>
                    <h2 className={`mt-3 text-5xl font-black ${textPrimary}`}>
                        What I <span className="text-indigo-600">Bring</span>
                    </h2>
                </div>

                <div className="grid grid-cols-1 items-start gap-16 lg:grid-cols-2">
                    <div className="fade-up space-y-6">
                        {[
                            {
                                icon: '🎯',
                                title: 'Strategic Thinking',
                                desc: 'I approach projects with clear goals, designing solutions that deliver real business value.',
                            },
                            {
                                icon: '⚡',
                                title: 'Full Stack Expertise',
                                desc: 'From DB architecture to pixel-perfect UI — comfortable across the entire stack.',
                            },
                            {
                                icon: '🛡️',
                                title: 'Code Quality First',
                                desc: 'Clean, maintainable, well-documented code that scales without pain.',
                            },
                        ].map((c, i) => (
                            <div
                                key={i}
                                className={`flex gap-5 rounded-2xl p-6 ${bg} border hover:bg-indigo-50 ${borderColor} group transition-all hover:border-indigo-200`}
                            >
                                <span className="mt-1 text-3xl">{c.icon}</span>
                                <div>
                                    <h3
                                        className={`font-bold ${textPrimary} mb-1 transition-colors group-hover:text-indigo-600`}
                                    >
                                        {c.title}
                                    </h3>
                                    <p
                                        className={`${textMuted} text-sm leading-relaxed`}
                                    >
                                        {c.desc}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="fade-up">
                        <h3
                            className={`text-xl font-black ${textPrimary} mb-8 flex items-center gap-3`}
                        >
                            <span className="h-px w-6 bg-indigo-600"></span>{' '}
                            Years of Experience
                        </h3>
                        <div className="relative">
                            <div
                                className={`absolute top-0 bottom-0 left-4 w-px ${dm ? 'bg-slate-700' : 'bg-slate-200'}`}
                            ></div>
                            <div className="space-y-8">
                                {experiences.map((exp, i) => (
                                    <div key={i} className="relative pl-12">
                                        <div
                                            className={`absolute top-1.5 left-0 h-8 w-8 rounded-full ${bgCard} flex items-center justify-center border-2 border-indigo-600 shadow-md`}
                                        >
                                            <div className="h-2.5 w-2.5 rounded-full bg-indigo-600"></div>
                                        </div>
                                        <span className="text-xs font-bold tracking-widest text-indigo-500 uppercase">
                                            {exp.year}
                                        </span>
                                        <h4
                                            className={`font-black ${textPrimary} mt-1 text-lg`}
                                        >
                                            {exp.role}
                                        </h4>
                                        <p className="mb-2 text-sm font-semibold text-indigo-600">
                                            {exp.company}
                                        </p>
                                        <p
                                            className={`text-sm ${textMuted} leading-relaxed`}
                                        >
                                            {exp.desc}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div
                            className={`mt-10 border-t pt-10 ${dm ? 'border-slate-700' : 'border-slate-100'}`}
                        >
                            <p
                                className={`text-xs font-bold ${textMuted} mb-4 tracking-widest uppercase`}
                            >
                                Tech Stack
                            </p>
                            <div className="flex flex-wrap gap-2">
                                {[
                                    'React',
                                    'Laravel',
                                    'TypeScript',
                                    'PostgreSQL',
                                    'Redis',
                                    'Docker',
                                    'AWS',
                                    'Tailwind',
                                    'Node.js',
                                    'Vue.js',
                                ].map((t) => (
                                    <span
                                        key={t}
                                        className={`text-xs font-semibold ${dm ? 'bg-slate-700 text-slate-200' : 'bg-slate-900 text-white'} rounded-full px-3 py-1.5`}
                                    >
                                        {t}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
