import { Link } from '@inertiajs/react';
import {
    Mail,
    Phone,
    ArrowUpRight,
    MapPin,
    Code2,
    Download,
    Github,
    Linkedin,
} from 'lucide-react';

interface HeroStat {
    value: string;
    label: string;
}

interface HeroData {
    name: { first: string; middle?: string | null; last?: string | null };
    role_title?: string | null;
    tagline?: string | null;
    location?: string | null;
    tech_stack?: string | null;
    is_available: boolean;
    availability_text?: string | null;
    stats: HeroStat[];
    skills?: string[];
    profile_image?: string | null;
    links: {
        github?: string | null;
        linkedin?: string | null;
        email?: string | null;
        phone?: string | null;
        cv?: string | null;
        cv_type?: string | null;
    };
}

interface HeroSectionProps {
    hero: HeroData;
    darkMode: boolean;
    textPrimary: string;
    textMuted: string;
    bg: string;
    bgCard: string;
    borderColor: string;
    handleCursorHover: (on: boolean) => void;
}

export default function HeroSection({
                                        hero,
                                        darkMode,
                                        textPrimary,
                                        textMuted,
                                        bgCard,
                                        borderColor,
                                        handleCursorHover,
                                    }: HeroSectionProps) {
    if (!hero) {
        return null;
    } // guard #1 — bail out safely if hero itself is missing

    const dm = darkMode;
    const {
        name,
        role_title,
        tagline,
        location,
        tech_stack,
        is_available,
        availability_text,
        stats = [],       // guard #2 — default stats
        skills = [],
        profile_image,
        links = {},        // guard #3 — default links to empty object
    } = hero;

    const socialLinks = [
        { icon: Github, label: 'GitHub', href: links?.github },
        { icon: Linkedin, label: 'LinkedIn', href: links?.linkedin },
        {
            icon: Mail,
            label: 'Email',
            href: links?.email ? `mailto:${links.email}` : undefined,
        },
    ].filter((s) => s.href);

    const yearsExp = stats.find((s) =>
        s.label.toLowerCase().includes('year'),
    )?.value;

    const cvLabel = links.cv_type
        ? `Download CV (.${links.cv_type})`
        : 'Download CV';
    
    return (
        <section
            id="home"
            className="relative flex min-h-screen items-center overflow-hidden px-6 pt-24 pb-16 lg:px-8"
        >
            {/* Subtle background orbs */}
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
                <div
                    className={`absolute -top-32 -right-32 h-125 w-125 rounded-full ${dm ? 'bg-indigo-900/20' : 'bg-indigo-100/60'} blur-3xl`}
                />
                <div
                    className={`absolute -bottom-32 -left-32 h-100 w-100 rounded-full ${dm ? 'bg-pink-900/10' : 'bg-pink-100/40'} blur-3xl`}
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
                                {role_title || 'Full Stack Developer'}
                            </span>
                        </div>

                        {/* Name */}
                        <h1
                            className={`mb-6 text-5xl leading-[0.95] font-black tracking-tight lg:text-6xl xl:text-7xl ${textPrimary}`}
                        >
                            {name.first}
                            <br />
                            <span className="text-indigo-600">
                                {name.middle || name.last}
                            </span>
                            {name.middle && name.last && (
                                <>
                                    <br />
                                    <span
                                        className={
                                            dm
                                                ? 'text-slate-600'
                                                : 'text-slate-300'
                                        }
                                    >
                                        {name.last}
                                    </span>
                                </>
                            )}
                        </h1>

                        {/* Tagline */}
                        <p
                            className={`text-base ${textMuted} mb-8 max-w-md leading-relaxed font-light`}
                        >
                            {tagline}
                        </p>

                        {/* Badges */}
                        <div className="mb-6 flex flex-wrap gap-2">
                            {location && (
                                <span
                                    className={`flex items-center gap-2 text-xs ${textMuted} ${bgCard} border ${borderColor} rounded-full px-3 py-1.5`}
                                >
                                    <MapPin
                                        size={12}
                                        className="text-indigo-500"
                                    />{' '}
                                    {location}
                                </span>
                            )}
                            {tech_stack && (
                                <span
                                    className={`flex items-center gap-2 text-xs ${textMuted} ${bgCard} border ${borderColor} rounded-full px-3 py-1.5`}
                                >
                                    <Code2
                                        size={12}
                                        className="text-indigo-500"
                                    />{' '}
                                    {tech_stack}
                                </span>
                            )}
                            {is_available && (
                                <span className="flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-xs text-emerald-600">
                                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />
                                    {availability_text}
                                </span>
                            )}
                        </div>

                        {/* Skills tag row — fills left-side space, shown only if provided */}
                        {skills.length > 0 && (
                            <div className="mb-8 flex flex-wrap gap-1.5">
                                {skills.map((skill) => (
                                    <span
                                        key={skill}
                                        className={`text-[11px] font-medium ${textMuted} rounded-md border ${borderColor} px-2 py-1`}
                                    >
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        )}

                        {/* CTAs */}
                        <div className="mb-8 flex flex-wrap gap-3">
                            <Link
                                href="#contact"
                                onMouseEnter={() => handleCursorHover(true)}
                                onMouseLeave={() => handleCursorHover(false)}
                                className="flex items-center gap-2 rounded-full bg-indigo-600 px-7 py-3.5 text-sm font-bold text-white transition-all hover:bg-indigo-700 hover:shadow-xl hover:shadow-indigo-200"
                            >
                                Let's Talk <ArrowUpRight size={16} />
                            </Link>
                            <Link
                                href="#projects"
                                onMouseEnter={() => handleCursorHover(true)}
                                onMouseLeave={() => handleCursorHover(false)}
                                className={`${bgCard} border-2 ${dm ? 'border-slate-700 text-slate-200' : 'border-slate-200 text-slate-700'} rounded-full px-7 py-3.5 text-sm font-bold transition-all hover:border-indigo-400`}
                            >
                                View Work
                            </Link>
                            {links.cv && (
                                <a
                                    href={links.cv}
                                    target="_blank"
                                    rel="noreferrer"
                                    download
                                    onMouseEnter={() => handleCursorHover(true)}
                                    onMouseLeave={() =>
                                        handleCursorHover(false)
                                    }
                                    className={`flex items-center gap-2 rounded-full border-2 border-dashed ${dm ? 'border-indigo-700 text-indigo-300' : 'border-indigo-300 text-indigo-600'} px-7 py-3.5 text-sm font-bold transition-all hover:border-indigo-500`}
                                >
                                    <Download size={16} /> {cvLabel}
                                </a>
                            )}
                        </div>

                        {/* Social Icons */}
                        <div className="flex gap-2">
                            {socialLinks
                                .filter((link): link is typeof link & { href: string } => !!link.href)
                                .map(({ icon: Icon, label, href }) => (
                                    <Link
                                        key={label}
                                        href={href}           // Now guaranteed to be string
                                        target={label !== 'Email' ? '_blank' : undefined}
                                        rel="noreferrer"
                                        onMouseEnter={() => handleCursorHover(true)}
                                        onMouseLeave={() => handleCursorHover(false)}
                                        title={label}
                                        className={`h-9 w-9 rounded-full ${bgCard} border ${borderColor} ${textMuted} flex items-center justify-center shadow-sm transition-all hover:border-indigo-600 hover:bg-indigo-600 hover:text-white`}
                                    >
                                        <Icon size={15} />
                                    </Link>
                                ))}
                        </div>
                    </div>

                    {/* ── Right: Compact Profile Card ── */}
                    <div className="fade-up flex flex-col items-center gap-5 lg:items-end">
                        {/* Profile image — compact circle with ring */}
                        <div className="relative">
                            {/* Rotating ring accent */}
                            <div className="absolute inset-0 animate-[spin_18s_linear_infinite] rounded-full border-2 border-dashed border-indigo-300" />
                            {/* Solid inner ring */}
                            <div className="absolute inset-2 rounded-full border border-indigo-500/30" />

                            {/* Avatar container */}
                            <div
                                className={`relative z-10 m-3 h-44 w-44 overflow-hidden rounded-full ring-4 ${dm ? 'ring-indigo-800/60' : 'ring-indigo-100'} shadow-2xl`}
                            >
                                <img
                                    src={
                                        profile_image ||
                                        '/images/profileimage.png'
                                    }
                                    alt={`${name.first} ${name.last || ''}`}
                                    className="h-full w-full object-cover object-top"
                                />
                            </div>

                            {/* Experience badge */}
                            {yearsExp && (
                                <div className="absolute -top-1 -right-1 z-20 flex h-12 w-12 flex-col items-center justify-center rounded-full bg-indigo-600 text-white shadow-lg shadow-indigo-300/40">
                                    <span className="text-sm leading-none font-black">
                                        {yearsExp}
                                    </span>
                                    <span className="text-[9px] font-semibold opacity-80">
                                        yrs
                                    </span>
                                </div>
                            )}
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

                        {/* Quick Contact card — fills right-side space */}
                        {(links.email || links.phone) && (
                            <div
                                className={`${bgCard} border ${borderColor} w-full max-w-55 rounded-xl px-4 py-3 shadow-sm`}
                            >
                                <p
                                    className={`mb-2 text-[10px] font-bold tracking-widest uppercase ${textMuted}`}
                                >
                                    Quick Contact
                                </p>
                                <div className="space-y-1.5">
                                    {links.email && (
                                        <a
                                            href={`mailto:${links.email}`}
                                            className={`flex items-center gap-2 text-xs ${textPrimary} truncate transition-colors hover:text-indigo-600`}
                                        >
                                            <Mail
                                                size={12}
                                                className="shrink-0 text-indigo-500"
                                            />
                                            <span className="truncate">
                                                {links.email}
                                            </span>
                                        </a>
                                    )}
                                    {links.phone && (
                                        <a
                                            href={`tel:${links.phone}`}
                                            className={`flex items-center gap-2 text-xs ${textPrimary} transition-colors hover:text-indigo-600`}
                                        >
                                            <Phone
                                                size={12}
                                                className="shrink-0 text-indigo-500"
                                            />
                                            {links.phone}
                                        </a>
                                    )}
                                </div>
                            </div>
                        )}
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
