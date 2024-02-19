import type { Meta, StoryObj } from '@storybook/react';
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
    render: (props) => (
        <DataList.Root {...props}>
            <DataList.Filter />
            <DataList.Container>
                {[...Array(props.itemsCount).fill(0)].map((_value, index) => (
                    <DataList.Item key={index} href="https://aragon.org" target="_blank">
                        <ListItemComponent />
                    </DataList.Item>
                ))}
            </DataList.Container>
            <DataList.Pagination />
        </DataList.Root>
    ),
    args: {
        maxItems: 12,
        itemsCount: 55,
    },
};

export default meta;
