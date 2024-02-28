import { render, screen } from '@testing-library/react';
import { DataListContextProvider, type IDataListContext } from '../dataListContext';
import { dataListTestUtils } from '../dataListTestUtils';
import { DataListItem, type IDataListItemProps } from './dataListItem';

describe('<DataList.Item /> component', () => {
    const createTestComponent = (values?: {
        props?: Partial<IDataListItemProps>;
        context?: Partial<IDataListContext>;
    }) => {
        const completeProps = {
            ...values?.props,
        };

        return (
            <DataListContextProvider value={dataListTestUtils.generateContextValues(values?.context)}>
                <DataListItem {...completeProps} />
            </DataListContextProvider>
        );
    };

    it('renders a link with the given content', () => {
        const props = { children: 'test-data-list-item', href: '/test' };
        render(createTestComponent({ props }));
        expect(screen.getByRole('link', { name: props.children })).toBeInTheDocument();
    });

    it('marks the item as hidden when the data list is on initialLoading state', () => {
        const context = { state: 'initialLoading' as const };
        const props = { href: '/test' };
        render(createTestComponent({ context, props }));
        expect(screen.queryByRole('link')).not.toBeInTheDocument();
    });

    it('marks the item as hidden when the data list is on loading state with no elements being currently rendered', () => {
        const context = { state: 'loading' as const, childrenItemCount: 0 };
        const props = { href: '/test' };
        render(createTestComponent({ context, props }));
        expect(screen.queryByRole('link')).not.toBeInTheDocument();
    });
});
