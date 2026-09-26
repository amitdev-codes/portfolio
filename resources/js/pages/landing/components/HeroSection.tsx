import { Link } from '@inertiajs/react';
import {
    ArrowUpRight,
    Download,
    Github,
    Linkedin,
    Mail,
    MapPin,
    Phone,
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

const HERO_BG =
    'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=2000&q=80';

const FALLBACK_SKILLS = [
    'Laravel',
    'React',
    'PHP',
    'TypeScript',
    'MySQL',
    'Redis',
    'Vue.js',
    'Tailwind',
    'Docker',
    'Inertia.js',
];

export default function HeroSection({
    hero,
    darkMode,
    handleCursorHover,
}: HeroSectionProps) {
    if (!hero) {
        return null;
    }

    const dm = darkMode;
    const {
        name,
        role_title,
        tagline,
        location,
        tech_stack,
        is_available,
        availability_text,
        stats = [],
        skills = [],
        profile_image,
        links = {},
    } = hero;

    const displayName = [name.first, name.middle, name.last]
        .filter(Boolean)
        .join(' ');

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

    const marqueeSkills =
        skills.length > 0
            ? skills
            : tech_stack
              ? String(tech_stack)
                    .split(/[·,+/|]/)
                    .map((s) => s.trim())
                    .filter(Boolean)
              : FALLBACK_SKILLS;

    const marqueeItems = [...marqueeSkills, ...marqueeSkills, ...marqueeSkills];

    const cvLabel = links.cv_type
        ? `Download CV (.${links.cv_type})`
        : 'Download CV';

    return (
        <section
            id="home"
            className={`relative flex min-h-screen flex-col overflow-hidden transition-colors duration-500 ${
                dm ? 'hero-theme-dark' : 'hero-theme-light'
            }`}
        >
            <div className="absolute inset-0">
                <img
                    src={HERO_BG}
                    alt=""
                    className={`h-full w-full object-cover ${
                        dm ? '' : 'hero-photo-light'
                    }`}
                />
                {dm ? (
                    <>
                        <div className="absolute inset-0 bg-[#0f0f13]/88" />
                        <div className="absolute inset-0 bg-gradient-to-r from-[#0c1222]/95 via-[#0c1222]/72 to-[#0c1222]/40" />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0c1222]/92 via-transparent to-[#0c1222]/35" />
                    </>
                ) : (
                    <div className="hero-scrim-light absolute inset-0" />
                )}
            </div>

            <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-1 flex-col justify-center px-6 pt-24 pb-10 lg:px-8">
                <div className="grid items-center gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-12">
                    <div className="hero-enter-1 max-w-xl">
                        <div className="mb-5 flex flex-wrap items-center gap-3">
                            {is_available && (
                                <span
                                    className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold ${
                                        dm
                                            ? 'border-emerald-400/30 bg-emerald-500/15 text-emerald-300'
                                            : 'border-emerald-200 bg-emerald-50 text-emerald-700'
                                    }`}
                                >
                                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />
                                    {availability_text || 'Available for work'}
                                </span>
                            )}
                            {location && (
                                <span
                                    className={`inline-flex items-center gap-1.5 text-xs font-medium ${
                                        dm ? 'text-white/65' : 'text-slate-500'
                                    }`}
                                >
                                    <MapPin
                                        size={12}
                                        className={dm ? 'text-indigo-300' : 'text-indigo-600'}
                                    />
                                    {location}
                                </span>
                            )}
                        </div>

                        <p
                            className={`mb-3 text-sm font-semibold tracking-[0.18em] uppercase ${
                                dm ? 'text-indigo-300' : 'text-indigo-600'
                            }`}
                        >
                            {role_title || 'Full Stack Developer'}
                        </p>

                        <h1
                            className={`mb-5 text-5xl leading-[0.95] font-black tracking-tight sm:text-6xl lg:text-7xl ${
                                dm ? 'text-white' : 'text-slate-900'
                            }`}
                        >
                            {name.first}
                            {(name.middle || name.last) && (
                                <>
                                    <br />
                                    <span
                                        className={
                                            dm ? 'text-indigo-300' : 'text-indigo-600'
                                        }
                                    >
                                        {[name.middle, name.last]
                                            .filter(Boolean)
                                            .join(' ')}
                                    </span>
                                </>
                            )}
                        </h1>

                        <p
                            className={`mb-8 max-w-lg text-base leading-relaxed sm:text-lg ${
                                dm
                                    ? 'text-white/75'
                                    : 'font-medium text-slate-950'
                            }`}
                        >
                            {tagline}
                        </p>

                        <div className="mb-8 flex flex-wrap gap-3">
                            <Link
                                href="#contact"
                                onMouseEnter={() => handleCursorHover(true)}
                                onMouseLeave={() => handleCursorHover(false)}
                                className="inline-flex items-center gap-2 rounded-full bg-indigo-600 px-7 py-3.5 text-sm font-bold text-white transition-all hover:bg-indigo-500 hover:shadow-lg hover:shadow-indigo-500/25"
                            >
                                Let's Talk <ArrowUpRight size={16} />
                            </Link>
                            <Link
                                href="#projects"
                                onMouseEnter={() => handleCursorHover(true)}
                                onMouseLeave={() => handleCursorHover(false)}
                                className={`inline-flex items-center gap-2 rounded-full border px-7 py-3.5 text-sm font-bold backdrop-blur-sm transition-all ${
                                    dm
                                        ? 'border-white/25 bg-white/5 text-white hover:border-white/50 hover:bg-white/10'
                                        : 'border-slate-300 bg-white/70 text-slate-800 hover:border-indigo-400 hover:bg-white'
                                }`}
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
                                    onMouseLeave={() => handleCursorHover(false)}
                                    className={`inline-flex items-center gap-2 rounded-full border border-dashed px-6 py-3.5 text-sm font-bold transition-all ${
                                        dm
                                            ? 'border-indigo-300/50 text-indigo-200 hover:border-indigo-300 hover:text-white'
                                            : 'border-indigo-300 text-indigo-600 hover:border-indigo-500'
                                    }`}
                                >
                                    <Download size={16} /> {cvLabel}
                                </a>
                            )}
                        </div>

                        {stats.length > 0 && (
                            <div className="mb-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
                                {stats.map((s) => (
                                    <div
                                        key={s.label}
                                        className={`rounded-xl border px-3 py-3 backdrop-blur-sm ${
                                            dm
                                                ? 'border-white/10 bg-white/5'
                                                : 'border-slate-200/80 bg-white/80 shadow-sm'
                                        }`}
                                    >
                                        <p
                                            className={`text-xl font-black ${
                                                dm ? 'text-white' : 'text-slate-900'
                                            }`}
                                        >
                                            {s.value}
                                        </p>
                                        <p
                                            className={`mt-0.5 text-[11px] font-medium ${
                                                dm ? 'text-white/55' : 'text-slate-500'
                                            }`}
                                        >
                                            {s.label}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        )}

                        <div className="flex gap-2">
                            {socialLinks
                                .filter(
                                    (link): link is typeof link & { href: string } =>
                                        !!link.href,
                                )
                                .map(({ icon: Icon, label, href }) => (
                                    <Link
                                        key={label}
                                        href={href}
                                        target={label !== 'Email' ? '_blank' : undefined}
                                        rel="noreferrer"
                                        title={label}
                                        onMouseEnter={() => handleCursorHover(true)}
                                        onMouseLeave={() => handleCursorHover(false)}
                                        className={`flex h-10 w-10 items-center justify-center rounded-full border transition-all hover:border-indigo-500 hover:bg-indigo-600 hover:text-white ${
                                            dm
                                                ? 'border-white/15 bg-white/5 text-white/70'
                                                : 'border-slate-200 bg-white text-slate-600 shadow-sm'
                                        }`}
                                    >
                                        <Icon size={15} />
                                    </Link>
                                ))}
                        </div>
                    </div>

                    <div className="hero-enter-2 flex justify-center lg:justify-end">
                        <div className="relative w-full max-w-sm">
                            <div
                                className={`absolute -inset-3 rounded-[2rem] blur-2xl ${
                                    dm
                                        ? 'bg-gradient-to-br from-indigo-500/30 via-transparent to-fuchsia-500/20'
                                        : 'bg-gradient-to-br from-indigo-500/45 via-sky-300/25 to-fuchsia-400/35'
                                }`}
                            />

                            <div
                                className={`relative overflow-hidden rounded-[1.75rem] border shadow-2xl backdrop-blur-md ${
                                    dm
                                        ? 'border-white/15 bg-white/5 shadow-black/40'
                                        : 'border-slate-200/90 bg-white/90 shadow-slate-300/40'
                                }`}
                            >
                                <div className="relative aspect-[4/5] overflow-hidden">
                                    <img
                                        src={
                                            profile_image ||
                                            '/images/profileimage.png'
                                        }
                                        alt={displayName}
                                        className="h-full w-full object-cover object-top"
                                    />
                                    <div
                                        className={`absolute inset-0 bg-gradient-to-t via-transparent to-transparent ${
                                            dm
                                                ? 'from-[#0c1222]/90'
                                                : 'from-slate-900/75'
                                        }`}
                                    />

                                    {yearsExp && (
                                        <div className="absolute top-4 right-4 flex h-14 w-14 flex-col items-center justify-center rounded-2xl bg-indigo-600 text-white shadow-lg shadow-indigo-900/30">
                                            <span className="text-lg leading-none font-black">
                                                {yearsExp}
                                            </span>
                                            <span className="text-[10px] font-semibold opacity-85">
                                                yrs
                                            </span>
                                        </div>
                                    )}

                                    <div className="absolute right-0 bottom-0 left-0 p-5 text-white">
                                        <p className="text-lg font-bold">
                                            {displayName}
                                        </p>
                                        <p className="text-sm text-indigo-200">
                                            {role_title || 'Full Stack Developer'}
                                        </p>
                                        {tech_stack && (
                                            <p className="mt-1 text-xs text-white/70">
                                                {tech_stack}
                                            </p>
                                        )}
                                    </div>
                                </div>

                                {(links.email || links.phone) && (
                                    <div
                                        className={`space-y-2 border-t px-5 py-4 ${
                                            dm
                                                ? 'border-white/10'
                                                : 'border-slate-100'
                                        }`}
                                    >
                                        {links.email && (
                                            <a
                                                href={`mailto:${links.email}`}
                                                className={`flex items-center gap-2 truncate text-sm transition-colors hover:text-indigo-600 ${
                                                    dm
                                                        ? 'text-white/80 hover:text-white'
                                                        : 'text-slate-700'
                                                }`}
                                            >
                                                <Mail
                                                    size={14}
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
                                                className={`flex items-center gap-2 text-sm transition-colors hover:text-indigo-600 ${
                                                    dm
                                                        ? 'text-white/80 hover:text-white'
                                                        : 'text-slate-700'
                                                }`}
                                            >
                                                <Phone
                                                    size={14}
                                                    className="shrink-0 text-indigo-500"
                                                />
                                                {links.phone}
                                            </a>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div
                className={`relative z-10 border-t py-5 backdrop-blur-md ${
                    dm
                        ? 'border-white/10 bg-black/25'
                        : 'border-slate-200/70 bg-white/55'
                }`}
            >
                <div className="tech-marquee mx-auto max-w-5xl" aria-hidden="true">
                    <div className="tech-marquee-track">
                        {marqueeItems.map((skill, index) => (
                            <span
                                key={`${skill}-${index}`}
                                className={`tech-marquee-item ${
                                    dm ? 'tech-marquee-item-dark' : 'tech-marquee-item-light'
                                }`}
                            >
                                {skill}
                                <span
                                    className={`mx-5 ${
                                        dm ? 'text-indigo-400/80' : 'text-indigo-500/70'
                                    }`}
                                >
                                    ✦
                                </span>
                            </span>
                        ))}
                    </div>
                </div>
                <p className="sr-only">Tech stack: {marqueeSkills.join(', ')}</p>
            </div>
        </section>
    );
}
