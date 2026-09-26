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
interface ContactSectionProps {
    darkMode: boolean;
    textPrimary: string;
    textMuted: string;
    bg: string;
    bgWhite: string;
    bgCard: string;
    borderColor: string;
    handleCursorHover: (hover: boolean) => void;
}
export default function ContactSection({
    darkMode,
    textPrimary,
    textMuted,
    bg,
    bgWhite,
    handleCursorHover,
    bgCard,
    borderColor,
}: ContactSectionProps) {
    const dm = darkMode;
    return (
        <section
            id="contact"
            className={`px-6 py-24 lg:px-8 ${bg} transition-colors duration-500`}
        >
            <div className="mx-auto max-w-4xl">
                <div className="fade-up mb-14 text-center">
                    <span className="text-xs font-bold tracking-[0.2em] text-indigo-600 uppercase">
                        Get in Touch
                    </span>
                    <h2 className={`mt-3 text-5xl font-black ${textPrimary}`}>
                        Let's build something{' '}
                        <span className="text-indigo-600">great</span>
                    </h2>
                    <p
                        className={`text-lg ${textMuted} mx-auto mt-4 max-w-xl font-light`}
                    >
                        Have a project in mind? Let's collaborate and create
                        something amazing together.
                    </p>
                </div>

                <div className="mb-10 grid grid-cols-1 gap-4 md:grid-cols-3">
                    {[
                        {
                            icon: Mail,
                            label: 'Email',
                            value: 'amit@example.com',
                            href: 'mailto:amit@example.com',
                        },
                        {
                            icon: Github,
                            label: 'GitHub',
                            value: 'github.com/amitkumardev',
                            href: '#',
                        },
                        {
                            icon: Linkedin,
                            label: 'LinkedIn',
                            value: 'linkedin.com/in/amitkumardev',
                            href: '#',
                        },
                    ].map(({ icon: Icon, label, value, href }) => (
                        <a
                            key={label}
                            href={href}
                            onMouseEnter={() => handleCursorHover(true)}
                            onMouseLeave={() => handleCursorHover(false)}
                            className={`fade-up ${bgCard} flex h-full flex-col items-center rounded-2xl border p-6 ${borderColor} text-center transition-all hover:-translate-y-1 hover:border-indigo-400 hover:shadow-lg`}
                        >
                            <div
                                className={`mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl ${
                                    dm
                                        ? 'bg-indigo-500/15 text-indigo-300'
                                        : 'bg-indigo-50 text-indigo-600'
                                }`}
                            >
                                <Icon size={22} />
                            </div>
                            <h3 className={`font-black ${textPrimary} mb-1`}>
                                {label}
                            </h3>
                            <p className={`text-xs ${textMuted} break-all`}>
                                {value}
                            </p>
                        </a>
                    ))}
                </div>

                <div
                    className={`fade-up ${bgCard} rounded-3xl border p-8 ${borderColor} space-y-5 shadow-sm`}
                >
                    <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                        <input
                            type="text"
                            placeholder="Your Name"
                            className={`px-4 py-3.5 ${bg} border ${borderColor} rounded-xl text-sm font-medium transition-all focus:border-indigo-400 focus:outline-none focus:ring-2 ${
                                dm
                                    ? 'focus:ring-indigo-500/20'
                                    : 'focus:ring-indigo-100'
                            } ${textPrimary}`}
                        />
                        <input
                            type="email"
                            placeholder="Your Email"
                            className={`px-4 py-3.5 ${bg} border ${borderColor} rounded-xl text-sm font-medium transition-all focus:border-indigo-400 focus:outline-none focus:ring-2 ${
                                dm
                                    ? 'focus:ring-indigo-500/20'
                                    : 'focus:ring-indigo-100'
                            } ${textPrimary}`}
                        />
                    </div>
                    <input
                        type="text"
                        placeholder="Subject"
                        className={`w-full px-4 py-3.5 ${bg} border ${borderColor} rounded-xl text-sm font-medium transition-all focus:border-indigo-400 focus:outline-none focus:ring-2 ${
                            dm
                                ? 'focus:ring-indigo-500/20'
                                : 'focus:ring-indigo-100'
                        } ${textPrimary}`}
                    />
                    <textarea
                        placeholder="Tell me about your project..."
                        rows={5}
                        className={`w-full resize-none px-4 py-3.5 ${bg} border ${borderColor} rounded-xl text-sm font-medium transition-all focus:border-indigo-400 focus:outline-none focus:ring-2 ${
                            dm
                                ? 'focus:ring-indigo-500/20'
                                : 'focus:ring-indigo-100'
                        } ${textPrimary}`}
                    />
                    <button
                        type="button"
                        onMouseEnter={() => handleCursorHover(true)}
                        onMouseLeave={() => handleCursorHover(false)}
                        className="w-full rounded-xl bg-indigo-600 py-4 font-black tracking-wide text-white transition-all duration-300 hover:bg-indigo-500 hover:shadow-lg hover:shadow-indigo-500/25"
                    >
                        Send Message →
                    </button>
                </div>
            </div>
        </section>
    );
}
