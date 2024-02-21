import { Trigger } from '@radix-ui/react-alert-dialog';
import { forwardRef, type ComponentProps } from 'react';

export interface IDialogAlertTriggerProps extends ComponentProps<'button'> {
    /**
     * Replaces the trigger with the child element. All properties and behavior are
     * merged into the child element.
     */
    asChild?: boolean;
}

/**
 * `DialogAlertTrigger` component.
 *
 *  **NOTE**: This component must be used inside a `<DialogAlert />` component.
 */
export const DialogAlertTrigger = forwardRef<HTMLButtonElement, IDialogAlertTriggerProps>((props, ref) => {
    return <Trigger {...props} ref={ref} />;
});

DialogAlertTrigger.displayName = 'DialogAlert.Trigger';
