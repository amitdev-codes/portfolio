interface NavLinkProps {
    href: string;
    children: React.ReactNode;
    onMouseEnter: () => void;
    onMouseLeave: () => void;
}

export function NavLink({
    href,
    children,
    onMouseEnter,
    onMouseLeave,
}: NavLinkProps) {
    return (
        <a
            href={href}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            className="text-sm font-semibold tracking-wide text-slate-500 uppercase transition-colors hover:text-indigo-600"
        >
            {children}
        </a>
    );
}
