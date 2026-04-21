import {
    ChevronDown,
    Github,
    Linkedin,
    Mail,
    ArrowUpRight,
    MapPin,
    Code2,
} from 'lucide-react';

interface HeroSectionProps {
    darkMode: boolean;
    textPrimary: string;
    textMuted: string;
    bg: string;
    bgCard: string;
    borderColor: string;
    handleCursorHover: (on: boolean) => void;
}

const stats = [
    { value: '3+', label: 'Years Exp.' },
    { value: '20+', label: 'Projects' },
    { value: '15+', label: 'Clients' },
    { value: '99%', label: 'Uptime' },
];

export default function HeroSection({
    darkMode,
    textPrimary,
    textMuted,
    bg,
    bgCard,
    borderColor,
    handleCursorHover,
}: HeroSectionProps) {
    const dm = darkMode;

    return (
        <section
            id="home"
            className="relative flex min-h-screen items-center overflow-hidden px-6 pt-24 pb-16 lg:px-8"
        >
            {/* Subtle background orbs */}
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
                <div
                    className={`absolute -top-32 -right-32 h-[500px] w-[500px] rounded-full ${dm ? 'bg-indigo-900/20' : 'bg-indigo-100/60'} blur-3xl`}
                />
                <div
                    className={`absolute -bottom-32 -left-32 h-[400px] w-[400px] rounded-full ${dm ? 'bg-pink-900/10' : 'bg-pink-100/40'} blur-3xl`}
                />
            </div>

            <div className="relative mx-auto w-full max-w-7xl">
                <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[1fr_auto]">
                    {/* ── Left: Text content ── */}
                    <div className="fade-up max-w-2xl">
                        {/* Eyebrow */}
                        <div className="mb-6 flex items-center gap-3">
                            <span className="h-px w-8 bg-indigo-600" />
                            <span className="text-xs font-bold tracking-[0.2em] text-indigo-600 uppercase">
                                Full Stack Developer
                            </span>
                        </div>

                        {/* Name */}
                        <h1
                            className={`mb-6 text-5xl leading-[0.95] font-black tracking-tight lg:text-6xl xl:text-7xl ${textPrimary}`}
                        >
                            Amit
                            <br />
                            <span className="text-indigo-600">Kumar</span>
                            <br />
                            <span
                                className={
                                    dm ? 'text-slate-600' : 'text-slate-300'
                                }
                            >
                                Dev
                            </span>
                        </h1>

                        {/* Tagline */}
                        <p
                            className={`text-base ${textMuted} mb-8 max-w-md leading-relaxed font-light`}
                        >
                            I craft high-performance web applications with React
                            &amp; Laravel — turning complex problems into
                            elegant, scalable solutions.
                        </p>

                        {/* Badges */}
                        <div className="mb-8 flex flex-wrap gap-2">
                            <span
                                className={`flex items-center gap-2 text-xs ${textMuted} ${bgCard} border ${borderColor} rounded-full px-3 py-1.5`}
                            >
                                <MapPin size={12} className="text-indigo-500" />{' '}
                                Kathmandu, Nepal
                            </span>
                            <span
                                className={`flex items-center gap-2 text-xs ${textMuted} ${bgCard} border ${borderColor} rounded-full px-3 py-1.5`}
                            >
                                <Code2 size={12} className="text-indigo-500" />{' '}
                                React + Laravel
                            </span>
                            <span className="flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-xs text-emerald-600 dark:border-emerald-800 dark:bg-emerald-950/30">
                                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />
                                Available for work
                            </span>
                        </div>

                        {/* CTAs */}
                        <div className="mb-8 flex gap-3">
                            <a
                                href="#contact"
                                onMouseEnter={() => handleCursorHover(true)}
                                onMouseLeave={() => handleCursorHover(false)}
                                className="flex items-center gap-2 rounded-full bg-indigo-600 px-7 py-3.5 text-sm font-bold text-white transition-all hover:bg-indigo-700 hover:shadow-xl hover:shadow-indigo-200"
                            >
                                Let's Talk <ArrowUpRight size={16} />
                            </a>
                            <a
                                href="#projects"
                                onMouseEnter={() => handleCursorHover(true)}
                                onMouseLeave={() => handleCursorHover(false)}
                                className={`${bgCard} border-2 ${dm ? 'border-slate-700 text-slate-200' : 'border-slate-200 text-slate-700'} rounded-full px-7 py-3.5 text-sm font-bold transition-all hover:border-indigo-400`}
                            >
                                View Work
                            </a>
                        </div>

                        {/* Social Icons */}
                        <div className="flex gap-2">
                            {[
                                { icon: Github, label: 'GitHub' },
                                { icon: Linkedin, label: 'LinkedIn' },
                                { icon: Mail, label: 'Email' },
                            ].map(({ icon: Icon, label }) => (
                                <a
                                    key={label}
                                    href="#"
                                    onMouseEnter={() => handleCursorHover(true)}
                                    onMouseLeave={() =>
                                        handleCursorHover(false)
                                    }
                                    title={label}
                                    className={`h-9 w-9 rounded-full ${bgCard} border ${borderColor} ${textMuted} flex items-center justify-center shadow-sm transition-all hover:border-indigo-600 hover:bg-indigo-600 hover:text-white`}
                                >
                                    <Icon size={15} />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* ── Right: Compact Profile Card ── */}
                    <div className="fade-up flex flex-col items-center gap-5 lg:items-end">
                        {/* Profile image — compact circle with ring */}
                        <div className="relative">
                            {/* Rotating ring accent */}
                            <div className="absolute inset-0 animate-[spin_18s_linear_infinite] rounded-full border-2 border-dashed border-indigo-300 dark:border-indigo-700" />
                            {/* Solid inner ring */}
                            <div className="absolute inset-2 rounded-full border border-indigo-500/30" />

                            {/* Avatar container */}
                            <div
                                className={`relative z-10 m-3 h-44 w-44 overflow-hidden rounded-full ring-4 ${dm ? 'ring-indigo-800/60' : 'ring-indigo-100'} shadow-2xl`}
                            >
                                <img
                                    src="images/profileimage.png"
                                    alt="Amit Kumar Dev"
                                    className="h-full w-full object-cover object-top"
                                />
                            </div>

                            {/* Experience badge */}
                            <div className="absolute -top-1 -right-1 z-20 flex h-12 w-12 flex-col items-center justify-center rounded-full bg-indigo-600 text-white shadow-lg shadow-indigo-300/40">
                                <span className="text-sm leading-none font-black">
                                    3+
                                </span>
                                <span className="text-[9px] font-semibold opacity-80">
                                    yrs
                                </span>
                            </div>
                        </div>

                        {/* Stat pills */}
                        <div className="grid grid-cols-2 gap-2">
                            {stats.map((s) => (
                                <div
                                    key={s.label}
                                    className={`${bgCard} border ${borderColor} rounded-xl px-4 py-3 text-center shadow-sm transition-all hover:border-indigo-300 hover:shadow-md`}
                                >
                                    <p className="text-xl leading-none font-black text-indigo-600">
                                        {s.value}
                                    </p>
                                    <p
                                        className={`mt-0.5 text-[11px] ${textMuted} font-medium`}
                                    >
                                        {s.label}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Scroll indicator */}
                <div className="mt-16 flex flex-col items-center gap-2">
                    <span
                        className={`text-[11px] tracking-widest uppercase ${textMuted} font-medium`}
                    >
                        scroll
                    </span>
                    <div
                        className={`relative h-10 w-5 rounded-full border ${dm ? 'border-slate-700' : 'border-slate-300'}`}
                    >
                        <span className="absolute top-1.5 left-1/2 h-1.5 w-1.5 -translate-x-1/2 animate-[scrollDot_1.8s_ease-in-out_infinite] rounded-full bg-indigo-500" />
                    </div>
                </div>
            </div>
        </section>
    );
}
