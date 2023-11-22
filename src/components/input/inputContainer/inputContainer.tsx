import classNames from 'classnames';
import type { ReactNode } from 'react';
import { AlertInline } from '../../alerts';

export type InputVariant = 'default' | 'warning' | 'critical';

export interface IInputContainerProps {
    /**
     * Label of the input.
     */
    label?: string;
    /**
     * Variant of the input.
     * @default default
     */
    variant?: InputVariant;
    /**
     * Help text displayed above the input.
     */
    helpText?: string;
    /**
     * Displays the optional tag when set to true.
     */
    isOptional?: boolean;
    /**
     * Additional information displayed below the input.
     */
    infoText?: string;
    /**
     * Alert message displayed below the input.
     */
    alertMessage?: string;
    /**
     * Children of the component.
     */
    children?: ReactNode;
    /**
     * Classes for the component.
     */
    className?: string;
}

const variantToClassNames: Record<InputVariant, string[]> = {
    default: [
        'border-neutral-100', // Default state
        'hover:border-neutral-200 hover:shadow-neutral-md', // Hover state
        'focus-within:outline-primary-200 focus-within:border-primary-200 focus-within:shadow-primary-md', // Focus state
        'focus-within:hover:border-primary-200 focus-within:hover:shadow-primary-md', // Focus + Hover state
    ],
    warning: [
        'border-warning-500', // Default state
        'hover:border-warning-600 hover:shadow-warning-md', // Hover state
        'focus-within:outline-warning-600 focus-within:border-warning-600 focus-within:shadow-warning-md', // Focus state
        'focus-within:hover:border-warning-600 focus-within:hover:shadow-warning-md', // Focus + Hover state
    ],
    critical: [
        'border-critical-500', // Default state
        'hover:border-critical-600 hover:shadow-critical-md', // Hover state
        'focus-within:outline-critical-600 focus-within:border-critical-600 focus-within:shadow-critical-md', // Focus state
        'focus-within:hover:border-critical-600 focus-within:hover:shadow-critical-md', // Focus + Hover state
    ],
};

export const InputContainer: React.FC<IInputContainerProps> = (props) => {
    const { label, variant = 'default', helpText, isOptional, infoText, alertMessage, children, className } = props;

    const containerClasses = classNames(
        'h-12 w-80 rounded-xl border bg-neutral-0 text-neutral-600 transition-all', // Default
        'outline-1 focus-within:outline', // Outline on focus
        'text-base font-normal leading-tight', // Typography
        variantToClassNames[variant],
    );

    return (
        <div className={classNames('flex flex-col gap-2', className)}>
            {(label != null || helpText != null) && (
                <div className="flex flex-col gap-0.5">
                    {label && (
                        <div className="flex flex-row items-center gap-3">
                            <p className="text-base font-semibold leading-normal text-neutral-600">{label}</p>
                            {isOptional && <p>TODO tag</p>}
                        </div>
                    )}
                    {helpText && <p className="text-sm font-normal leading-normal text-neutral-800">{helpText}</p>}
                </div>
            )}
            <div className={containerClasses}>{children}</div>
            {infoText && <p className="text-sm font-normal leading-tight text-neutral-600">{infoText}</p>}
            {alertMessage && <AlertInline variant="critical" message={alertMessage} />}
        </div>
    );
};
