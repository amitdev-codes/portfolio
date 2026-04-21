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
interface FooterSectionProps {
    darkMode: boolean;
    textPrimary: string;
    textMuted: string;
    bg: string;
    bgWhite: string;
    bgCard: string;
    borderColor: string;
    handleCursorHover: (hover: boolean) => void;
}
export default function FooterSection({
    darkMode,
    textPrimary,
    textMuted,
    bg,
    bgWhite,
    handleCursorHover,
    bgCard,
    borderColor,
}: FooterSectionProps) {
    const dm = darkMode;
    return (
        <footer
            className={`${dm ? 'bg-[#0a0a0f]' : 'bg-slate-950'} px-6 pt-20 pb-10 text-white transition-colors duration-500 lg:px-8`}
        >
            <div className="mx-auto max-w-7xl">
                <div className="mb-16 grid grid-cols-1 gap-12 md:grid-cols-4">
                    <div className="md:col-span-2">
                        <a
                            href="#home"
                            className="mb-4 inline-block text-3xl font-black"
                        >
                            Amit<span className="text-indigo-400">.</span>
                            <span className="ml-1 text-xl font-light text-slate-500">
                                dev
                            </span>
                        </a>
                        <p className="mt-4 max-w-xs text-sm leading-relaxed font-light text-slate-400">
                            Full Stack Developer based in Kathmandu, Nepal.
                            Building scalable web applications with React &
                            Laravel.
                        </p>
                        <div className="mt-6 flex gap-3">
                            {[Github, Linkedin, Mail].map((Icon, i) => (
                                <a
                                    key={i}
                                    href="#"
                                    onMouseEnter={() => handleCursorHover(true)}
                                    onMouseLeave={() =>
                                        handleCursorHover(false)
                                    }
                                    className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-800 text-slate-400 transition-all hover:bg-indigo-600 hover:text-white"
                                >
                                    <Icon size={17} />
                                </a>
                            ))}
                        </div>
                    </div>
                    <div>
                        <h4 className="mb-5 text-xs font-bold tracking-widest text-slate-500 uppercase">
                            Navigation
                        </h4>
                        <div className="space-y-3">
                            {[
                                'Home',
                                'About',
                                'Projects',
                                'Blog',
                                'Contact',
                            ].map((item) => (
                                <a
                                    key={item}
                                    href={`#${item.toLowerCase()}`}
                                    className="block text-sm font-medium text-slate-400 transition-colors hover:text-indigo-400"
                                >
                                    {item}
                                </a>
                            ))}
                        </div>
                    </div>
                    <div>
                        <h4 className="mb-5 text-xs font-bold tracking-widest text-slate-500 uppercase">
                            Stack
                        </h4>
                        <div className="space-y-3">
                            {[
                                'React / Next.js',
                                'Laravel / PHP',
                                'Node.js',
                                'PostgreSQL',
                                'Docker / AWS',
                            ].map((item) => (
                                <p
                                    key={item}
                                    className="text-sm font-medium text-slate-400"
                                >
                                    {item}
                                </p>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="flex flex-col items-center justify-between gap-4 border-t border-slate-800 pt-8 md:flex-row">
                    <p className="text-xs text-slate-600">
                        © 2025 Amit Kumar Dev. All rights reserved.
                    </p>
                    <p className="flex items-center gap-2 text-xs text-slate-600">
                        Designed with <span className="text-red-400">♥</span>{' '}
                        by Amit
                    </p>
                </div>
            </div>
        </footer>
    );
}
