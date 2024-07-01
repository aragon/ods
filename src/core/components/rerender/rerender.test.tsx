import { act, render, screen } from '@testing-library/react';
import { Rerender } from './rerender';

describe('<Rerender /> component', () => {
    beforeEach(() => {
        jest.useFakeTimers();
    });

    it('renders the initial time', () => {
        const currentTime = Date.now();
        render(<Rerender>{(time) => <div>Current Time: {time}</div>}</Rerender>);

        expect(screen.getByText(`Current Time: ${currentTime}`)).toBeInTheDocument();
    });

    it('updates time at the specified interval', () => {
        render(<Rerender intervalDuration={1000}>{(time) => <div>Current Time: {time}</div>}</Rerender>);

        // Fast-forward time by 1 second
        act(() => {
            jest.advanceTimersByTime(1000);
        });

        const updatedTime = Date.now();
        expect(screen.getByText(`Current Time: ${updatedTime}`)).toBeInTheDocument();

        // Fast-forward time by another second
        act(() => {
            jest.advanceTimersByTime(1000);
        });

        const secondUpdatedTime = Date.now();
        expect(screen.getByText(`Current Time: ${secondUpdatedTime}`)).toBeInTheDocument();
    });

    it('clears the interval on unmount', () => {
        const clearIntervalSpy = jest.spyOn(window, 'clearInterval');

        const { unmount } = render(
            <Rerender intervalDuration={1000}>{(time) => <div>Current Time: {time}</div>}</Rerender>,
        );

        unmount();

        expect(clearIntervalSpy).toHaveBeenCalled();
    });
});
