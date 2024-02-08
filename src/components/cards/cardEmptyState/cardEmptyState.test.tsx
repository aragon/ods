import { render, screen } from '@testing-library/react';
import { CardEmptyState, type ICardEmptyStateProps } from './cardEmptyState';

describe('<CardEmptyState /> component', () => {
    const createTestComponent = (props?: Partial<ICardEmptyStateProps>) => {
        const commonProps = {
            heading: 'test-heading',
        };

        const { humanIllustration, objectIllustration = { object: 'ACTION' }, ...otherProps } = props ?? {};

        return <CardEmptyState objectIllustration={objectIllustration} {...commonProps} {...otherProps} />;
    };

    it('renders EmptyState minimum props without crashing', () => {
        render(createTestComponent());
        expect(screen.getByText('test-heading')).toBeInTheDocument();
        expect(screen.getByTestId('ACTION')).toBeInTheDocument();
    });
});
