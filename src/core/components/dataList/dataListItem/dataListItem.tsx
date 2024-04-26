import classNames from 'classnames';
import type { ComponentPropsWithoutRef } from 'react';
import { LinkBase } from '../../link';
import { useDataListContext } from '../dataListContext';

export interface IDataListItemProps extends ComponentPropsWithoutRef<'a'> {}

export const DataListItem: React.FC<IDataListItemProps> = (props) => {
    const { children, className, href, ...otherProps } = props;

    const { state, childrenItemCount } = useDataListContext();

    // The DataListElement is a skeleton element on initial loading or loading state when no items are being
    // rendered (e.g. after a reset filters action)
    const isSkeletonElement = state === 'initialLoading' || (state === 'loading' && childrenItemCount === 0);

    const actionItemClasses = classNames(
        'rounded-xl border border-neutral-100 bg-neutral-0 px-4 py-3 transition-all', // Default
        'focus:outline-none focus-visible:ring focus-visible:ring-primary focus-visible:ring-offset', // Focus state
        { 'hover:border-neutral-200 hover:shadow-neutral-md active:border-neutral-300': !isSkeletonElement }, // Hover states when not skeleton
        { 'cursor-pointer': !isSkeletonElement }, // Not skeleton element
        'md:px-6 md:py-3.5', // Responsive
        className,
    );

    return (
        <LinkBase
            className={actionItemClasses}
            href={href}
            aria-hidden={isSkeletonElement}
            tabIndex={isSkeletonElement ? -1 : 0}
            {...otherProps}
        >
            {children}
        </LinkBase>
    );
};
