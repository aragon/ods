import classNames from 'classnames';
import type { ComponentProps } from 'react';
import { useDataListContext } from '../dataListContext';

export interface IDataListItemProps extends ComponentProps<'a'> {}

export const DataListItem: React.FC<IDataListItemProps> = (props) => {
    const { children, className, href, ...otherProps } = props;

    const { state, childrenItemCount } = useDataListContext();

    const isLoadingElement = state === 'initialLoading' || (state === 'loading' && childrenItemCount === 0);

    const actionItemClasses = classNames(
        'rounded-xl border border-neutral-100 bg-neutral-0 px-4 py-3 transition-all', // Default
        'focus:outline-none focus-visible:ring focus-visible:ring-primary focus-visible:ring-offset', // Focus state
        { 'hover:border-neutral-200 hover:shadow-neutral-md active:border-neutral-300': !isLoadingElement }, // Hover states when not loading
        { 'cursor-pointer': !isLoadingElement }, // Not loading element
        'md:px-6 md:py-3.5', // Responsive
        className,
    );

    return (
        <a className={actionItemClasses} href={href} aria-hidden={isLoadingElement} {...otherProps}>
            {children}
        </a>
    );
};
