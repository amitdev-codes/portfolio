import { useRef, useEffect } from 'react';

export const useCursor = () => {
    const cursorRef = useRef<HTMLDivElement>(null);

    const handleCursorHover = (on: boolean) => {
        cursorRef.current?.classList.toggle('cursor-hover', on);
    };

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (cursorRef.current) {
                cursorRef.current.style.left = `${e.clientX}px`;
                cursorRef.current.style.top = `${e.clientY}px`;
            }
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return { cursorRef, handleCursorHover };
};
