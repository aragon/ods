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

    const entityLabel = filteredUsers.length > 1 ? 'Users' : 'User';

    return (
        <DataList.Root itemsCount={filteredUsers?.length} {...otherProps} entityLabel={entityLabel}>
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

const dbUsers = [...Array(122)].map(() => Math.floor(Math.random() * 100_000));

const getUsers = (search = '', page = 0, sort = 'id_asc', pageSize = 6) => {
    const sortUsers = (users: number[] = [], sort: string) =>
        users?.toSorted((a, b) => (sort === 'id_asc' ? a - b : b - a));

    const paginateUsers = (users: number[] = [], page = 0, pageSize = 6) =>
        users.slice(0, Math.min(dbUsers.length, (page + 1) * pageSize));

    const filterUsers = (users: number[] = [], value?: string) =>
        value != null && value.trim().length > 0 ? users.filter((id) => id.toString().includes(value)) : users;

    const filteredUsers = filterUsers(dbUsers, search);
    const sortedUsers = sortUsers(filteredUsers, sort);
    const paginatedUsers = paginateUsers(sortedUsers, page, pageSize);

    return { total: filteredUsers.length, items: paginatedUsers };
};

const AsyncListComponent = (props: IDataListRootProps) => {
    const { itemsCount, maxItems, ...otherProps } = props;

    const [dataListState, setDataListState] = useState<DataListState | undefined>('initialLoading');

    const [currentPage, setCurrentPage] = useState(0);
    const [searchValue, setSearchValue] = useState<string>();
    const [activeSort, setActiveSort] = useState('id_asc');
    const [users, setUsers] = useState(getUsers(searchValue, currentPage, activeSort, maxItems));

    const requestTimeout = useRef<NodeJS.Timeout>();

    const sortItems = useMemo(
        () => [
            { value: 'id_asc', label: 'Sort by increasing ID' },
            { value: 'id_desc', label: 'Sort by decreasing ID' },
        ],
        [],
    );

    const handleLoadMore = () => {
        setDataListState('fetchingNextPage');
        setCurrentPage((current) => current + 1);
    };
    const handleSortChange = (newSort: string) => setActiveSort(newSort);
    const handleSearchValueChange = (value?: string) => {
        setSearchValue(value);
        setCurrentPage(0);
    };

    useEffect(() => {
        setTimeout(() => setDataListState('idle'), 1_000);
    }, []);

    useEffect(() => {
        setDataListState((state) => (state !== 'fetchingNextPage' ? 'loading' : 'fetchingNextPage'));

        requestTimeout.current = setTimeout(() => {
            const newUsers = getUsers(searchValue, currentPage, activeSort, maxItems);
            setUsers(newUsers);
            setDataListState('idle');
        }, 1_000);

        return () => {
            clearTimeout(requestTimeout.current);
        };
    }, [searchValue, currentPage, activeSort, maxItems]);

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

    const entityLabel = users.total > 1 ? 'Users' : 'User';

    return (
        <DataList.Root
            itemsCount={users.total}
            maxItems={maxItems}
            state={dataListState}
            onLoadMore={handleLoadMore}
            {...otherProps}
            entityLabel={entityLabel}
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
                emptyState={users.total === 0 ? emptyState : noResultsState}
            >
                {users.items.map((id) => (
                    <ListItemComponent key={id} id={id} />
                ))}
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
        itemsCount: dbUsers.length,
    },
    render: ({ onLoadMore, ...props }) => <AsyncListComponent {...props} />,
};

export default meta;
