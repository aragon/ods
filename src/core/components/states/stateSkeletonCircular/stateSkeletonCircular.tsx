import classNames from 'classnames';
import { forwardRef, type ComponentPropsWithoutRef } from 'react';

export type SkeletonCircularSize = 'sm' | 'md' | 'lg' | 'xl' | '2xl';

export interface IStateSkeletonCircularProps extends ComponentPropsWithoutRef<'div'> {
    /**
     * The size of the skeleton.
     * @default 'md'
     */
    size?: SkeletonCircularSize;
}

export const StateSkeletonCircular = forwardRef<HTMLDivElement, IStateSkeletonCircularProps>((props, ref) => {
    const { className, size = 'md', ...otherProps } = props;

    const sizeClasses: Record<SkeletonCircularSize, string> = {
        sm: 'size-6',
        md: 'size-8',
        lg: 'size-10',
        xl: 'size-14',
        '2xl': 'size-16',
    };

    return (
        <div
            data-testid="stateSkeletonCircular"
            ref={ref}
            className={classNames('animate-pulse rounded-full bg-neutral-50', sizeClasses[size], className)}
            {...otherProps}
        />
    );
});

StateSkeletonCircular.displayName = 'StateSkeletonCircular';
