import { Root } from '@radix-ui/react-alert-dialog';
import type React from 'react';
import { type ReactNode } from 'react';

export interface IDialogAlertRootProps {
    children?: ReactNode;
    /**
     * Initial visibility state of the dialog. Used for uncontrolled component behavior.
     */
    defaultOpen?: boolean;
    /**
     * Manages the visibility state of the dialog. Should be implemented alongside `onOpenChange` for controlled usage.
     */
    open?: boolean;
    /**
     * Callback function invoked when the open state of the dialog changes.
     */
    onOpenChange?(open: boolean): void;
}

/**
 * `DialogAlert` component.
 */
export const DialogAlertRoot: React.FC<IDialogAlertRootProps> = (props) => {
    return <Root {...props} />;
};

DialogAlertRoot.displayName = 'DialogAlert.Root';
