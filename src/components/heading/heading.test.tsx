import { render, screen } from '@testing-library/react';
import { Heading } from './heading';

describe('Heading', () => {
    const createTestComponent = (props: React.ComponentProps<typeof Heading>) => {
        const { children, ...otherProps } = props;

        return <Heading {...otherProps}>{children}</Heading>;
    };

    it('renders without crashing', () => {
        const size = 'h1';
        const children = 'Test Heading';
        render(createTestComponent({ size, children }));

        expect(screen.getByText('Test Heading')).toBeInTheDocument();
    });

    it('renders the correct element type when `as` prop is provided', () => {
        const size = 'h1';
        const as = 'h3';
        const children = 'Heading as h3';
        render(createTestComponent({ size, as, children }));

        expect(screen.getByRole('heading', { level: 3 })).toBeInTheDocument();
        expect(screen.queryByRole('heading', { level: 1 })).not.toBeInTheDocument();
    });
});
