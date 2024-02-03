import { render, screen } from '@testing-library/react';
import { EmptyState, type IEmptyStateProps } from '.';
import { IconType } from '../icon';

describe('<EmptyState /> component', () => {
    const defaultStackedProps = {
        illustrationType: 'object',
        illustration: 'LIGHTBULB',
        heading: 'Default Heading',
        description: 'Default description',
        isStacked: true,
        primaryButton: { label: 'Primary', iconLeft: IconType.ADD, iconRight: IconType.CHEVRON_RIGHT },
        secondaryButton: { label: 'Secondary', iconLeft: IconType.CHEVRON_LEFT, iconRight: IconType.CHEVRON_RIGHT },
    };

    const defaultNonStackedProps = {
        illustrationType: 'object',
        illustration: 'LIGHTBULB',
        heading: 'Default Heading',
        description: 'Default description',
        isStacked: false,
        secondaryButton: { label: 'Secondary', iconLeft: IconType.CHEVRON_LEFT, iconRight: IconType.CHEVRON_RIGHT },
    };

    const createTestComponent = (props?: Partial<IEmptyStateProps>) => {
        const finalProps =
            props?.isStacked !== false ? { ...defaultStackedProps, ...props } : { ...defaultNonStackedProps, ...props };
        return <EmptyState {...(finalProps as IEmptyStateProps)} />;
    };

    it('renders correctly', () => {
        render(createTestComponent());
        expect(screen.getByText('Default Heading')).toBeInTheDocument();
        expect(screen.getByText('Default description')).toBeInTheDocument();
        expect(screen.getByText('Primary')).toBeInTheDocument();
        expect(screen.getByText('Secondary')).toBeInTheDocument();
    });

    it('renders correctly with isStacked false', () => {
        render(createTestComponent({ isStacked: false }));
        expect(screen.getByText('Default Heading')).toBeInTheDocument();
        expect(screen.getByText('Default description')).toBeInTheDocument();
        expect(screen.getByText('Secondary')).toBeInTheDocument();
    });

    it('renders the both illustrations based on illustrationType for default isStacked true', () => {
        render(
            createTestComponent({ illustrationType: 'human', illustration: { body: 'VOTING', expression: 'SMILE' } }),
        );
        expect(screen.getByRole('img', { name: 'Human Illustration' })).toBeInTheDocument();

        render(createTestComponent({ illustrationType: 'object', illustration: 'LIGHTBULB' }));
        expect(screen.getByRole('img', { name: 'Object Illustration' })).toBeInTheDocument();
    });

    it('renders the correct illustration with isStack set false', () => {
        render(createTestComponent({ isStacked: false, illustrationType: 'object', illustration: 'LIGHTBULB' }));
        expect(screen.getByRole('img', { name: 'Object Illustration' })).toBeInTheDocument();
    });
});
