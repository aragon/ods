import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { DialogAlertContent, type IDialogAlertContentProps } from './dialogAlertContent';
import { DialogAlertRoot, type IDialogAlertRootProps } from './dialogAlertRoot';
import { DialogAlertTrigger } from './dialogAlertTrigger';

describe('<DialogAlert/> component', () => {
    const createTestComponent = (
        contentProps?: Partial<IDialogAlertContentProps>,
        rootProps?: Partial<IDialogAlertRootProps>,
    ) => {
        const completeContentProps = {
            title: 'Test title',
            actionLabel: 'Test action',
            cancelLabel: 'Test cancel',
            ...contentProps,
        };

        const completeRootProps: IDialogAlertRootProps = {
            ...rootProps,
        };

        return (
            <DialogAlertRoot {...completeRootProps}>
                <DialogAlertTrigger>trigger</DialogAlertTrigger>
                <DialogAlertContent {...completeContentProps} />
            </DialogAlertRoot>
        );
    };

    it('renders only the trigger by default', () => {
        const title = 'Test title';
        const actionLabel = 'Test label';
        const cancelLabel = 'Test cancel';

        render(createTestComponent({ title, actionLabel, cancelLabel }));

        expect(screen.queryByText(title)).not.toBeInTheDocument();
        expect(screen.queryByText(actionLabel)).not.toBeInTheDocument();
        expect(screen.queryByText(cancelLabel)).not.toBeInTheDocument();
        expect(screen.queryByRole('alertdialog')).not.toBeInTheDocument();

        expect(screen.getByRole('button')).toBeVisible();
    });

    it('shows the alertdialog when the trigger is clicked', async () => {
        const title = 'Test title';
        const actionLabel = 'Test label';
        const cancelLabel = 'Test cancel';

        render(createTestComponent({ title, actionLabel, cancelLabel }));

        expect(screen.queryByRole('alertdialog')).not.toBeInTheDocument();

        await userEvent.click(screen.getByRole('button'));

        const alertDialog = screen.getByRole('alertdialog');
        expect(alertDialog).toBeInTheDocument();
        expect(alertDialog).toHaveAttribute('data-state', 'open');
    });

    it('shows the alertdialog and content when defaultOpen is set to true', () => {
        const title = 'Test title';
        const actionLabel = 'Test label';
        const cancelLabel = 'Test cancel';
        const content = 'Test content';

        render(createTestComponent({ title, actionLabel, cancelLabel, children: content }, { defaultOpen: true }));

        const alertDialog = screen.getByRole('alertdialog');
        expect(alertDialog).toBeInTheDocument();
        expect(alertDialog).toHaveAttribute('data-state', 'open');

        expect(screen.getByText(title)).toBeInTheDocument();
        expect(screen.getByText(actionLabel)).toBeInTheDocument();
        expect(screen.getByText(cancelLabel)).toBeInTheDocument();
    });

    it('closes the alertdialog when the action button is clicked', async () => {
        const actionLabel = 'Test label';

        render(createTestComponent({ actionLabel }, { defaultOpen: true }));

        const alertDialog = screen.getByRole('alertdialog');
        expect(alertDialog).toBeInTheDocument();
        expect(alertDialog).toHaveAttribute('data-state', 'open');

        await userEvent.click(screen.getByRole('button', { name: actionLabel }));

        expect(alertDialog).not.toBeInTheDocument();
    });

    it('closes the alertdialog when the action cancel button is clicked', async () => {
        const cancelLabel = 'Test label';

        render(createTestComponent({ cancelLabel }, { defaultOpen: true }));

        const alertDialog = screen.getByRole('alertdialog');
        expect(alertDialog).toBeInTheDocument();
        expect(alertDialog).toHaveAttribute('data-state', 'open');

        await userEvent.click(screen.getByRole('button', { name: cancelLabel }));

        expect(alertDialog).not.toBeInTheDocument();
    });

    it('calls onOpenChange when the trigger is clicked', async () => {
        const handleOpenChange = jest.fn();

        render(createTestComponent({}, { onOpenChange: handleOpenChange }));

        await userEvent.click(screen.getByRole('button'));

        expect(handleOpenChange).toHaveBeenCalledWith(true);
    });

    it('calls onOpenChange when the action button is clicked', async () => {
        const actionLabel = 'Test label';
        const handleOpenChange = jest.fn();

        render(createTestComponent({ actionLabel }, { onOpenChange: handleOpenChange, defaultOpen: true }));

        await userEvent.click(screen.getByRole('button', { name: actionLabel }));

        expect(handleOpenChange).toHaveBeenCalledWith(false);
    });

    it('calls onOpenChange when the cancel button is clicked', async () => {
        const cancelLabel = 'Test label';
        const handleOpenChange = jest.fn();

        render(
            createTestComponent({ actionLabel: cancelLabel }, { onOpenChange: handleOpenChange, defaultOpen: true }),
        );

        await userEvent.click(screen.getByRole('button', { name: cancelLabel }));

        expect(handleOpenChange).toHaveBeenCalledWith(false);
    });
});
