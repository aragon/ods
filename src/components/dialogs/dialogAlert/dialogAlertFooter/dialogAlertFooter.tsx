import { Action, Cancel } from '@radix-ui/react-alert-dialog';
import classNames from 'classnames';
import type React from 'react';
import { useContext } from 'react';
import { Button, type IButtonProps } from '../../../button';
import { DialogAlertContext } from '../dialogAlertRoot';

export interface IDialogAlertFooterProps {
    /**
     * Alert dialog primary action button
     */
    actionButton: IButtonProps & { label: string };
    /**
     * Alert dialog secondary button used for dismissing the dialog
     * or cancelling the action
     */
    cancelButton: IButtonProps & { label: string };
}

/**
 * `DialogAlert.Footer` component
 *
 * **NOTE**: This component must be used inside a `<DialogAlert.Root />` component.
 */
export const DialogAlertFooter: React.FC<IDialogAlertFooterProps> = (props) => {
    const { variant } = useContext(DialogAlertContext);

    const { actionButton, cancelButton } = props;
    const { label: actionLabel, ...actionButtonProps } = actionButton;
    const { label: cancelLabel, ...cancelButtonProps } = cancelButton;

    const actionVariant = variant === 'info' ? 'secondary' : variant;

    return (
        <div className="flex flex-col gap-3 rounded-b-xl bg-modal-footer px-4 pb-4 pt-2 backdrop-blur-md md:flex-row md:px-6 md:pb-6">
            <Action asChild>
                <Button
                    size="lg"
                    variant={actionVariant}
                    className={classNames('w-full md:w-auto', {
                        'order-2': variant === 'warning' || variant === 'critical',
                    })}
                    {...actionButtonProps}
                >
                    {actionLabel}
                </Button>
            </Action>
            <Cancel asChild>
                <Button variant="tertiary" size="lg" className="w-full md:w-auto" {...cancelButtonProps}>
                    {cancelLabel}
                </Button>
            </Cancel>
        </div>
    );
};

DialogAlertFooter.displayName = 'DialogAlert.Footer';
