import * as RadixProgress from '@radix-ui/react-progress';
import classNames from 'classnames';
import type { HTMLAttributes } from 'react';

export interface IProgressProps extends HTMLAttributes<HTMLDivElement> {
    /**
     * Current progress to be rendered.
     */
    value: number;
}

export const Progress: React.FC<IProgressProps> = (props) => {
    const { value, className, ...otherProps } = props;

    const processedValue = Math.min(Math.max(1, value), 100);

    return (
        <RadixProgress.Root
            value={value}
            className={classNames(
                'relative h-[20px] w-[320px] overflow-hidden rounded-xl border border-neutral-200 bg-neutral-100 p-1',
                className,
            )}
            {...otherProps}
        >
            <RadixProgress.Indicator
                className={classNames(
                    'h-full rounded-l-xl bg-primary-400 transition-[border-radius,width] duration-500 ease-in-out',
                    { 'rounded-r-xl': processedValue === 100 },
                )}
                style={{ width: `${processedValue}%` }}
            />
        </RadixProgress.Root>
    );
};
