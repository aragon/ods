import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { DialogAlertContent, type IDialogAlertContentProps } from '../dialogAlertContent';
import { DialogAlertFooter, type IDialogAlertFooterProps } from '../dialogAlertFooter';
import { DialogAlertHeader, type IDialogAlertHeaderProps } from '../dialogAlertHeader';
import { DialogAlertRoot, type IDialogAlertRootProps } from './dialogAlertRoot';

describe('<DialogAlert.Root/> component', () => {
    const createTestComponent = (
        rootProps?: Partial<IDialogAlertRootProps>,
        headerProps?: Partial<IDialogAlertHeaderProps>,
        contentProps?: Partial<IDialogAlertContentProps>,
        footerProps?: Partial<IDialogAlertFooterProps>,
    ) => {
        const completeRootProps: IDialogAlertRootProps = {
            ...rootProps,
        };

        const completeHeaderProps: IDialogAlertHeaderProps = {
            title: 'test title',
            ...headerProps,
        };

        const completeContentProps: IDialogAlertContentProps = {
            children: 'test content',
            ...contentProps,
        };

        const completeFooterProps = {
            actionButton: { label: 'action' },
            cancelButton: { label: 'cancel' },
            ...footerProps,
        };

        return (
            <DialogAlertRoot {...completeRootProps}>
                <DialogAlertHeader {...completeHeaderProps} />
                <DialogAlertContent {...completeContentProps} />
                <DialogAlertFooter {...completeFooterProps} />
            </DialogAlertRoot>
        );
    };

    it('does not render the alertdialog by default', () => {
        render(createTestComponent());

        expect(screen.queryByRole('alertdialog')).not.toBeInTheDocument();
    });

    it('renders the alertdialog with the given content', () => {
        const title = 'test title';
        const content = 'test content';
        const actionBtnProps = { label: 'test action' };
        const cancelBtnProps = { label: 'test cancel' };

        render(
            createTestComponent(
                { open: true },
                { title },
                { children: content },
                { actionButton: actionBtnProps, cancelButton: cancelBtnProps },
            ),
        );

        const alertDialog = screen.getByRole('alertdialog');
        expect(alertDialog).toBeInTheDocument();
        expect(alertDialog).toHaveAccessibleName(title);
        expect(screen.getByText(title)).toBeInTheDocument();
        expect(screen.getByText(content)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: actionBtnProps.label })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: cancelBtnProps.label })).toBeInTheDocument();
    });

    it('calls onOpenChange and the given click handler when the action button is clicked', async () => {
        const handleActionBtnClick = jest.fn();
        const handleOpenChange = jest.fn();

        const actionBtnProps = { label: 'test action', onClick: handleActionBtnClick };

        render(
            createTestComponent(
                { open: true, onOpenChange: handleOpenChange },
                {}, // header props
                {}, // content props
                { actionButton: actionBtnProps },
            ),
        );

        await userEvent.click(screen.getByRole('button', { name: actionBtnProps.label }));

        expect(handleOpenChange).toHaveBeenCalledWith(false);
        expect(handleActionBtnClick).toHaveBeenCalled();
    });

    it('calls onOpenChange and the given click handler when the cancel button is clicked', async () => {
        const handleCancelBtnClick = jest.fn();
        const handleOpenChange = jest.fn();

        const cancelBtnProps = { label: 'test cancel', onClick: handleCancelBtnClick };

        render(
            createTestComponent(
                { open: true, onOpenChange: handleOpenChange },
                {}, // header props
                {}, // content props
                { cancelButton: cancelBtnProps },
            ),
        );

        await userEvent.click(screen.getByRole('button', { name: cancelBtnProps.label }));

        expect(handleOpenChange).toHaveBeenCalledWith(false);
        expect(handleCancelBtnClick).toHaveBeenCalled();
    });
});
