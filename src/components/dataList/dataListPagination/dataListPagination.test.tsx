import { render, screen } from '@testing-library/react';
import { DataListContextProvider, type IDataListContext } from '../dataListContext';
import { dataListTestUtils } from '../dataListTestUtils';
import { DataListPagination, type IDataListPaginationProps } from './dataListPagination';

describe('<DataList.Pagination /> component', () => {
    const createTestComponent = (values?: {
        props?: Partial<IDataListPaginationProps>;
        context?: Partial<IDataListContext>;
    }) => {
        const completeProps: IDataListPaginationProps = {
            ...values?.props,
        };

        return (
            <DataListContextProvider value={dataListTestUtils.generateContextValues(values?.context)}>
                <DataListPagination {...completeProps} />
            </DataListContextProvider>
        );
    };

    it('renders a load more button when state is idle and data list has elements to render', () => {
        const context = { state: 'idle' as const, childrenItemCount: 10 };
        render(createTestComponent({ context }));
        expect(screen.getByRole('button', { name: 'More' })).toBeInTheDocument();
    });

    it('renders nothing on initialLoading state', () => {
        const context = { state: 'initialLoading' as const, childrenItemCount: 3 };
        render(createTestComponent({ context }));
        expect(screen.queryByRole('button')).not.toBeInTheDocument();
    });

    it('renders nothing on error state', () => {
        const context = { state: 'error' as const, childrenItemCount: 3 };
        render(createTestComponent({ context }));
        expect(screen.queryByRole('button')).not.toBeInTheDocument();
    });

    it('renders nothing when data list has not elements to render', () => {
        const context = { state: 'idle' as const, childrenItemCount: 0 };
        render(createTestComponent({ context }));
        expect(screen.queryByRole('button')).not.toBeInTheDocument();
    });

    it('renders a progress bar and an info text regarding current elements when itemsCount is set and greater than 0', () => {
        const context = { state: 'idle' as const, childrenItemCount: 2, maxItems: 5, itemsCount: 212 };
        render(createTestComponent({ context }));
        expect(screen.getByRole('progressbar')).toBeInTheDocument();
        expect(screen.getByText(context.childrenItemCount)).toBeInTheDocument();
        expect(screen.getByText(`of ${context.itemsCount}`)).toBeInTheDocument();
    });

    it('correctly display the current rendered items for static lists', () => {
        const context = { state: 'idle' as const, currentPage: 0, maxItems: 5, childrenItemCount: 30, itemsCount: 30 };
        render(createTestComponent({ context }));
        expect(screen.getByText((context.currentPage + 1) * context.maxItems)).toBeInTheDocument();
    });

    it('correctly calculates current progress from the current page and total items', () => {
        const context = {
            state: 'idle' as const,
            currentPage: 0,
            maxItems: 10,
            childrenItemCount: 10,
            itemsCount: 100,
        };
        render(createTestComponent({ context }));
        expect(screen.getByRole('progressbar').getAttribute('data-value')).toEqual('10');
    });
});
