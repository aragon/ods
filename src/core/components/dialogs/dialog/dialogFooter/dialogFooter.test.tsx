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

    it('renders an alert message', () => {
        const alert = { message: 'test alert' };
        render(createTestComponent({ alert }));

        const alertElement = screen.getByRole('alert');
        expect(alertElement).toBeInTheDocument();
        expect(alertElement).toHaveTextContent(alert.message);
    });

    it('renders the primary and secondary action buttons', () => {
        const primaryAction = { label: 'test primary action' };
        const secondaryAction = { label: 'test secondary action' };

        render(createTestComponent({ primaryAction, secondaryAction }));

        expect(screen.getByRole('button', { name: primaryAction.label })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: secondaryAction.label })).toBeInTheDocument();
    });
});
