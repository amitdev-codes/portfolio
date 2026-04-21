import { useState, useEffect } from 'react';

export const useDarkMode = () => {
    const [darkMode, setDarkMode] = useState(false);

    // Optional: persist in localStorage
    useEffect(() => {
        const saved = localStorage.getItem('darkMode');

        if (saved) {

            setDarkMode(saved === 'true');
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('darkMode', darkMode.toString());

        if (darkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [darkMode]);

    return { darkMode, setDarkMode };
};
