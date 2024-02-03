import { render, screen } from '@testing-library/react';
import { CardEmptyState, type ICardEmptyStateProps } from '.';
import { IconType } from '../../icon';

describe('<CardEmptyState /> component', () => {
    const createTestComponent = (props?: Partial<ICardEmptyStateProps>) => {
        const completeProps: ICardEmptyStateProps = {
            heading: 'Test Heading',
            description: 'Test Description',
            illustrationType: 'object',
            illustration: 'LIGHTBULB',
            isStacked: true,
            ...props,
        };

        return <CardEmptyState {...completeProps} />;
    };

    it('renders without crashing', () => {
        render(createTestComponent());
        expect(screen.getByText('Test Heading')).toBeInTheDocument();
        expect(screen.getByText('Test Description')).toBeInTheDocument();
    });

    it('correctly renders children based on the conditions of isStacked prop', () => {
        const primaryButtonProps = {
            label: 'Primary Action',
            iconLeft: IconType.ADD,
            iconRight: IconType.CHEVRON_RIGHT,
        };

        const { rerender } = render(createTestComponent({ primaryButton: primaryButtonProps, isStacked: true }));
        expect(screen.getByText('Primary Action')).toBeInTheDocument();

        rerender(createTestComponent({ primaryButton: primaryButtonProps, isStacked: false }));
        expect(screen.queryByText('Primary Action')).not.toBeInTheDocument();
    });
});
