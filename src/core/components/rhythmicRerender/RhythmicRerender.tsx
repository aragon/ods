import { type ReactNode } from 'react';
import { useRhythmicRerender } from '../../hooks';

interface RhythmicRerenderProps {
    /**
     * The duration in milliseconds between each rerender.
     */
    intervalDuration?: number;
    /**
     * A render function that returns the React nodes to be rendered.
     */
    render: (currentTime: number) => ReactNode;
}

/**
 * RhythmicRerender component
 *
 * This component uses the `useRhythmicRerender` hook to force a rerender at specified intervals.
 */
export const RhythmicRerender = ({ intervalDuration, render }: RhythmicRerenderProps): JSX.Element => {
    const view = useRhythmicRerender(intervalDuration);

    return <>{render(view)}</>;
};
