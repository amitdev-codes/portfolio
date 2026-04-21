import { Download, Sun, Moon } from 'lucide-react';
import { NavLink } from './NavLink';

interface NavbarProps {
    isScrolled: boolean;
    darkMode: boolean;
    setDarkMode: (value: boolean) => void;
    downloadCV: () => void;
    handleCursorHover: (on: boolean) => void;
    navBg: string;
}

export default function Navbar({
    isScrolled,
    darkMode,
    setDarkMode,
    downloadCV,
    handleCursorHover,
    navBg,
}: NavbarProps) {
    const dm = darkMode;

    return (
        <nav
            className={`fixed top-0 right-0 left-0 z-50 transition-all duration-500 ${navBg}`}
        >
            <div className="mx-auto flex max-w-7xl items-center justify-between px-6 lg:px-8">
                {/* Logo */}
                <a href="#home" className="text-xl font-black tracking-tight">
                    <span className={dm ? 'text-slate-100' : 'text-slate-900'}>
                        Amit
                    </span>
                    <span className="text-indigo-600">.</span>
                    <span
                        className={`${dm ? 'text-slate-400' : 'text-slate-500'} ml-1 text-base font-light`}
                    >
                        dev
                    </span>
                </a>

                {/* Desktop Navigation */}
                <div className="hidden items-center gap-8 md:flex">
                    {['Home', 'About', 'Projects', 'Blog', 'Contact'].map(
                        (item) => (
                            <NavLink
                                key={item}
                                href={`#${item.toLowerCase()}`}
                                onMouseEnter={() => handleCursorHover(true)}
                                onMouseLeave={() => handleCursorHover(false)}
                            >
                                {item}
                            </NavLink>
                        ),
                    )}
                </div>

                {/* Actions */}
                <div className="hidden items-center gap-3 md:flex">
                    {/* Dark Mode Toggle */}
                    <button
                        onClick={() => setDarkMode(!darkMode)}
                        onMouseEnter={() => handleCursorHover(true)}
                        onMouseLeave={() => handleCursorHover(false)}
                        className={`flex h-10 w-10 items-center justify-center rounded-full border transition-all duration-300 ${
                            dm
                                ? 'border-slate-600 bg-slate-800 text-amber-400 hover:bg-slate-700'
                                : 'border-slate-200 bg-slate-100 text-slate-600 hover:bg-slate-200'
                        }`}
                        title={
                            dm ? 'Switch to light mode' : 'Switch to dark mode'
                        }
                    >
                        {dm ? <Sun size={17} /> : <Moon size={17} />}
                    </button>

                    {/* Download CV */}
                    <button
                        onClick={downloadCV}
                        onMouseEnter={() => handleCursorHover(true)}
                        onMouseLeave={() => handleCursorHover(false)}
                        className={`flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition-all duration-300 ${
                            dm
                                ? 'bg-slate-100 text-slate-900 hover:bg-indigo-600 hover:text-white'
                                : 'bg-slate-900 text-white hover:bg-indigo-600'
                        }`}
                    >
                        <Download size={14} /> Resume
                    </button>
                </div>
            </div>
        </nav>
    );
}
