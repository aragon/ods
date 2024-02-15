import { DataListContainer } from './dataListContainer';
import { DataListItem } from './dataListItem';
import { DataListPagination } from './dataListPagination';
import { DataListRoot } from './dataListRoot';

export type { IDataListContainerProps } from './dataListContainer';
export type { IDataListItemProps } from './dataListItem';
export type { IDataListPaginationProps } from './dataListPagination';
export type { IDataListRootProps } from './dataListRoot';

export const DataList = {
    Container: DataListContainer,
    Item: DataListItem,
    Root: DataListRoot,
    Pagination: DataListPagination,
};
