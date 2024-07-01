import { useEffect, useState, type ReactNode } from 'react';

interface RerenderProps {
    /**
     * The duration in milliseconds between each rerender.
     * @default 1000
     */
    intervalDuration?: number;
    /**
     * Time-sensitive content to render.
     */
    children: (currentTime: number) => ReactNode;
}

/**
 * Rerender component
 *
 * This component triggers a rerender at a specified interval, providing the current time
 * (in milliseconds) to its child function. Useful for dynamically updating content based
 * on time-sensitive data.
 */
export const Rerender = ({ intervalDuration = 1000, children }: RerenderProps): JSX.Element => {
    const [time, setTime] = useState(Date.now());

    useEffect(() => {
        const interval = setInterval(() => setTime(Date.now()), intervalDuration);
        return () => clearInterval(interval);
    }, [setTime, intervalDuration]);

    return <>{children(time)}</>;
};
