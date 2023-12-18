import classNames from 'classnames';
import { type HTMLAttributes } from 'react';
import type { ResponsiveAttribute, ResponsiveAttributeClassMap } from '../../types';
import { responsiveUtils } from '../../utils';

export type SpinnerSize = 'sm' | 'md' | 'lg' | 'xl';
export type SpinnerVariant = 'neutral' | 'primary' | 'success' | 'warning' | 'critical';

export interface ISpinnerProps extends HTMLAttributes<HTMLDivElement> {
    /**
     * Size of the spinner.
     */
    size: SpinnerSize;
    /**
     * Size of the spinner depending on the current breakpoint.
     */
    responsiveSize?: ResponsiveAttribute<SpinnerSize>;
    /**
     * Variant of the spinner.
     */
    variant: SpinnerVariant;
}

const responsiveSizeClassNames: ResponsiveAttributeClassMap<SpinnerSize> = {
    sm: {
        sm: 'w-4 h-4',
        md: 'md:w-4 md:h-4',
        lg: 'lg:w-4 lg:h-4',
        xl: 'xl:w-4 xl:h-4',
        '2xl': '2xl:w-4 2xl:h-4',
    },
    md: {
        sm: 'w-5 h-5',
        md: 'md:w-5 md:h-5',
        lg: 'lg:w-5 lg:h-5',
        xl: 'xl:w-5 xl:h-5',
        '2xl': '2xl:w-5 2xl:h-5',
    },
    lg: {
        sm: 'w-6 h-6',
        md: 'md:w-6 md:h-6',
        lg: 'lg:w-6 lg:h-6',
        xl: 'xl:w-6 xl:h-6',
        '2xl': '2xl:w-6 2xl:h-6',
    },
    xl: {
        sm: 'w-8 h-8',
        md: 'md:w-8 md:h-8',
        lg: 'lg:w-8 lg:h-8',
        xl: 'xl:w-8 xl:h-8',
        '2xl': '2xl:w-8 2xl:h-8',
    },
};

const variantToClassNames: Record<SpinnerVariant, string> = {
    neutral: 'border-neutral-100 border-t-primary-400',
    primary: 'border-primary-300 border-t-neutral-0',
    success: 'border-success-300 border-t-success-800',
    warning: 'border-warning-300 border-t-warning-800',
    critical: 'border-critical-300 border-t-critical-800',
};

/**
 * Spinner UI component
 */
export const Spinner: React.FC<ISpinnerProps> = (props) => {
    const { size, responsiveSize = {}, variant, className, ...otherProps } = props;

    const sizeClassNames = responsiveUtils.generateClassNames(size, responsiveSize, responsiveSizeClassNames);

    const spinnerClassNames = classNames(
        'animate-spin rounded-full border-2',
        variantToClassNames[variant],
        sizeClassNames,
        className,
    );

    return <div role="progressbar" className={spinnerClassNames} {...otherProps} />;
};
