import type { Meta, StoryObj } from '@storybook/react';
import { DataList } from '../../../../../core';
import { AssetDataListItem } from '../../assetDataListItem';

const meta: Meta<typeof AssetDataListItem.Skeleton> = {
    title: 'Modules/Components/Asset/AssetDataListItem/AssetDataListItem.Skeleton',
    component: AssetDataListItem.Skeleton,
    parameters: {
        design: {
            type: 'figma',
            url: 'https://www.figma.com/file/ISSDryshtEpB7SUSdNqAcw/branch/P0GeJKqILL7UXvaqu5Jj7V/Aragon-ODS?type=design&node-id=14367%3A10050&mode=design&t=rWmhVzPc3Ay010jV-1',
        },
    },
};

type Story = StoryObj<typeof AssetDataListItem.Skeleton>;

/**
 * Default usage example of the DaoDataListItemSkeleton component.
 */
export const Default: Story = {
    args: {},
    render: () => (
        <DataList.Root entityLabel="Asset" state="initialLoading" pageSize={1}>
            <DataList.Container SkeletonElement={AssetDataListItem.Skeleton} />
        </DataList.Root>
    ),
};

export default meta;
