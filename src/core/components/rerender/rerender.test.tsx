import { act, render, screen } from '@testing-library/react';
import { type IRerenderProps, Rerender } from './rerender';

describe('<Rerender /> component', () => {
    beforeEach(() => {
        jest.useFakeTimers();
    });

    const createTestComponent = (props?: Partial<IRerenderProps>) => {
        const completeProps: IRerenderProps = {
            children: jest.fn(),
            ...props,
        };

        return <Rerender {...completeProps} />;
    };

    it('renders the initial time', () => {
        const currentTime = Date.now();
        render(
            createTestComponent({
                children: (time) => <div>Current Time: {time}</div>,
            }),
        );

        expect(screen.getByText(`Current Time: ${currentTime}`)).toBeInTheDocument();
    });

    it('updates time at the specified interval', () => {
        render(
            createTestComponent({
                children: (time) => <div>Current Time: {time}</div>,
                intervalDuration: 1000,
            }),
        );

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
            createTestComponent({
                children: (time) => <div>Current Time: {time}</div>,
            }),
        );

        unmount();

        expect(clearIntervalSpy).toHaveBeenCalled();
    });
});
