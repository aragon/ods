import { render, screen } from '@testing-library/react';
import { EmptyState } from '.';
import { IconType } from '../../icon';
import type { IEmptyStateBaseProps, IEmptyStateHumanIllustrationProps, IEmptyStateProps } from './emptyState.api';

describe('<EmptyState /> component', () => {
    const fullBaseProps: IEmptyStateBaseProps = {
        heading: 'Default Heading',
        primaryButton: {
            label: 'Label',
            iconLeft: IconType.ADD,
            iconRight: IconType.CHEVRON_RIGHT,
            onClick: () => alert('Primary Button Clicked'),
        },
        secondaryButton: {
            label: 'Label',
            iconLeft: IconType.ADD,
            iconRight: IconType.CHEVRON_RIGHT,
            onClick: () => alert('Secondary Button Clicked'),
        },
    };

    const humanIllustrationProps: IEmptyStateHumanIllustrationProps = {
        ...fullBaseProps,
        humanIllustration: {
            body: 'VOTING',
            expression: 'SMILE',
        },
    };

    const objectIllustrationProps: IEmptyStateProps = {
        ...fullBaseProps,
        objectIllustration: {
            object: 'LIGHTBULB',
        },
    };

    it('renders the EmptyState component stacked with full props and object illustration', () => {
        render(<EmptyState {...objectIllustrationProps} />);
        expect(screen.getByText(fullBaseProps.heading)).toBeInTheDocument();
        const buttons = screen.getAllByRole('button', { name: 'Label' });
        expect(buttons).toHaveLength(2);
        expect(screen.getByLabelText('Object Illustration')).toBeInTheDocument();
    });

    it('renders the EmptyState component stacked with full props and human illustration', () => {
        render(<EmptyState {...humanIllustrationProps} />);
        expect(screen.getByText(fullBaseProps.heading)).toBeInTheDocument();
        expect(screen.getByLabelText('Human Illustration')).toBeInTheDocument();
        const buttons = screen.getAllByRole('button', { name: 'Label' });
        expect(buttons).toHaveLength(2);
    });

    it('renders the EmptyState component unstacked with full props and object illustration', () => {
        render(<EmptyState isStacked={false} {...objectIllustrationProps} />);
        expect(screen.getByText(fullBaseProps.heading)).toBeInTheDocument();
        const buttons = screen.getAllByRole('button', { name: 'Label' });
        expect(buttons).toHaveLength(2);
        const objectIllustration = screen.getByLabelText('Object Illustration');
        expect(objectIllustration).toHaveClass('order-last');
    });

    it('renders the EmptyState component unstacked with full props and human illustration', () => {
        render(<EmptyState isStacked={false} {...humanIllustrationProps} />);
        expect(screen.getByText(fullBaseProps.heading)).toBeInTheDocument();
        const buttons = screen.getAllByRole('button', { name: 'Label' });
        expect(buttons).toHaveLength(2);
        const humanIllustration = screen.getByLabelText('Human Illustration');
        expect(humanIllustration).toHaveClass('order-last');
    });
});
