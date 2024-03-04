import { Action, Cancel } from '@radix-ui/react-alert-dialog';
import classNames from 'classnames';
import type React from 'react';
import { useContext, type AnchorHTMLAttributes, type ButtonHTMLAttributes } from 'react';
import { Button, type IButtonBaseProps } from '../../../button';
import { DialogAlertContext } from '../dialogAlertRoot';

export type IDialogAlertFooterAction = (
    | Pick<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'>
    | Pick<ButtonHTMLAttributes<HTMLButtonElement>, 'onClick'>
) &
    Pick<IButtonBaseProps, 'iconRight' | 'iconLeft'> & {
        /**
         * Button label
         */
        label: string;
    };

export interface IDialogAlertFooterProps {
    /**
     * Alert dialog primary action button
     */
    actionButton: IDialogAlertFooterAction;
    /**
     * Alert dialog secondary button used for dismissing the dialog
     * or cancelling the action
     */
    cancelButton: IDialogAlertFooterAction;
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
            <Action asChild={true}>
                <Button
                    {...actionButtonProps}
                    size="lg"
                    variant={actionVariant}
                    className={classNames('w-full md:w-auto', {
                        'order-2': variant === 'warning' || variant === 'critical',
                    })}
                >
                    {actionLabel}
                </Button>
            </Action>
            <Cancel asChild={true}>
                <Button {...cancelButtonProps} variant="tertiary" size="lg" className="w-full md:w-auto">
                    {cancelLabel}
                </Button>
            </Cancel>
        </div>
    );
};
