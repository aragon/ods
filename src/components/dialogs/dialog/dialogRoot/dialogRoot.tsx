import { type DialogProps } from '@radix-ui/react-alert-dialog';
import { Content, Overlay, Portal, Root } from '@radix-ui/react-dialog';
import classNames from 'classnames';
import type React from 'react';
import { type ReactNode } from 'react';

export interface IDialogRootProps extends DialogProps {
    children?: ReactNode;
    /**
     * Additional CSS class names for custom styling of the dialog's content container.
     */
    containerClassName?: string;
    /**
     * Determines whether interactions with elements outside of the dialog will be disabled.
     * @default true
     */
    modal?: boolean;
    /**
     * Manages the visibility state of the dialog. Should be implemented alongside `onOpenChange` for controlled usage.
     */
    open?: boolean;
    /**
     * Additional CSS class names for custom styling of the overlay behind the dialog.
     */
    overlayClassName?: string;
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

/**
 * `Dialog.Root` component.
 */
export const DialogRoot: React.FC<IDialogRootProps> = (props) => {
    const { children, containerClassName, overlayClassName, onCloseAutoFocus, onOpenAutoFocus, ...rootProps } = props;

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
                />
            </Portal>
        </Root>
    );
};

DialogRoot.displayName = 'Dialog.Root';
