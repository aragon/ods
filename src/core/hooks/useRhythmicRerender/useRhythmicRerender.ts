import { useEffect, useState } from 'react';

/**
 * A custom React hook that forces a component to rerender at specified rhythmic intervals.
 * @param {number} [intervalDuration=1000] - The duration in milliseconds between each rerender. Defaults to 1000ms (1 second)
 * if not specified. This allows for customization of the rerender rate according to the use case.
 *
 * @returns The current timestamp at the moment of the last rerender.
 */
export const useRhythmicRerender = (intervalDuration: number = 1000): number => {
    const [time, setTime] = useState(Date.now());

    useEffect(() => {
        const interval = setInterval(() => setTime(Date.now()), intervalDuration);
        return () => clearInterval(interval);
    }, [setTime, intervalDuration]);

    return time;
};
