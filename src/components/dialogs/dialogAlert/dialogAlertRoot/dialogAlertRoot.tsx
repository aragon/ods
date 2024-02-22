import { Content, Overlay, Portal, Root } from '@radix-ui/react-alert-dialog';
import classNames from 'classnames';
import type React from 'react';
import { createContext, useMemo, type ReactNode } from 'react';

export type DialogAlertVariant = 'critical' | 'info' | 'success' | 'warning';

export interface IDialogAlertRootProps {
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
    onOpenChange?(open: boolean): void;
    /**
     * Handler called when focus moves to the trigger after closing
     */
    onCloseAutoFocus?: (e: Event) => void;
    /**
     * Handler called when focus moves to the destructive action after opening
     */
    onOpenAutoFocus?: (e: Event) => void;
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
        ...rootProps
    } = props;

    const contextValue = useMemo(() => ({ variant }), [variant]);

    return (
        <Root {...rootProps}>
            <Portal>
                <Overlay className={classNames('fixed inset-0 bg-modal-overlay backdrop-blur-md', overlayClassName)} />
                <Content
                    className={classNames(
                        'fixed inset-x-2 bottom-2 mx-auto max-h-[calc(100vh-80px)] lg:bottom-auto lg:top-[120px] lg:max-h-[calc(100vh-200px)]',
                        'flex max-w-[480px] flex-col rounded-xl border border-neutral-100 shadow-neutral-md md:min-w-[480px]',
                        containerClassName,
                    )}
                    onCloseAutoFocus={onCloseAutoFocus}
                    onOpenAutoFocus={onOpenAutoFocus}
                >
                    <DialogAlertContext.Provider value={contextValue}>{children}</DialogAlertContext.Provider>
                </Content>
            </Portal>
        </Root>
    );
};

DialogAlertRoot.displayName = 'DialogAlert.Root';
