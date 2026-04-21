import React from 'react';
import {useState} from 'react';

const [darkMode, setDarkMode] = useState(false);
// Dark mode class helpers
const dm = darkMode;
const bg = dm ? 'bg-[#0f0f13]' : 'bg-[#f8f7f4]';
const bgWhite = dm ? 'bg-[#18181f]' : 'bg-white';
const bgCard = dm ? 'bg-[#1e1e28]' : 'bg-white';
const textPrimary = dm ? 'text-slate-100' : 'text-slate-900';
const textMuted = dm ? 'text-slate-400' : 'text-slate-500';
const borderColor = dm ? 'border-slate-700' : 'border-slate-100';
const navBg = isScrolled
    ? dm
        ? 'bg-[#0f0f13]/95 backdrop-blur-2xl shadow-sm shadow-slate-900 py-3'
        : 'bg-white/90 backdrop-blur-2xl shadow-sm py-3'
    : 'bg-transparent py-6';

const handleCursorHover = (on: boolean) => {
    cursorRef.current?.classList.toggle('cursor-hover', on);
};

const Navigation = () => {
    return (
        <>
            <nav
                className={`fixed top-0 right-0 left-0 z-50 transition-all duration-500 ${navBg}`}
            >
                <div className="mx-auto flex max-w-7xl items-center justify-between px-6 lg:px-8">
                    <a
                        href="#home"
                        className="text-xl font-black tracking-tight"
                    >
                        <span className={textPrimary}>Amit</span>
                        <span className="text-indigo-600">.</span>
                        <span
                            className={`${textMuted} ml-1 text-base font-light`}
                        >
                            dev
                        </span>
                    </a>
                    <div className="hidden items-center gap-8 md:flex">
                        {['Home', 'About', 'Projects', 'Blog', 'Contact'].map(
                            (item) => (
                                <a
                                    key={item}
                                    href={`#${item.toLowerCase()}`}
                                    onMouseEnter={() => handleCursorHover(true)}
                                    onMouseLeave={() =>
                                        handleCursorHover(false)
                                    }
                                    className={`text-sm font-semibold ${textMuted} tracking-wide uppercase transition-colors hover:text-indigo-600`}
                                >
                                    {item}
                                </a>
                            ),
                        )}
                    </div>
                    <div className="hidden items-center gap-3 md:flex">
                        {/* Dark / Light Mode Toggle */}
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
                                dm
                                    ? 'Switch to light mode'
                                    : 'Switch to dark mode'
                            }
                        >
                            <span
                                className={`transition-all duration-300 ${dm ? 'scale-110 rotate-0' : 'scale-100 rotate-90'}`}
                            >
                                {dm ? <Sun size={17} /> : <Moon size={17} />}
                            </span>
                        </button>

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
        </>
    );
};

export default Navigation;
