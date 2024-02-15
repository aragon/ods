import classNames from 'classnames';
import type { ComponentProps } from 'react';

export interface IDataListItemProps extends ComponentProps<'a'> {}

export const DataListItem: React.FC<IDataListItemProps> = (props) => {
    const { children, className, ...otherProps } = props;

    const actionItemClasses = classNames(
        'cursor-pointer rounded-xl border border-neutral-100 bg-neutral-0 px-4 py-3 transition-all', // Default
        'focus:outline-none focus-visible:ring focus-visible:ring-primary focus-visible:ring-offset', // Focus state
        'hover:border-neutral-200 hover:shadow-neutral-md active:border-neutral-300', // Active/hover states
        'md:px-6 md:py-3.5', // Responsive
        className,
    );

    return (
        <a className={actionItemClasses} {...otherProps}>
            {children}
        </a>
    );
};
