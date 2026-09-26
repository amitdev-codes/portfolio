interface NavLinkProps {
    href: string;
    children: React.ReactNode;
    darkMode?: boolean;
    overHero?: boolean;
    onMouseEnter: () => void;
    onMouseLeave: () => void;
}

export function NavLink({
    href,
    children,
    darkMode = false,
    overHero = false,
    onMouseEnter,
    onMouseLeave,
}: NavLinkProps) {
    const color = overHero
        ? darkMode
            ? 'text-white/75 hover:text-white'
            : 'text-slate-600 hover:text-indigo-600'
        : darkMode
          ? 'text-slate-400 hover:text-indigo-400'
          : 'text-slate-500 hover:text-indigo-600';

    return (
        <a
            href={href}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            className={`text-sm font-semibold tracking-wide uppercase transition-colors ${color}`}
        >
            {children}
        </a>
    );
}
