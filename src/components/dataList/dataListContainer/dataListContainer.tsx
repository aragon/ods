import classNames from 'classnames';
import { Children, useEffect, useMemo, type ComponentProps, type ReactElement } from 'react';
import { useDataListContext } from '../dataListContext';
import { DataListContainerSkeletonLoader } from './dataListContainerSkeletonLoader';

export interface IDataListContainerProps extends ComponentProps<'div'> {
    /**
     * Skeleton element displayed when the DataList container state is set to loading.
     */
    SkeltonElement?: React.FC;
}

export const DataListContainer: React.FC<IDataListContainerProps> = (props) => {
    const { children, className, SkeltonElement, ...otherProps } = props;

    const { state, maxItems, currentPage, setChildrenItemCount } = useDataListContext();

    const processedChildren = Children.toArray(children) as ReactElement[];

    const SkeletonLoader = SkeltonElement ?? DataListContainerSkeletonLoader;

    const paginatedChildren = useMemo(
        () => processedChildren?.slice(0, maxItems * (currentPage + 1)) ?? [],
        [processedChildren, maxItems, currentPage],
    );

    useEffect(() => {
        setChildrenItemCount(processedChildren.length);
    }, [setChildrenItemCount, processedChildren.length]);

    return (
        <div className={classNames('flex flex-col gap-4', className)} {...otherProps}>
            <div className="flex flex-row justify-between">
                <p className="text-base font-normal leading-tight text-neutral-500">
                    {processedChildren.length} Members
                </p>
            </div>
            <div className="flex flex-col gap-2">
                {state === 'loading'
                    ? [...Array(maxItems)].map((_value, index) => <SkeletonLoader key={index} />)
                    : paginatedChildren}
            </div>
        </div>
    );
};
