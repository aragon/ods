import { render, screen } from '@testing-library/react';
import React from 'react';
import { StateSkeletonCircular } from './stateSkeletonCircular';

describe('<StateSkeletonCircular /> component', () => {
    const createTestComponent = (props?: Partial<React.ComponentPropsWithRef<typeof StateSkeletonCircular>>) => {
        const completeProps = { ...props };
        return <StateSkeletonCircular {...completeProps} />;
    };

    it('renders the skeleton element without crashing', () => {
        render(createTestComponent());
        expect(screen.getByTestId('stateSkeletonCircular')).toBeInTheDocument();
    });

    it('forwards the ref to the skeleton element', () => {
        const ref = React.createRef<HTMLDivElement>();
        render(createTestComponent({ ref }));
        expect(ref.current).toBe(screen.getByTestId('stateSkeletonCircular'));
    });
});
