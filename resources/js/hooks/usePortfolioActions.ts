export const usePortfolioActions = () => {
    const downloadCV = () => {
        const link = document.createElement('a');
        link.href = '/cv/amit-kumar-dev-cv.pdf';
        link.download = 'Amit-Kumar-Dev-CV.pdf';
        link.click();
    };

    const scrollProject = (
        id: number,
        dir: 'left' | 'right',
        scrollRefs: any,
    ) => {
        const el = scrollRefs.current[id];

        if (!el) {
            return;
        }

        el.scrollBy({ left: dir === 'left' ? -300 : 300, behavior: 'smooth' });
    };

    return { downloadCV, scrollProject };
};
