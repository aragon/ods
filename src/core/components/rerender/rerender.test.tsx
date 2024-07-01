import { act, render, screen } from '@testing-library/react';
import { type IRerenderProps, Rerender } from './rerender';

describe('<Rerender /> component', () => {
    beforeEach(() => {
        jest.useFakeTimers();
    });

    const createTestComponent = (props?: Partial<IRerenderProps>) => {
        return render(<Rerender {...props}>{(time) => <div>Current Time: {time}</div>}</Rerender>);
    };

    it('renders the initial time', () => {
        const currentTime = Date.now();
        createTestComponent();

        expect(screen.getByText(`Current Time: ${currentTime}`)).toBeInTheDocument();
    });

    it('updates time at the specified interval', () => {
        createTestComponent({ intervalDuration: 1000 });

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

        const { unmount } = createTestComponent({ intervalDuration: 1000 });

        unmount();

        expect(clearIntervalSpy).toHaveBeenCalled();
    });
});
