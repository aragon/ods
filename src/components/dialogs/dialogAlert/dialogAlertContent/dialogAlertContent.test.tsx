import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { DialogAlertRoot } from '../dialogAlertRoot';
import { DialogAlertTrigger } from '../dialogAlertTrigger';
import { DialogAlertContent, type IDialogAlertContentProps } from './dialogAlertContent';

describe('<DialogAlertContent/> component', () => {
    const createTestComponent = (props?: Partial<IDialogAlertContentProps>) => {
        const completeProps: IDialogAlertContentProps = {
            title: 'alertTitle',
            actionLabel: 'action',
            cancelLabel: 'cancel',
            ...props,
        };
        return (
            <DialogAlertRoot defaultOpen>
                <DialogAlertTrigger>trigger</DialogAlertTrigger>
                <DialogAlertContent {...completeProps} />
            </DialogAlertRoot>
        );
    };

    it('renders the title, action and cancel buttons, and the content', () => {
        const title = 'Test title';
        const content = 'Test content';
        const actionLabel = 'Test label';
        const cancelLabel = 'Test cancel';

        render(createTestComponent({ title, children: content, actionLabel, cancelLabel }));

        expect(screen.getByText(title)).toBeInTheDocument();
        expect(screen.getByText(content)).toBeInTheDocument();
        expect(screen.getByText(actionLabel)).toBeInTheDocument();
        expect(screen.getByText(cancelLabel)).toBeInTheDocument();
    });

    it('triggers onActionClick when the action button is clicked', async () => {
        const actionLabel = 'Test label';
        const onActionClick = jest.fn();

        render(createTestComponent({ actionLabel, onActionClick }));

        const actionButton = screen.getByRole('button', { name: actionLabel });
        await userEvent.click(actionButton);

        expect(onActionClick).toHaveBeenCalled();
    });

    it('triggers onCancelClick when the cancel button is clicked', async () => {
        const cancelLabel = 'Test label';
        const onCancelClick = jest.fn();

        render(createTestComponent({ cancelLabel, onCancelClick }));

        const actionButton = screen.getByRole('button', { name: cancelLabel });
        await userEvent.click(actionButton);

        expect(onCancelClick).toHaveBeenCalled();
    });
});
