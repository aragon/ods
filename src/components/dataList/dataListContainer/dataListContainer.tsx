import classNames from 'classnames';
import { Children, useEffect, useMemo, type ComponentProps, type ReactElement } from 'react';
import { CardEmptyState } from '../../cards';
import type { IEmptyStateProps } from '../../states';
import { useDataListContext } from '../dataListContext';
import { DataListContainerSkeletonLoader } from './dataListContainerSkeletonLoader';

export interface IDataListContainerState
    extends Pick<IEmptyStateProps, 'heading' | 'description' | 'primaryButton' | 'secondaryButton'> {}

export interface IDataListContainerProps extends ComponentProps<'div'> {
    /**
     * Skeleton element displayed when the DataList container state is set to loading.
     */
    SkeltonElement?: React.FC;
    /**
     * Error state displayed when the data list status is set to error.
     */
    errorState?: IDataListContainerState;
    /**
     * Empty state displayed the the data list has no elements to render.
     */
    emptyState?: IDataListContainerState;
    /**
     * Empty state displayed the the data list has no elements to render for the current applied filters.
     */
    emptyFilteredState?: IDataListContainerState;
}

export const DataListContainer: React.FC<IDataListContainerProps> = (props) => {
    const { children, className, SkeltonElement, errorState, emptyState, emptyFilteredState, ...otherProps } = props;

    const { state, maxItems, currentPage, setChildrenItemCount } = useDataListContext();

    const processedChildren = Children.toArray(children) as ReactElement[];

    const SkeletonLoader = SkeltonElement ?? DataListContainerSkeletonLoader;
    const loadingItems = [...Array(maxItems)];

    const paginatedChildren = useMemo(
        () => processedChildren?.slice(0, maxItems * (currentPage + 1)) ?? [],
        [processedChildren, maxItems, currentPage],
    );

    // Display loading elements on initial-loading state or loading state with no elements being currently rendered
    // (e.g. on filter reset while being on empty state)
    const displayLoadingElements =
        state === 'initialLoading' || (state === 'loading' && paginatedChildren.length === 0);

    const displayItems = state === 'fetchingNextPage' || state === 'idle' || state === 'loading';

    const isEmpty = state === 'idle' && paginatedChildren.length === 0;
    const isEmptyFiltered = state === 'filtered' && paginatedChildren.length === 0;

    useEffect(() => {
        setChildrenItemCount(processedChildren.length);
    }, [setChildrenItemCount, processedChildren.length]);

    return (
        <div className={classNames('flex flex-col gap-2 px-0 md:px-6', className)} {...otherProps}>
            {displayLoadingElements && loadingItems.map((_value, index) => <SkeletonLoader key={index} />)}
            {state === 'error' && errorState != null && (
                <CardEmptyState objectIllustration={{ object: 'ERROR' }} {...errorState} />
            )}
            {isEmpty && emptyState != null && (
                <CardEmptyState objectIllustration={{ object: 'ERROR' }} {...emptyState} />
            )}
            {isEmptyFiltered && emptyFilteredState != null && (
                <CardEmptyState objectIllustration={{ object: 'NOT_FOUND' }} {...emptyFilteredState} />
            )}
            {displayItems && paginatedChildren}
        </div>
    );
};
