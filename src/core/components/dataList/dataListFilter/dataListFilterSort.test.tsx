import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { IconType } from '../../icon';
import { DataListFilterSort, type IDataListFilterSortProps } from './dataListFilterSort';

describe('<DataListFilterSort /> component', () => {
    const createTestComponent = (props?: Partial<IDataListFilterSortProps>) => {
        const completeProps: IDataListFilterSortProps = {
            ...props,
        };

        return <DataListFilterSort {...completeProps} />;
    };

    it('renders a sort button when sortItems are defined', () => {
        const sortItems = [{ value: 'test', label: 'TEST', type: 'ASC' as const }];
        render(createTestComponent({ sortItems }));
        expect(screen.getByRole('button')).toBeInTheDocument();
    });

    it('renders nothing when sortItems is not defined', () => {
        render(createTestComponent({ sortItems: undefined }));
        expect(screen.queryByRole('button')).not.toBeInTheDocument();
    });

    it('renders nothing when sortItems array is empty', () => {
        render(createTestComponent({ sortItems: [] }));
        expect(screen.queryByRole('button')).not.toBeInTheDocument();
    });

    it('renders SORT_ASC icon when current sort has ASC type', () => {
        const sortItems = [
            { value: 'sort1', label: 'sort1', type: 'ASC' as const },
            { value: 'sort2', label: 'sort2', type: 'DESC' as const },
        ];
        render(createTestComponent({ sortItems, activeSort: sortItems[0].value }));
        expect(screen.getByTestId(IconType.SORT_ASC)).toBeInTheDocument();
    });

    it('renders SORT_DESC icon when current sort has DESC type', () => {
        const sortItems = [
            { value: 'sort1', label: 'sort1', type: 'ASC' as const },
            { value: 'sort2', label: 'sort2', type: 'DESC' as const },
        ];
        render(createTestComponent({ sortItems, activeSort: sortItems[1].value }));
        expect(screen.getByTestId(IconType.SORT_DESC)).toBeInTheDocument();
    });

    it('renders the trigger label when defined', () => {
        const triggerLabel = 'test-trigger';
        const sortItems = [{ value: 'test', label: 'TEST', type: 'ASC' as const }];
        render(createTestComponent({ triggerLabel, sortItems }));
        expect(screen.getByRole('button', { name: triggerLabel })).toBeInTheDocument();
    });

    it('renders the specified sort items on sort button click', async () => {
        const user = userEvent.setup();
        const sortItems = [
            { value: 't1', label: 'Test 1', type: 'ASC' as const },
            { value: 't2', label: 'Test 2', type: 'ASC' as const },
        ];
        render(createTestComponent({ sortItems }));
        await user.click(screen.getByRole('button'));

        expect(screen.getAllByRole('menuitem').length).toEqual(sortItems.length);
        expect(screen.getByRole('menuitem', { name: sortItems[0].label })).toBeInTheDocument();
        expect(screen.getByRole('menuitem', { name: sortItems[1].label })).toBeInTheDocument();
    });

    it('calls the onSortChange callback with selected sort item value on sort item click', async () => {
        const user = userEvent.setup();
        const onSortChange = jest.fn();
        const sortItems = [
            { value: 'value1', label: 'label1', type: 'ASC' as const },
            { value: 'value2', label: 'label2', type: 'ASC' as const },
        ];
        render(createTestComponent({ sortItems, onSortChange }));
        await user.click(screen.getByRole('button'));
        await user.click(screen.getByRole('menuitem', { name: sortItems[1].label }));
        expect(onSortChange).toHaveBeenCalledWith(sortItems[1].value);
    });
});
