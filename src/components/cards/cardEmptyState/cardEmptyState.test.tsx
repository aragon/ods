import { render, screen } from '@testing-library/react';
import { CardEmptyState, type ICardEmptyStateProps } from './cardEmptyState';

describe('<CardEmptyState /> component', () => {
    const createTestComponent = (props?: Partial<ICardEmptyStateProps>) => {
        const minimumProps = {
            heading: 'test-heading',
        };

        return <CardEmptyState {...minimumProps} {...props} />;
    };

    it('renders EmptyState minimum props without crashing', () => {
        render(createTestComponent());
        expect(screen.getByText('test-heading')).toBeInTheDocument();
    });
});
