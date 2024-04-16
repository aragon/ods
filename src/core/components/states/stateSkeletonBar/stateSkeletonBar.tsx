import classNames from 'classnames';
import { forwardRef, type ComponentPropsWithoutRef } from 'react';

export type SkeletonBarSize = 'sm' | 'md' | 'lg' | 'xl' | '2xl';

export interface IStateSkeletonBarProps extends ComponentPropsWithoutRef<'div'> {
    /**
     * The size of the skeleton.
     * @default md
     */
    size?: SkeletonBarSize;
}

export const StateSkeletonBar = forwardRef<HTMLDivElement, IStateSkeletonBarProps>((props, ref) => {
    const { className, size = 'md', ...otherProps } = props;

    const sizeToHeightClasses: Record<SkeletonBarSize, string> = {
        sm: 'h-3',
        md: 'h-4',
        lg: 'h-5',
        xl: 'h-6',
        '2xl': 'h-8',
    };

    return (
        <div
            data-testid="stateSkeletonBar"
            ref={ref}
            className={classNames(
                'w-40 animate-pulse rounded-full bg-neutral-50',
                sizeToHeightClasses[size],
                className,
            )}
            {...otherProps}
        />
    );
});

StateSkeletonBar.displayName = 'StateSkeletonBar';
