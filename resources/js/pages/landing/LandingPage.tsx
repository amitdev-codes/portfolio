import { useLandingPage } from '@/hooks/useLandingPage';
import AboutSection from './components/AboutSection';
import ContactSection from './components/ContactSection';
import FooterSection from './components/FooterSection';
import HeroSection from './components/HeroSection';
import Navbar from './components/Navbar';
import ProjectsSection from './components/ProjectsSection';
import TechTalkSection from './components/TechTalkSection';
import './LandingModule.css';
// eslint-disable-next-line import/order
import { useScrollAnimation } from '@/hooks/useScrollAnimation';


export default function LandingPage({ projects }: { projects: any }) {
    const {
        isScrolled,
        darkMode,
        setDarkMode,
        cursorRef,
        handleCursorHover,
        downloadCV,
    } = useLandingPage();

    const dm = darkMode;
    const bg = dm ? 'bg-[#0f0f13]' : 'bg-[#f8f7f4]';
    const bgWhite = dm ? 'bg-[#18181f]' : 'bg-white';
    const bgCard = dm ? 'bg-[#1e1e28]' : 'bg-white';
    const textPrimary = dm ? 'text-slate-100' : 'text-slate-900';
    const textMuted = dm ? 'text-slate-400' : 'text-slate-500';
    const borderColor = dm ? 'border-slate-700' : 'border-slate-100';
    useScrollAnimation();

    const navBg = isScrolled
        ? dm
            ? 'bg-[#0f0f13]/95 backdrop-blur-2xl shadow-sm shadow-slate-900 py-3'
            : 'bg-white/90 backdrop-blur-2xl shadow-sm py-3'
        : 'bg-transparent py-6';

    return (
        <div
            className={`min-h-screen ${bg} overflow-x-hidden font-sans transition-colors duration-500`}
        >
            {/* Custom Cursor */}
            <div
                ref={cursorRef}
                className="pointer-events-none fixed z-999 h-3 w-3 rounded-full bg-indigo-600 mix-blend-multiply transition-all duration-150"
                style={{ transform: 'translate(-50%, -50%)' }}
            />
            <Navbar
                isScrolled={isScrolled}
                darkMode={darkMode}
                setDarkMode={setDarkMode}
                downloadCV={downloadCV}
                handleCursorHover={handleCursorHover}
                navBg={navBg}
            />
            <HeroSection
                darkMode={darkMode}
                textPrimary={textPrimary}
                textMuted={textMuted}
                bg={bg}
                bgCard={bgCard}
                borderColor={borderColor}
                handleCursorHover={handleCursorHover}
            />
            <AboutSection
                darkMode={darkMode}
                textPrimary={textPrimary}
                textMuted={textMuted}
                bg={bg}
                bgCard={bgCard}
                borderColor={borderColor}
            />

            <ProjectsSection
                projects={projects}
                bg={bg}
                bgCard={bgCard}
                textPrimary={textPrimary}
                textMuted={textMuted}
            />
            <TechTalkSection
                darkMode={darkMode}
                textPrimary={textPrimary}
                textMuted={textMuted}
                bg={bg}
                bgWhite={bgWhite}
                handleCursorHover={handleCursorHover}
                bgCard={bgCard}
                borderColor={borderColor}
            />
            <ContactSection
                bgWhite={bgWhite}
                darkMode={darkMode}
                textPrimary={textPrimary}
                textMuted={textMuted}
                bg={bg}
                bgCard={bgCard}
                borderColor={borderColor}
                handleCursorHover={handleCursorHover}
            />
            <FooterSection
                darkMode={darkMode}
                textPrimary={textPrimary}
                textMuted={textMuted}
                bg={bg}
                bgWhite={bgWhite}
                bgCard={bgCard}
                borderColor={borderColor}
                handleCursorHover={handleCursorHover}
            />
        </div>
    );
}
