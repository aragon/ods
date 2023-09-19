import classNames from 'classnames';
import { type HTMLAttributes } from 'react';

export type SpinnerSize = 'sm' | 'md' | 'lg' | 'xl';
export type SpinnerVariant = 'neutral' | 'primary' | 'success' | 'warning' | 'critical';

export interface ISpinnerProps extends HTMLAttributes<HTMLDivElement> {
    /**
     * Size of the spinner.
     */
    size: SpinnerSize;
    /**
     * Variant of the spinner.
     */
    variant: SpinnerVariant;
}

const sizeToDimension: Record<SpinnerSize, number> = {
    sm: 16,
    md: 20,
    lg: 24,
    xl: 32,
};

const variantToClassNames: Record<SpinnerVariant, string> = {
    neutral: 'border-neutral-100 border-t-primary-400',
    primary: 'border-neutral-0 border-t-primary-300',
    success: 'border-success-300 border-t-success-800',
    warning: 'border-warning-300 border-t-warning-800',
    critical: 'border-critical-300 border-t-critical-800',
};

/**
 * Spinner UI component
 */
export const Spinner: React.FC<ISpinnerProps> = (props) => {
    const { size, variant, style, className, ...otherProps } = props;

    const spinerSize = sizeToDimension[size];
    const computedStyle = { width: spinerSize, height: spinerSize, ...style };

    return (
        <div
            role="progressbar"
            className={classNames('animate-spin rounded-full border-2', variantToClassNames[variant], className)}
            style={computedStyle}
            {...otherProps}
        />
    );
};
