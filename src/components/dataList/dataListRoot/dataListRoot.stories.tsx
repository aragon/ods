import type { Meta, StoryObj } from '@storybook/react';
import { useEffect, useMemo, useRef, useState } from 'react';
import { Avatar } from '../../avatars';
import { IconType } from '../../icon';
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
    const [activeSort, setActiveSort] = useState<string>('id_asc');

    const searchTimeout = useRef<NodeJS.Timeout>();

    const sortItems = useMemo(
        () => [
            { value: 'id_asc', label: 'Sort by increasing ID' },
            { value: 'id_desc', label: 'Sort by decreasing ID' },
        ],
        [],
    );

    const userIds = useMemo(() => [...Array(itemsCount)].map(() => Math.floor(Math.random() * 10_000)), [itemsCount]);
    const [filteredUsers, setFilteredUsers] = useState(userIds.slice(0, maxItems));

    const sortUsers = (users: number[] = [], sort: string) =>
        users?.toSorted((a, b) => (sort === 'id_asc' ? a - b : b - a));

    const paginateUsers = (users: number[] = []) =>
        users.slice(0, Math.min(itemsCount ?? 0, filteredUsers.length + (maxItems ?? 0)));

    const filterUsers = (users: number[] = [], value?: string) =>
        value != null && value.trim().length > 0 ? users.filter((id) => id.toString().includes(value)) : users;

    const handleLoadMore = () => {
        setDataListState('fetchingNextPage');
        setTimeout(() => {
            const newUsers = paginateUsers(sortUsers(filterUsers(userIds, searchValue), activeSort));
            setFilteredUsers(newUsers);
            setDataListState('idle');
        }, 1_000);
    };

    const handleSortChange = (newSort: string) => {
        setDataListState('loading');
        setActiveSort(newSort);

        setTimeout(() => {
            setFilteredUsers((current) => sortUsers(current, newSort));
            setDataListState('idle');
        }, 1_000);
    };

    const handleSearchValueChange = (value?: string) => {
        setDataListState('loading');
        setSearchValue(value);
        clearTimeout(searchTimeout.current);

        const timeout = setTimeout(() => {
            const newUsers = paginateUsers(sortUsers(filterUsers(userIds, value), activeSort));
            setFilteredUsers(newUsers);
            setDataListState('idle');
        }, 1_000);

        searchTimeout.current = timeout;
    };

    useEffect(() => {
        setTimeout(() => setDataListState('idle'), 1_000);
    }, []);

    const noResultsState = {
        objectIllustration: { object: 'NOT_FOUND' as const },
        heading: 'No users found',
        description: 'Your applied filters are not matching with any results. Reset and search with other filters!',
        primaryButton: {
            label: 'Reset all filters',
            iconLeft: IconType.RELOAD,
            onClick: () => handleSearchValueChange(undefined),
        },
    };

    const emptyState = {
        objectIllustration: { object: 'ERROR' as const },
        heading: 'No users found',
        description: 'Set the itemCount property to be greater than 0 to generate and display the users list',
        secondaryButton: {
            label: 'Learn more',
            iconRight: IconType.LINK_EXTERNAL,
            target: '_blank',
            href: 'https://storybook.js.org/docs/writing-stories/args',
        },
    };

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
                onSearchValueChange={handleSearchValueChange}
                placeholder="Filter by user id"
                activeSort={activeSort}
                onSortChange={handleSortChange}
                sortItems={sortItems}
            />
            <DataList.Container
                SkeltonElement={ListItemComponentLoading}
                errorState={{
                    objectIllustration: { object: 'ERROR' },
                    heading: 'Error loading users',
                    description: 'There was an error loading the users. Try again!',
                    primaryButton: {
                        label: 'Reload users',
                        iconLeft: IconType.RELOAD,
                        onClick: () => alert('reload!'),
                    },
                }}
                emptyState={itemsCount === 0 ? emptyState : noResultsState}
            >
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
