import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Avatar } from '../../avatars';
import { DataList } from '../index';

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

const ListItemComponent = () => (
    <div className="flex flex-row gap-2">
        <Avatar />
        <p className="grow text-base font-normal leading-normal">User {Math.floor(Math.random() * 10000)}</p>
        <p className="text-sm font-normal leading-normal text-neutral-500">Some info</p>
    </div>
);

/**
 * Default usage example of the DataList.Root component.
 */
export const Default: Story = {
    args: {
        maxItems: 12,
        itemsCount: 55,
    },
    render: (props) => {
        const [searchValue, setSearchValue] = useState<string>();
        const [isLoading, setIsLoading] = useState(false);

        const handleSearchChange = (value?: string) => {
            setSearchValue(value);
            setIsLoading(true);
            setTimeout(() => setIsLoading(false), 1000);
        };

        return (
            <DataList.Root {...props}>
                <DataList.Filter
                    onFilterClick={() => alert('filter click')}
                    searchValue={searchValue}
                    onSearchValueChange={handleSearchChange}
                    isLoading={isLoading}
                />
                <DataList.Container>
                    {[...Array(props.itemsCount).fill(0)].map((_value, index) => (
                        <DataList.Item key={index} href="https://aragon.org" target="_blank">
                            <ListItemComponent />
                        </DataList.Item>
                    ))}
                </DataList.Container>
                <DataList.Pagination />
            </DataList.Root>
        );
    },
};

export default meta;
