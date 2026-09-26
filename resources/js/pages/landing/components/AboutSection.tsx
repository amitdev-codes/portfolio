interface AboutHighlight {
    icon: string;
    title: string;
    desc: string;
}

interface AboutExperience {
    year: string;
    role: string;
    company: string;
    desc: string;
}

interface AboutData {
    section_label: string;
    heading_main: string;
    heading_highlight: string;
    highlights: AboutHighlight[];
    experience_heading: string;
    experiences: AboutExperience[];
    tech_stack_label: string;
    tech_stack: string[];
}

interface AboutSectionProps {
    about: AboutData | null;
    darkMode: boolean;
    textPrimary: string;
    textMuted: string;
    bg: string;
    bgCard: string;
    borderColor: string;
}

export default function AboutSection({
    about,
    darkMode,
    textPrimary,
    textMuted,
    bg,
    bgCard,
    borderColor,
}: AboutSectionProps) {
    const dm = darkMode;

    if (!about) return null; // or a skeleton/fallback

    const {
        section_label,
        heading_main,
        heading_highlight,
        highlights,
        experience_heading,
        experiences,
        tech_stack_label,
        tech_stack,
    } = about;

    return (
        <section
            id="about"
            className={`px-6 py-24 lg:px-8 ${bgCard} transition-colors duration-500`}
        >
            <div className="mx-auto max-w-7xl">
                <div className="fade-up mb-12">
                    <span className="text-xs font-bold tracking-[0.2em] text-indigo-600 uppercase">
                        {section_label}
                    </span>
                </div>

                <div className="grid grid-cols-1 items-stretch gap-8 lg:grid-cols-2 lg:gap-10">
                    <div
                        className={`fade-up flex h-full flex-col rounded-3xl border p-6 sm:p-8 ${bg} ${borderColor}`}
                    >
                        <h2
                            className={`mb-6 flex items-center gap-3 text-3xl font-black sm:text-4xl ${textPrimary}`}
                        >
                            <span className="h-px w-6 shrink-0 bg-indigo-600"></span>
                            <span>
                                {heading_main}{' '}
                                <span className="text-indigo-600">
                                    {heading_highlight}
                                </span>
                            </span>
                        </h2>
                        <div className="flex flex-1 flex-col justify-between gap-4">
                            {highlights.map((c, i) => (
                                <div
                                    key={i}
                                    className={`flex flex-1 items-center gap-4 rounded-2xl border px-4 py-4 transition-all group sm:px-5 ${
                                        dm
                                            ? 'border-slate-700/80 hover:border-indigo-500/40 hover:bg-indigo-500/10'
                                            : 'border-slate-200/80 bg-white hover:border-indigo-200 hover:bg-indigo-50'
                                    }`}
                                >
                                    <span
                                        className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl text-2xl ${
                                            dm
                                                ? 'bg-indigo-500/15'
                                                : 'bg-indigo-50'
                                        }`}
                                    >
                                        {c.icon}
                                    </span>
                                    <div>
                                        <h4
                                            className={`font-bold ${textPrimary} mb-1 transition-colors group-hover:text-indigo-600`}
                                        >
                                            {c.title}
                                        </h4>
                                        <p
                                            className={`${textMuted} text-sm leading-relaxed`}
                                        >
                                            {c.desc}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div
                        className={`fade-up flex h-full flex-col rounded-3xl border p-6 sm:p-8 ${bg} ${borderColor}`}
                    >
                        <h2
                            className={`mb-6 flex items-center gap-3 text-3xl font-black sm:text-4xl ${textPrimary}`}
                        >
                            <span className="h-px w-6 shrink-0 bg-indigo-600"></span>
                            {experience_heading}
                        </h2>
                        <div className="relative flex flex-1 flex-col">
                            <div
                                className={`absolute top-0 bottom-0 left-4 w-px ${dm ? 'bg-slate-700' : 'bg-slate-200'}`}
                            ></div>
                            <div className="flex flex-1 flex-col justify-between gap-8">
                                {experiences.map((exp, i) => (
                                    <div key={i} className="relative pl-12">
                                        <div
                                            className={`absolute top-1.5 left-0 flex h-8 w-8 items-center justify-center rounded-full border-2 border-indigo-600 shadow-md ${bgCard}`}
                                        >
                                            <div className="h-2.5 w-2.5 rounded-full bg-indigo-600"></div>
                                        </div>
                                        <span className="text-xs font-bold tracking-widest text-indigo-500 uppercase">
                                            {exp.year}
                                        </span>
                                        <h4
                                            className={`mt-1 text-lg font-black ${textPrimary}`}
                                        >
                                            {exp.role}
                                        </h4>
                                        <p className="mb-2 text-sm font-semibold text-indigo-600">
                                            {exp.company}
                                        </p>
                                        <p
                                            className={`text-sm leading-relaxed ${textMuted}`}
                                        >
                                            {exp.desc}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div
                            className={`mt-8 border-t pt-8 ${dm ? 'border-slate-700' : 'border-slate-200'}`}
                        >
                            <p
                                className={`mb-4 text-xs font-bold tracking-widest uppercase ${textMuted}`}
                            >
                                {tech_stack_label}
                            </p>
                            <div className="flex flex-wrap gap-2">
                                {tech_stack.map((t) => (
                                    <span
                                        key={t}
                                        className={`rounded-full px-3 py-1.5 text-xs font-semibold ${
                                            dm
                                                ? 'bg-slate-700 text-slate-200'
                                                : 'bg-slate-900 text-white'
                                        }`}
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
