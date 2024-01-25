import * as RadixProgress from '@radix-ui/react-progress';
import classNames from 'classnames';
import { type IProgressProps } from './progress.api';

const variantToClassNames = {
    md: ['h-[8px]'],
    sm: ['h-[4px]'],
};

export const Progress: React.FC<IProgressProps> = (props) => {
    const { value, variant = 'md', className, ...otherProps } = props;

    const processedValue = Math.min(Math.max(1, value), 100);

    const containerClassNames = classNames(
        'relative w-[320px] overflow-hidden rounded-xl border border-neutral-200 bg-neutral-100',
        variantToClassNames[variant],
    );

    return (
        <RadixProgress.Root value={value} className={classNames(containerClassNames, className)} {...otherProps}>
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
