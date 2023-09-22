import classNames from 'classnames';
import type { AnchorHTMLAttributes } from 'react';
import { Icon, IconType } from '../icon';

export interface IActionItemProps extends AnchorHTMLAttributes<HTMLAnchorElement> {}

export const ActionItem: React.FC<IActionItemProps> = (props) => {
    const { children, className, ...otherProps } = props;

    return (
        <a
            className={classNames(
                'flex flex-row items-center justify-between gap-3', // Layout
                'cursor-pointer rounded-xl border border-neutral-100 bg-neutral-0 px-4 py-3', // Default
                'focus:outline-none focus-visible:ring focus-visible:ring-primary focus-visible:ring-offset', // Focus state
                'hover:border-neutral-200 hover:shadow-neutral-md active:border-neutral-300', // Active/hover states
                'md:gap-4 md:px-6 md:py-3.5', // Responsive
                className,
            )}
            {...otherProps}
        >
            {children}
            <Icon icon={IconType.CHEVRON_RIGHT} size="sm" responsiveSize={{ md: 'md' }} className="text-neutral-300" />
        </a>
    );
};
