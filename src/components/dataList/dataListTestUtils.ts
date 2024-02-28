import type { IDataListContext } from './dataListContext';

class DataListTestUtils {
    generateContextValues = (values?: Partial<IDataListContext>): IDataListContext => ({
        childrenItemCount: 0,
        setChildrenItemCount: jest.fn(),
        currentPage: 0,
        handleLoadMore: jest.fn(),
        pageSize: 6,
        entityLabel: '',
        ...values,
    });
}

export const dataListTestUtils = new DataListTestUtils();
