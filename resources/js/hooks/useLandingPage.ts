import { useRef, useState } from 'react';
import { useCursor } from './useCursor';
import { useDarkMode } from './useDarkMode';
import { usePortfolioActions } from './usePortfolioActions';
import { useScrollDetection } from './useScrollDetection';

export const useLandingPage = () => {
    const scrollRefs = useRef<{ [key: number]: HTMLDivElement | null }>({});

    const { cursorRef, handleCursorHover } = useCursor();
    const { darkMode, setDarkMode } = useDarkMode();
    const isScrolled = useScrollDetection();
    const { downloadCV, scrollProject } = usePortfolioActions();
    const [expandedProject, setExpandedProject] = useState<number | null>(null);

    return {
        isScrolled,
        darkMode,
        setDarkMode,
        cursorRef,
        scrollRefs,
        handleCursorHover,
        downloadCV,
        scrollProject,
        expandedProject,
        setExpandedProject,
    };
};
