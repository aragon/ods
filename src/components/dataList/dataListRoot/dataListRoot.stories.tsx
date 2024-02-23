import type { Meta, StoryObj } from '@storybook/react';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { Avatar } from '../../avatars';
import { DataListItem } from '../dataListItem';
import { DataList, type IDataListRootProps } from '../index';
import type { DataListState } from './dataListRoot';

const meta: Meta<typeof DataList.Root> = {
    title: 'components/DataList/DataList.Root',
    component: DataList.Root,
    tags: ['autodocs'],
    parameters: {
        design: {
            type: 'figma',
            url: 'TODO',
        },
    },
};

type Story = StoryObj<typeof DataList.Root>;

const ListItemComponent = (props: { id: number }) => (
    <DataListItem className="flex flex-row gap-2" href="https://aragon.org" target="_blank">
        <Avatar />
        <p className="grow text-base font-normal leading-normal text-neutral-800">#{props.id}</p>
        <p className="text-sm font-normal leading-normal text-neutral-500">Some info</p>
    </DataListItem>
);

const ListItemComponentLoading = () => (
    <DataListItem className="flex animate-pulse flex-row items-center gap-2">
        <div className="size-6 rounded-full bg-neutral-50" />
        <div className="flex grow flex-col gap-2">
            <div className="h-2 grow rounded bg-neutral-50" />
            <div className="h-2 w-1/3 rounded bg-neutral-50" />
        </div>
    </DataListItem>
);

const StaticListComponent = (props: IDataListRootProps) => {
    const { itemsCount, ...otherProps } = props;

    const [searchValue, setSearchValue] = useState<string>();
    const [activeSort, setActiveSort] = useState<string>('id_asc');

    const sortItems = useMemo(
        () => [
            { value: 'id_asc', label: 'Sort by increasing ID' },
            { value: 'id_desc', label: 'Sort by decreasing ID' },
        ],
        [],
    );

    const userIds = useMemo(() => [...Array(itemsCount)].map(() => Math.floor(Math.random() * 10_000)), [itemsCount]);

    const filteredUsers = useMemo(() => {
        const shouldFilter = searchValue != null && searchValue.trim().length > 0;
        const newFilteredUsers = shouldFilter ? userIds.filter((id) => id.toString().includes(searchValue)) : userIds;
        return newFilteredUsers.toSorted((a, b) => (activeSort === 'id_asc' ? a - b : b - a));
    }, [userIds, searchValue, activeSort]);

    return (
        <DataList.Root itemsCount={filteredUsers?.length} {...otherProps}>
            <DataList.Filter
                onFilterClick={() => alert('filter click')}
                searchValue={searchValue}
                onSearchValueChange={setSearchValue}
                placeholder="Filter by user id"
                activeSort={activeSort}
                onSortChange={setActiveSort}
                sortItems={sortItems}
            />
            <DataList.Container>
                {filteredUsers?.map((id) => <ListItemComponent key={id} id={id} />)}
            </DataList.Container>
            <DataList.Pagination />
        </DataList.Root>
    );
};

/**
 * Usage of the DataList.Root component with a static list of items.
 */
export const StaticList: Story = {
    args: {
        maxItems: 4,
        itemsCount: 21,
    },
    render: (props) => <StaticListComponent {...props} />,
};

const AsyncListComponent = (props: IDataListRootProps) => {
    const { itemsCount, maxItems, ...otherProps } = props;

    const [dataListState, setDataListState] = useState<DataListState | undefined>('initialLoading');
    const [searchValue, setSearchValue] = useState<string>();
    const [isLoading, setIsLoading] = useState(false);
    const [activeSort, setActiveSort] = useState<string>('id_asc');

    const sortItems = useMemo(
        () => [
            { value: 'id_asc', label: 'Sort by increasing ID' },
            { value: 'id_desc', label: 'Sort by decreasing ID' },
        ],
        [],
    );

    const userIds = useMemo(() => [...Array(itemsCount)].map(() => Math.floor(Math.random() * 10_000)), [itemsCount]);
    const [filteredUsers, setFilteredUsers] = useState(userIds.slice(0, maxItems));

    const sortUsers = useCallback(
        (users: number[] = [], sort: string) => users?.toSorted((a, b) => (sort === 'id_asc' ? a - b : b - a)),
        [],
    );

    const handleLoadMore = () => {
        setDataListState('fetchingNextPage');
        setTimeout(() => {
            const arrayEnd = Math.min(itemsCount ?? 0, filteredUsers.length + (maxItems ?? 0));
            setFilteredUsers(userIds.slice(0, arrayEnd));
            setDataListState('idle');
        }, 1_000);
    };

    const handleSortChange = (newSort: string) => {
        setIsLoading(true);
        setDataListState('loading');
        setActiveSort(newSort);

        setTimeout(() => {
            setFilteredUsers((current) => sortUsers(current, newSort));
            setIsLoading(false);
            setDataListState('idle');
        }, 1_000);
    };

    /*
    useEffect(() => {
        setIsLoading(true);
        const timeout = setTimeout(() => {
            setFilteredUsers((current) => {
                const shouldFilter = searchValue != null && searchValue.trim().length > 0;
                const newFilteredUsers = shouldFilter
                    ? current?.filter((id) => id.toString().includes(searchValue))
                    : current;
                const newSortedUsers = newFilteredUsers?.toSorted((a, b) => (activeSort === 'id_asc' ? a - b : b - a));

                return newSortedUsers;
            });
            setIsLoading(false);
        }, 1_000);

        return () => clearTimeout(timeout);
    }, [searchValue, activeSort]);
    */

    useEffect(() => {
        setTimeout(() => setDataListState('idle'), 1_000);
    }, []);

    return (
        <DataList.Root
            itemsCount={itemsCount}
            maxItems={maxItems}
            state={dataListState}
            onLoadMore={handleLoadMore}
            {...otherProps}
        >
            <DataList.Filter
                onFilterClick={() => alert('filter click')}
                searchValue={searchValue}
                onSearchValueChange={setSearchValue}
                isLoading={isLoading}
                placeholder="Filter by user id"
                activeSort={activeSort}
                onSortChange={handleSortChange}
                sortItems={sortItems}
            />
            <DataList.Container SkeltonElement={ListItemComponentLoading}>
                {filteredUsers?.map((id) => <ListItemComponent key={id} id={id} />)}
            </DataList.Container>
            <DataList.Pagination />
        </DataList.Root>
    );
};

/**
 * Usage of the DataList.Root component with an async loaded list.
 */
export const AsyncList: Story = {
    args: {
        maxItems: 6,
        itemsCount: 35,
    },
    render: ({ onLoadMore, ...props }) => <AsyncListComponent {...props} />,
};

export default meta;
