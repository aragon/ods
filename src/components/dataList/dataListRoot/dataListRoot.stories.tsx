import type { Meta, StoryObj } from '@storybook/react';
import { useEffect, useMemo, useState } from 'react';
import { Avatar } from '../../avatars';
import { DataListItem } from '../dataListItem';
import { DataList, type IDataListRootProps } from '../index';

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
        <p className="grow text-base font-normal leading-normal">#{props.id}</p>
        <p className="text-sm font-normal leading-normal text-neutral-500">Some info</p>
    </DataListItem>
);

const ListItemComponentLoading = () => (
    <DataListItem className="flex animate-pulse flex-row items-center gap-2">
        <Avatar />
        <div className="flex grow flex-col gap-2">
            <div className="h-2 grow rounded bg-neutral-50" />
            <div className="h-2 w-1/3 rounded bg-neutral-50" />
        </div>
    </DataListItem>
);

const DefaultComponent = (props: IDataListRootProps) => {
    const { itemsCount, ...otherProps } = props;

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
    const [filteredUsers, setFilteredUsers] = useState(userIds);

    useEffect(() => {
        setIsLoading(true);
        const timeout = setTimeout(() => {
            const shouldFilter = searchValue != null && searchValue.trim().length > 0;
            const newFilteredUsers = shouldFilter
                ? userIds.filter((id) => id.toString().includes(searchValue))
                : userIds;
            const newSortedUsers = newFilteredUsers.toSorted((a, b) => (activeSort === 'id_asc' ? a - b : b - a));
            setIsLoading(false);
            setFilteredUsers(newSortedUsers);
        }, 1_000);

        return () => clearTimeout(timeout);
    }, [searchValue, activeSort, userIds]);

    return (
        <DataList.Root itemsCount={filteredUsers.length} {...otherProps}>
            <DataList.Filter
                onFilterClick={() => alert('filter click')}
                searchValue={searchValue}
                onSearchValueChange={setSearchValue}
                isLoading={isLoading}
                placeholder="Filter by user id"
                activeSort={activeSort}
                onSortChange={setActiveSort}
                sortItems={sortItems}
            />
            <DataList.Container SkeltonElement={ListItemComponentLoading}>
                {filteredUsers.map((id) => (
                    <ListItemComponent key={id} id={id} />
                ))}
            </DataList.Container>
            <DataList.Pagination />
        </DataList.Root>
    );
};

/**
 * Default usage example of the DataList.Root component.
 */
export const Default: Story = {
    args: {
        maxItems: 12,
        itemsCount: 55,
    },
    render: (props) => <DefaultComponent {...props} />,
};

export default meta;
