import classNames from 'classnames';
import { useMemo, useState, type ComponentProps } from 'react';
import { DataListContextProvider } from '../dataListContext';

export type DataListState = 'loading' | 'error';

export interface IDataListRootProps extends ComponentProps<'div'> {
    /**
     * Total number of items.
     */
    itemsCount?: number;
    /**
     * Number to items to render per page.
     * @default 12
     */
    maxItems?: number;
    /**
     * State of the data list component:
     * - Loading: no data has been loaded yet.
     * - Error: an error has occurred while fetching the data.
     */
    state?: DataListState;
    /**
     * Callback called on load-more button click.
     */
    onLoadMore?: () => void;
}

export const DataListRoot: React.FC<IDataListRootProps> = (props) => {
    const { children, maxItems = 12, itemsCount, onLoadMore, className, state, ...otherProps } = props;

    const [childrenItemCount, setChildrenItemCount] = useState<number>();
    const [currentPage, setCurrentPage] = useState(0);

    const contextValues = useMemo(
        () => ({ childrenItemCount, setChildrenItemCount, maxItems, itemsCount, currentPage, setCurrentPage, state }),
        [childrenItemCount, maxItems, currentPage, itemsCount, state],
    );

    return (
        <DataListContextProvider value={contextValues}>
            <div className={classNames('flex grow flex-col gap-4', className)} {...otherProps}>
                {children}
            </div>
        </DataListContextProvider>
    );
};
