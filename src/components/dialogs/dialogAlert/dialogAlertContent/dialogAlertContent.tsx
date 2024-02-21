import { Action, Cancel, Content, Overlay, Portal, Title } from '@radix-ui/react-alert-dialog';
import classNames from 'classnames';
import { forwardRef, type ComponentPropsWithoutRef } from 'react';
import { AvatarIcon } from '../../../avatars';
import { Button } from '../../../button';
import { IconType } from '../../../icon';

export type DialogAlertVariant = 'info' | 'critical' | 'warning' | 'success';

export interface IDialogAlertContentProps extends ComponentPropsWithoutRef<'div'> {
    /**
     * Label for the action button, typically used to perform the primary action.
     */
    actionLabel: string;
    /**
     * Label for the cancel button, generally used to dismiss the dialog.
     */
    cancelLabel: string;
    /**
     * Additional CSS class names for custom styling of the dialog's container.
     */
    containerClassName?: string;
    /**
     * Additional CSS class names for custom styling of the overlay behind the dialog.
     */
    overlayClassName?: string;
    /**
     * Title summarizing dialog's content or purpose.
     */
    title: string;
    /**
     * The visual style variant of the dialog.
     * @default info
     */
    variant?: DialogAlertVariant;
    /**
     * Handler for click events on the action button.
     */
    onActionClick?: React.MouseEventHandler;
    /**
     * Handler for click events on the cancel button.
     */
    onCancelClick?: React.MouseEventHandler;
    /**
     * Handler called when focus moves to the trigger after closing
     */
    onCloseAutoFocus?: (e: Event) => void;
    /**
     * Handler called when focus moves to the destructive action after opening
     */
    onOpenAutoFocus?: (e: Event) => void;
}

const dialogAlertVariantToIcon: Record<DialogAlertVariant, IconType> = {
    critical: IconType.CRITICAL,
    info: IconType.INFO,
    success: IconType.SUCCESS,
    warning: IconType.WARNING,
};

const dialogAlertVariantToTitleClass: Record<DialogAlertVariant, string> = {
    critical: 'text-critical-600',
    info: 'text-info-600',
    success: 'text-success-600',
    warning: 'text-warning-600',
};

/**
 * `DialogAlertContent` component.
 *
 *  **NOTE**: This component must be used inside a `<DialogAlert />` component.
 */
export const DialogAlertContent = forwardRef<HTMLDivElement, IDialogAlertContentProps>((props, ref) => {
    const {
        children,
        overlayClassName,
        containerClassName,
        title,
        variant = 'info',
        cancelLabel,
        className,
        actionLabel,
        onActionClick,
        onCancelClick,
        ...otherProps
    } = props;

    const actionVariant = variant === 'info' ? 'secondary' : variant;

    return (
        <Portal>
            <Overlay className={classNames('fixed inset-0 bg-modal-overlay backdrop-blur-md', overlayClassName)} />
            <Content
                className={classNames(
                    'fixed inset-x-2 bottom-2 mx-auto max-h-[calc(100vh-80px)] lg:bottom-auto lg:top-[120px] lg:max-h-[calc(100vh-200px)]',
                    'flex max-w-[480px] flex-col rounded-xl border border-neutral-100 shadow-neutral-md md:min-w-[480px]',
                    containerClassName,
                )}
                ref={ref}
                {...otherProps}
            >
                {/* Header */}
                <div className="flex w-full items-center gap-x-4 rounded-t-xl bg-modal-header px-4 pb-2 pt-4 backdrop-blur-md md:px-6 md:pt-6">
                    <div className="flex min-w-0 flex-1 items-center">
                        <Title
                            className={classNames(
                                'flex-1 truncate text-lg leading-tight',
                                dialogAlertVariantToTitleClass[variant],
                            )}
                        >
                            {title}
                        </Title>
                    </div>
                    <AvatarIcon icon={dialogAlertVariantToIcon[variant]} variant={variant} size="lg" />
                </div>

                {/* Scrollable content */}
                <div className={classNames(' overflow-auto px-4 md:px-6', className)}>{children}</div>

                {/* Footer */}
                <div className="flex flex-col gap-3 rounded-b-xl bg-modal-footer px-4 pb-4 pt-2 backdrop-blur-md md:flex-row md:px-6 md:pb-6">
                    <Action asChild>
                        <Button
                            size="lg"
                            onClick={onActionClick}
                            variant={actionVariant}
                            className={classNames('w-full md:w-auto', {
                                'order-2': variant === 'warning' || variant === 'critical',
                            })}
                        >
                            {actionLabel}
                        </Button>
                    </Action>
                    <Cancel asChild>
                        <Button onClick={onCancelClick} variant="tertiary" size="lg" className="w-full md:w-auto">
                            {cancelLabel}
                        </Button>
                    </Cancel>
                </div>
            </Content>
        </Portal>
    );
});

DialogAlertContent.displayName = 'DialogAlert.Content';
