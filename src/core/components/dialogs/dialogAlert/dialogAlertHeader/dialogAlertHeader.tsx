import { Description, Title } from '@radix-ui/react-alert-dialog';
import * as VisuallyHidden from '@radix-ui/react-visually-hidden';
import classNames from 'classnames';
import { useContext, type ComponentPropsWithoutRef } from 'react';
import { AvatarIcon } from '../../../avatars';
import { IconType } from '../../../icon';
import { DialogAlertContext, type DialogAlertVariant } from '../dialogAlertRoot';

export interface IDialogAlertHeaderProps extends ComponentPropsWithoutRef<'div'> {
    /**
     * Title summarizing dialog's content or purpose.
     */
    title: string;
    /**
     * Optional visually hidden description announced when the dialog is opened for accessibility.
     */
    description?: string;
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
 * `DialogAlert.Header` component
 *
 * **NOTE**: This component must be used inside a `<DialogAlert.Root />` component.
 */
export const DialogAlertHeader: React.FC<IDialogAlertHeaderProps> = (props) => {
    const { title, description, ...otherProps } = props;
    const { variant } = useContext(DialogAlertContext);

    return (
        <div
            className="flex w-full items-center gap-x-4 rounded-t-xl bg-modal-header px-4 pb-2 pt-4 backdrop-blur-md md:px-6 md:pt-6"
            {...otherProps}
        >
            <div className="flex min-w-0 flex-1 items-center">
                <Title
                    className={classNames(
                        'flex-1 truncate text-lg leading-tight',
                        dialogAlertVariantToTitleClass[variant],
                    )}
                >
                    {title}
                </Title>
                {description && (
                    <VisuallyHidden.Root>
                        <Description>{description}</Description>
                    </VisuallyHidden.Root>
                )}
            </div>
            <AvatarIcon icon={dialogAlertVariantToIcon[variant]} variant={variant} size="lg" />
        </div>
    );
};
