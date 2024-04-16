import classNames from 'classnames';
import { forwardRef, type ComponentPropsWithoutRef } from 'react';
import { type ResponsiveAttribute, type ResponsiveAttributeClassMap } from '../../../types';
import { responsiveUtils } from '../../../utils';

export type SkeletonCircularSize = 'sm' | 'md' | 'lg' | 'xl' | '2xl';

export interface IStateSkeletonCircularProps extends ComponentPropsWithoutRef<'div'> {
    /**
     *  Responsive size attribute for the skeleton.
     */
    responsiveSize?: ResponsiveAttribute<SkeletonCircularSize>;
    /**
     * The size of the skeleton.
     * @default 'md'
     */
    size?: SkeletonCircularSize;
}

const responsiveSizeClasses: ResponsiveAttributeClassMap<SkeletonCircularSize> = {
    sm: { sm: 'size-6', md: 'md:size-6', lg: 'lg:size-6', xl: 'xl:size-6', '2xl': '2xl:size-6' },
    md: { sm: 'size-8', md: 'md:size-8', lg: 'lg:size-8', xl: 'xl:size-8', '2xl': '2xl:size-8' },
    lg: { sm: 'size-10', md: 'md:size-10', lg: 'lg:size-10', xl: 'xl:size-10', '2xl': '2xl:size-10' },
    xl: { sm: 'size-14', md: 'md:size-14', lg: 'lg:size-14', xl: 'xl:size-14', '2xl': '2xl:size-14' },
    '2xl': { sm: 'size-16', md: 'md:size-16', lg: 'lg:size-16', xl: 'xl:size-16', '2xl': '2xl:size-16' },
};

export const StateSkeletonCircular = forwardRef<HTMLDivElement, IStateSkeletonCircularProps>((props, ref) => {
    const { className, responsiveSize = {}, size = 'md', ...otherProps } = props;

    const classes = classNames(
        'animate-pulse rounded-full bg-neutral-50',
        responsiveUtils.generateClassNames(size, responsiveSize, responsiveSizeClasses),
        className,
    );

    return <div data-testid="stateSkeletonCircular" ref={ref} className={classes} {...otherProps} />;
});

StateSkeletonCircular.displayName = 'StateSkeletonCircular';
