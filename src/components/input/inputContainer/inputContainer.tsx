import classNames from 'classnames';
import { forwardRef } from 'react';
import { AlertInline } from '../../alerts';
import { Tag } from '../../tag';
import type { IInputContainerProps, InputVariant } from './inputContainer.api';

const variantToClassNames: Record<InputVariant | 'disabled', string[]> = {
    default: [
        'border-neutral-100 bg-neutral-0', // Default state
        'hover:border-neutral-200 hover:shadow-neutral-md', // Hover state
        'focus-within:outline-primary-400 focus-within:border-primary-400 focus-within:shadow-primary-md', // Focus state
        'focus-within:hover:border-primary-400 focus-within:hover:shadow-primary-md', // Focus + Hover state
    ],
    warning: [
        'border-warning-500 bg-neutral-0', // Default state
        'hover:border-warning-600 hover:shadow-warning-md', // Hover state
        'focus-within:outline-warning-600 focus-within:border-warning-600 focus-within:shadow-warning-md', // Focus state
        'focus-within:hover:border-warning-600 focus-within:hover:shadow-warning-md', // Focus + Hover state
    ],
    critical: [
        'border-critical-500 bg-neutral-0', // Default state
        'hover:border-critical-600 hover:shadow-critical-md', // Hover state
        'focus-within:outline-critical-600 focus-within:border-critical-600 focus-within:shadow-critical-md', // Focus state
        'focus-within:hover:border-critical-600 focus-within:hover:shadow-critical-md', // Focus + Hover state
    ],
    disabled: ['border-neutral-200 bg-neutral-100'],
};

/**
 * The InputContainer component provides a consistent and shared styling foundation for various input components, such
 * as `InputText`, `InputNumber` and others. It also manages properties that are shared across all input components,
 * including `label`, `helpText` and more.
 */
export const InputContainer = forwardRef<HTMLDivElement, IInputContainerProps>((props, ref) => {
    const {
        label,
        variant = 'default',
        helpText,
        isOptional,
        maxLength,
        inputLength = 0,
        alert,
        isDisabled,
        children,
        className,
        wrapperClassName,
        id,
        ...otherProps
    } = props;

    const processedVariant = isDisabled ? 'disabled' : variant;
    const containerClasses = classNames(
        'flex min-h-12 w-full flex-row items-center', // Layout
        'rounded-xl border text-neutral-600 transition-all', // Styling
        'outline-1 focus-within:outline', // Outline on focus
        'text-base font-normal leading-tight', // Typography
        variantToClassNames[processedVariant],
        wrapperClassName,
    );

    const counterClasses = classNames('text-sm font-normal leading-tight text-neutral-600', {
        'animate-shake': inputLength === maxLength,
    });

    return (
        <div className={classNames('flex grow flex-col gap-2 md:gap-3', className)} ref={ref} {...otherProps}>
            {(label != null || helpText != null) && (
                <label className="flex flex-col gap-0.5 md:gap-1" htmlFor={id}>
                    {label && (
                        <div className="flex flex-row items-center gap-3">
                            <p className="text-base font-semibold leading-normal text-neutral-600 md:text-lg md:leading-tight">
                                {label}
                            </p>
                            {/* TODO: apply internationalisation to Optional label [APP-2627] */}
                            {isOptional && <Tag variant="neutral" label="Optional" />}
                        </div>
                    )}
                    {helpText && <p className="text-sm font-normal leading-normal text-neutral-800">{helpText}</p>}
                </label>
            )}
            <div className={containerClasses}>{children}</div>
            {maxLength != null && !alert && (
                <p className={counterClasses}>
                    {inputLength}/{maxLength}
                </p>
            )}
            {alert && <AlertInline variant={alert.variant} message={alert.message} />}
        </div>
    );
});

InputContainer.displayName = 'InputContainer';
