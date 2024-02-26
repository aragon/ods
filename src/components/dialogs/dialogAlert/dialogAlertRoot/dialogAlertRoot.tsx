import { Content, Overlay, Portal, Root, Trigger, type AlertDialogProps } from '@radix-ui/react-alert-dialog';
import classNames from 'classnames';
import { createContext, useMemo, type ReactNode } from 'react';

export type DialogAlertVariant = 'critical' | 'info' | 'success' | 'warning';

export interface IDialogAlertRootProps extends AlertDialogProps {
    /**
     * Children of the component.
     */
    children?: ReactNode;
    /**
     * Additional CSS class names for custom styling of the dialog's content container.
     */
    containerClassName?: string;
    /**
     * Manages the visibility state of the dialog. Should be implemented alongside `onOpenChange` for controlled usage.
     */
    open?: boolean;
    /**
     * Additional CSS class names for custom styling of the overlay behind the dialog.
     */
    overlayClassName?: string;
    /**
     * The visual style variant of the dialog.
     * @default info
     */
    variant?: DialogAlertVariant;
    /**
     * Callback function invoked when the open state of the dialog changes.
     */
    onOpenChange?: (open: boolean) => void;
    /**
     * Handler called when focus moves to the trigger after closing the dialog.
     */
    onCloseAutoFocus?: (e: Event) => void;
    /**
     * Handler called when focus moves to the destructive action after opening the dialog.
     */
    onOpenAutoFocus?: (e: Event) => void;
    /**
     * Handler called when the escape key is pressed while the dialog is opened. Closes the dialog by default.
     */
    onEscapeKeyDown?: (e: KeyboardEvent) => void;
}

export interface IDialogAlertContext {
    variant: DialogAlertVariant;
}

export const DialogAlertContext = createContext<IDialogAlertContext>({ variant: 'info' });

/**
 * `DialogAlert.Root` component.
 */
export const DialogAlertRoot: React.FC<IDialogAlertRootProps> = (props) => {
    const {
        children,
        containerClassName,
        overlayClassName,
        variant = 'info',
        onCloseAutoFocus,
        onOpenAutoFocus,
        onEscapeKeyDown,
        ...rootProps
    } = props;

    const contextValue = useMemo(() => ({ variant }), [variant]);

    const handleEscapeKeyDown = (e: KeyboardEvent) => {
        props.onOpenChange?.(false);

        onEscapeKeyDown?.(e);
    };

    return (
        <Root {...rootProps}>
            <Trigger />
            <Portal>
                <Overlay
                    className={classNames('fixed inset-0 z-20 bg-modal-overlay backdrop-blur-md', overlayClassName)}
                />
                <Content
                    className={classNames(
                        'fixed inset-x-2 bottom-2 mx-auto max-h-[calc(100vh-80px)] lg:bottom-auto lg:top-[120px] lg:max-h-[calc(100vh-200px)]',
                        'z-20 flex max-w-[480px] flex-col rounded-xl border border-neutral-100 bg-neutral-0 shadow-neutral-md md:min-w-[480px]',
                        containerClassName,
                    )}
                    onCloseAutoFocus={onCloseAutoFocus}
                    onEscapeKeyDown={handleEscapeKeyDown}
                    onOpenAutoFocus={onOpenAutoFocus}
                >
                    <DialogAlertContext.Provider value={contextValue}>{children}</DialogAlertContext.Provider>
                </Content>
            </Portal>
        </Root>
    );
};

DialogAlertRoot.displayName = 'DialogAlert.Root';
