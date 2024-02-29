import classNames from 'classnames';
import { type HTMLAttributes } from 'react';
import type { ResponsiveAttribute, ResponsiveAttributeClassMap } from '../../types';
import { responsiveUtils } from '../../utils';

export type SpinnerSize = 'sm' | 'md' | 'lg' | 'xl';
export type SpinnerVariant = 'neutral' | 'primary' | 'success' | 'warning' | 'critical';

export interface ISpinnerProps extends HTMLAttributes<HTMLDivElement> {
    /**
     * Size of the spinner.
     * @default md
     */
    size?: SpinnerSize;
    /**
     * Size of the spinner depending on the current breakpoint.
     */
    responsiveSize?: ResponsiveAttribute<SpinnerSize>;
    /**
     * Variant of the spinner.
     * @default neutral
     */
    variant?: SpinnerVariant;
}

const responsiveSizeClassNames: ResponsiveAttributeClassMap<SpinnerSize> = {
    sm: {
        sm: 'w-4 h-4 border-[1.6px]',
        md: 'md:w-4 md:h-4 md:border-[1.6px]',
        lg: 'lg:w-4 lg:h-4 lg:border-[1.6px]',
        xl: 'xl:w-4 xl:h-4 xl:border-[1.6px]',
        '2xl': '2xl:w-4 2xl:h-4 2xl:border-[1.6px]',
    },
    md: {
        sm: 'w-5 h-5 border-2',
        md: 'md:w-5 md:h-5 md:border-2',
        lg: 'lg:w-5 lg:h-5 lg:border-2',
        xl: 'xl:w-5 xl:h-5 xl:border-2',
        '2xl': '2xl:w-5 2xl:h-5 2xl:border-2',
    },
    lg: {
        sm: 'w-6 h-6 border-[2.4px]',
        md: 'md:w-6 md:h-6 md:border-[2.4px]',
        lg: 'lg:w-6 lg:h-6 lg:border-[2.4px]',
        xl: 'xl:w-6 xl:h-6 xl:border-[2.4px]',
        '2xl': '2xl:w-6 2xl:h-6 2xl:border-[2.4px]',
    },
    xl: {
        sm: 'w-8 h-8 border-[3.2px]',
        md: 'md:w-8 md:h-8 md:border-[3.2px]',
        lg: 'lg:w-8 lg:h-8 lg:border-[3.2px]',
        xl: 'xl:w-8 xl:h-8 xl:border-[3.2px]',
        '2xl': '2xl:w-8 2xl:h-8 2xl:border-[3.2px]',
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
    const { size = 'md', responsiveSize = {}, variant = 'neutral', className, ...otherProps } = props;

    const sizeClassNames = responsiveUtils.generateClassNames(size, responsiveSize, responsiveSizeClassNames);

    const spinnerClassNames = classNames(
        'animate-spin rounded-full',
        variantToClassNames[variant],
        sizeClassNames,
        className,
    );

    return <div role="progressbar" className={spinnerClassNames} {...otherProps} />;
};
