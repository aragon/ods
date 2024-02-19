import { DataListContainer } from './dataListContainer';
import { DataListFilter } from './dataListFilter';
import { DataListItem } from './dataListItem';
import { DataListPagination } from './dataListPagination';
import { DataListRoot } from './dataListRoot';

export type { IDataListContainerProps } from './dataListContainer';
export type { IDataListFilterProps } from './dataListFilter';
export type { IDataListItemProps } from './dataListItem';
export type { IDataListPaginationProps } from './dataListPagination';
export type { IDataListRootProps } from './dataListRoot';

export const DataList = {
    Root: DataListRoot,
    Filter: DataListFilter,
    Container: DataListContainer,
    Item: DataListItem,
    Pagination: DataListPagination,
};
