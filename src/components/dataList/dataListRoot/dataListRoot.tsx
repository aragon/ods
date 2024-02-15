import classNames from 'classnames';
import { useMemo, useState, type ComponentProps } from 'react';
import { DataListContextProvider } from '../dataListContext';

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
     * Callback called on load-more button click.
     */
    onLoadMore?: () => void;
}

export const DataListRoot: React.FC<IDataListRootProps> = (props) => {
    const { children, maxItems = 12, itemsCount, onLoadMore, className, ...otherProps } = props;

    const [childrenItemCount, setChildrenItemCount] = useState<number>();
    const [currentPage, setCurrentPage] = useState(0);

    const contextValues = useMemo(
        () => ({ childrenItemCount, setChildrenItemCount, maxItems, currentPage }),
        [childrenItemCount, maxItems, currentPage],
    );

    return (
        <DataListContextProvider value={contextValues}>
            <div className={classNames('flex grow flex-col', className)} {...otherProps}>
                {children}
            </div>
        </DataListContextProvider>
    );
};
