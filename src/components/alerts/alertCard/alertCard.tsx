import classNames from 'classnames';
import type React from 'react';
import { type HTMLAttributes } from 'react';

import { Icon } from '../../icon';
import { alertVariantToIconType, type AlertVariant } from '../alertUtils';

export interface IAlertCardProps extends HTMLAttributes<HTMLDivElement> {
    /** The main alert message. */
    message: string;
    /** Optional description for the alert. */
    description?: string;
    /** Specifies the variant of the alert. */
    variant: AlertVariant;
}

// Maps alert variants to container class names.
const alertVariantToContainerClassNames: Record<AlertVariant, string> = {
    critical: 'border-critical-400 bg-critical-100',
    info: 'border-info-400 bg-info-100',
    success: 'border-success-400 bg-success-100',
    warning: 'border-warning-400 bg-warning-100',
};

// Maps alert variants to icon class names.
const alertVariantToIconClassNames: Record<AlertVariant, string> = {
    critical: 'text-critical-500',
    info: 'text-info-500',
    success: 'text-success-500',
    warning: 'text-warning-500',
};

// Maps alert variants to message class names.
const alertVariantToMessageClassNames: Record<AlertVariant, string> = {
    critical: 'text-critical-800',
    info: 'text-info-800',
    success: 'text-success-800',
    warning: 'text-warning-800',
};

// Maps alert variants to description class names.
const alertVariantToDescriptionClassNames: Record<AlertVariant, string> = {
    critical: 'text-neutral-600',
    info: 'text-neutral-600',
    success: 'text-neutral-500',
    warning: 'text-neutral-600',
};

/**
 * AlertCard Component
 *
 * Displays an alert card with an icon, a main message, and an optional description.
 *
 * @param {IAlertCardProps} props - Component properties.
 * @returns {React.ReactElement} Rendered AlertCard component.
 */
export const AlertCard: React.FC<IAlertCardProps> = ({ className, description, message, variant, ...rest }) => {
    return (
        <div
            role="alert"
            className={classNames(
                'w-full space-y-0.5 rounded-xl border px-4 py-3 md:space-y-1 md:px-6 md:py-5',
                alertVariantToContainerClassNames[variant],
                className,
            )}
            {...rest}
        >
            <div className="flex items-center gap-x-2 md:gap-x-3">
                <Icon icon={alertVariantToIconType[variant]} className={alertVariantToIconClassNames[variant]} />
                <p
                    className={classNames(
                        'flex-1 text-sm font-semibold leading-tight md:text-base md:leading-normal',
                        alertVariantToMessageClassNames[variant],
                    )}
                >
                    {message}
                </p>
            </div>
            {description && (
                <p
                    className={classNames(
                        'ml-6 text-sm leading-normal md:ml-7 md:text-base',
                        alertVariantToDescriptionClassNames[variant],
                    )}
                >
                    {description}
                </p>
            )}
        </div>
    );
};
