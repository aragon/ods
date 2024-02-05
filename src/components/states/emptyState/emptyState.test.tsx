import { render, screen } from '@testing-library/react';
import { EmptyState } from '.';
import type { IIllustrationHumanProps, IIllustrationObjectProps } from '../../illustrations';
import type { IEmptyStateBaseProps, IEmptyStateButton, IEmptyStateProps } from './emptyState.api';

describe('<EmptyState /> component', () => {
    const defaultBaseProps: IEmptyStateBaseProps = {
        title: 'Default Title',
        description: 'Default Description',
        isStacked: true,
    };

    const defaultHumanIllustrationProps: IIllustrationHumanProps = {
        body: 'VOTING',
        expression: 'SMILE',
    };

    const defaultObjectIllustrationProps: IIllustrationObjectProps = {
        object: 'LIGHTBULB',
    };

    const createTestComponent = (customProps: Partial<IEmptyStateProps>) => {
        if (customProps.illustrationProps && 'expression' in customProps.illustrationProps) {
            const props: IEmptyStateProps = {
                ...defaultBaseProps,
                ...customProps,
                illustrationProps: { ...defaultHumanIllustrationProps, ...customProps.illustrationProps },
            };
            return <EmptyState {...props} />;
        } else if (customProps.illustrationProps) {
            // Check if illustrationProps is defined and is of object type
            const props: IEmptyStateProps = {
                ...defaultBaseProps,
                ...customProps,
                illustrationProps: { ...defaultObjectIllustrationProps, ...customProps.illustrationProps },
            };
            return <EmptyState {...props} />;
        } else {
            // Use default object illustration props if illustrationProps is undefined
            const props: IEmptyStateProps = {
                ...defaultBaseProps,
                ...customProps,
                illustrationProps: defaultObjectIllustrationProps,
            };
            return <EmptyState {...props} />;
        }
    };

    it('renders the EmptyState component with default props', () => {
        render(createTestComponent(defaultBaseProps));
        expect(screen.getByText(defaultBaseProps.title)).toBeInTheDocument();
        expect(screen.getByLabelText('Object Illustration')).toBeInTheDocument();
    });

    it('renders with a human illustration', () => {
        const humanProps: Partial<IEmptyStateProps> = {
            illustrationProps: { body: 'VOTING', expression: 'SMILE' },
        };
        render(createTestComponent(humanProps));
        expect(screen.getByLabelText('Human Illustration')).toBeInTheDocument();
    });

    it('renders primary button when isStacked is true', () => {
        const primaryButton: IEmptyStateButton = { label: 'Primary Button' };
        const stackedProps: Partial<IEmptyStateProps> = {
            primaryButton: primaryButton,
        };
        render(createTestComponent(stackedProps));
        expect(screen.getByRole('button', { name: 'Primary Button' })).toBeInTheDocument();
    });

    it('does not render primary button when isStacked is false', () => {
        const primaryButton: IEmptyStateButton = { label: 'Primary Button' };
        const nonStackedProps: Partial<IEmptyStateProps> = {
            primaryButton: primaryButton,
            isStacked: false,
        };
        render(createTestComponent(nonStackedProps));
        expect(screen.queryByRole('button', { name: 'Primary Button' })).not.toBeInTheDocument();
    });

    it('does not render a human illustration when isStacked is false', () => {
        const customProps: Partial<IEmptyStateProps> = {
            illustrationProps: { body: 'VOTING', expression: 'SMILE' },
            isStacked: false,
        };
        render(createTestComponent(customProps));
        expect(screen.queryByLabelText('Human Illustration')).not.toBeInTheDocument();
    });
});
