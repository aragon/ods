import { render, screen } from '@testing-library/react';
import React from 'react';
import { StateSkeletonBar } from './stateSkeletonBar';

describe('<StateSkeletonBar /> component', () => {
    const createTestComponent = (props?: Partial<React.ComponentPropsWithRef<typeof StateSkeletonBar>>) => {
        const completeProps = { ...props };
        return <StateSkeletonBar {...completeProps} />;
    };

    it('renders the skeleton element without crashing', () => {
        render(createTestComponent());
        expect(screen.getByTestId('stateSkeletonBar')).toBeInTheDocument();
    });

    it('forwards the ref to the skeleton element', () => {
        const ref = React.createRef<HTMLDivElement>();
        render(createTestComponent({ ref }));
        expect(ref.current).toBe(screen.getByTestId('stateSkeletonBar'));
    });
});
