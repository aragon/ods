import { render, screen } from '@testing-library/react';
import { DialogFooter, type IDialogFooterProps } from './dialogFooter';

describe('<Dialog.Footer/> component', () => {
    const createTestComponent = (props?: Partial<IDialogFooterProps>) => {
        const completeProps: IDialogFooterProps = {
            primaryAction: { label: 'primary' },
            secondaryAction: { label: 'secondary' },
            ...props,
        };

        return <DialogFooter {...completeProps} />;
    };

    it('renders the action and cancel buttons', () => {
        const primaryAction = { label: 'test action' };
        const secondaryAction = { label: 'test cancel' };

        render(createTestComponent({ primaryAction, secondaryAction }));

        expect(screen.getByRole('button', { name: primaryAction.label })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: secondaryAction.label })).toBeInTheDocument();
    });
});
