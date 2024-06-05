import { useEffect, useState } from 'react';
import resolveConfig from 'tailwindcss/resolveConfig';
import tailwindConfig from '../../../../tailwind.config'; // Adjust the path as necessary

const fullConfig = resolveConfig(tailwindConfig);

const configBreakpoints = fullConfig.theme?.screens;

const breakpoints = Object.fromEntries(
    Object.entries(configBreakpoints).map(([key, value]) => [key, parseInt(value as string, 10)]),
);

const getWindowSize = () => ({
    width: window.innerWidth,
    height: window.innerHeight,
});

export const useWindowSize = () => {
    const [windowSize, setWindowSize] = useState(getWindowSize());

    useEffect(() => {
        const handleResize = () => {
            setWindowSize(getWindowSize());
        };

        window.addEventListener('resize', handleResize);
        handleResize();

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return { ...windowSize, breakpoints };
};
