import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { DataListContextProvider, type IDataListContext } from '../dataListContext';
import { dataListTestUtils } from '../dataListTestUtils';
import { DataListFilterStatus, type IDataListFilterStatusProps } from './dataListFilterStatus';

describe('<DataListFilterStatus /> component', () => {
    const createTestComponent = (values?: {
        props?: Partial<IDataListFilterStatusProps>;
        context?: Partial<IDataListContext>;
    }) => {
        const completeProps = { ...values?.props };

        return (
            <DataListContextProvider value={dataListTestUtils.generateContextValues(values?.context)}>
                <DataListFilterStatus {...completeProps} />
            </DataListContextProvider>
        );
    };

    it('renders current itemsCount and entity label when state is idle and itemsCount is greater than 0', () => {
        const context = { state: 'idle' as const, itemsCount: 5, entityLabel: 'Tests' };
        render(createTestComponent({ context }));
        expect(screen.getByText(context.itemsCount)).toBeInTheDocument();
        expect(screen.getByText(context.entityLabel)).toBeInTheDocument();
    });

    it('renders loading and entity label text on initialLoading state', () => {
        const context = { state: 'initialLoading' as const, entityLabel: 'Entities' };
        render(createTestComponent({ context }));
        expect(screen.getByText(`Loading ${context.entityLabel}`)).toBeInTheDocument();
    });

    it('renders filtering and entity label text on loading state', () => {
        const context = { state: 'loading' as const, entityLabel: 'Entities' };
        render(createTestComponent({ context }));
        expect(screen.getByText(`Filtering ${context.entityLabel}`)).toBeInTheDocument();
    });

    it('renders found text on filtered state', () => {
        const context = { state: 'filtered' as const, entityLabel: 'test', itemsCount: 13 };
        render(createTestComponent({ context }));
        expect(screen.getByText('Found')).toBeInTheDocument();
        expect(screen.getByText(context.itemsCount)).toBeInTheDocument();
        expect(screen.getByText(context.entityLabel)).toBeInTheDocument();
    });

    it('does not render entityLabel on error state', () => {
        const context = { state: 'error' as const, entityLabel: 'test' };
        render(createTestComponent({ context }));
        expect(screen.queryByText(context.entityLabel)).not.toBeInTheDocument();
    });

    it('does not render entityLabel on idle state with no items to render', () => {
        const context = { state: 'idle' as const, entityLabel: 'test', itemsCount: 0 };
        render(createTestComponent({ context }));
        expect(screen.queryByText(context.entityLabel)).not.toBeInTheDocument();
    });

    it('renders the reset filters button when the onResetFiltersClick property is defined', () => {
        const props = { onResetFiltersClick: jest.fn() };
        const context = { state: 'filtered' as const };
        render(createTestComponent({ props, context }));
        expect(screen.getByRole('button', { name: 'Reset all filters' })).toBeInTheDocument();
    });

    it('does not render the reset filters button when the onResetFiltersClick property is not defined', () => {
        const context = { state: 'filtered' as const };
        render(createTestComponent({ context }));
        expect(screen.queryByRole('button', { name: 'Reset all filters' })).not.toBeInTheDocument();
    });

    it('calls the onResetFiltersClick callback on button click', async () => {
        const user = userEvent.setup();
        const props = { onResetFiltersClick: jest.fn() };
        const context = { state: 'filtered' as const };
        render(createTestComponent({ props, context }));
        await user.click(screen.getByRole('button', { name: 'Reset all filters' }));
        expect(props.onResetFiltersClick).toHaveBeenCalled();
    });
});
