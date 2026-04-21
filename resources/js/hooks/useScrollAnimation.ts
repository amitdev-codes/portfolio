import { useEffect } from 'react';

/**
 * useScrollAnimation
 *
 * Adds the `.visible` class to any element that has one of the
 * animation marker classes (fade-up, fade-in, slide-left, slide-right, scale-up)
 * once it enters the viewport.
 *
 * Drop this hook in useLandingPage.ts (or call it directly in LandingPage.tsx):
 *   useScrollAnimation();
 */
export function useScrollAnimation(threshold = 0.15) {
    useEffect(() => {
        const targets = document.querySelectorAll<HTMLElement>(
            '.fade-up, .fade-in, .slide-left, .slide-right, .scale-up'
        );

        if (!targets.length) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                        // Once revealed, stop watching
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold }
        );

        targets.forEach((el) => observer.observe(el));

        return () => observer.disconnect();
    }, [threshold]);
}