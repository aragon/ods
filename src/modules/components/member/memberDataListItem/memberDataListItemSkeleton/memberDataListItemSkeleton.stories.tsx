import type { Meta, StoryObj } from '@storybook/react';
import { MemberDataListItem } from '../../../..';
import { DataList } from '../../../../../core';

const meta: Meta<typeof MemberDataListItem.Skeleton> = {
    title: 'Modules/Components/Member/MemberDataListItem/MemberDataListItem.Skeleton',
    component: MemberDataListItem.Skeleton,
    parameters: {
        design: {
            type: 'figma',
            url: 'https://www.figma.com/design/ISSDryshtEpB7SUSdNqAcw/branch/P0GeJKqILL7UXvaqu5Jj7V/Aragon-ODS?m=auto&node-id=14385%3A25034&t=E0kPRQYhJqWbVmAh-1',
        },
    },
};

type Story = StoryObj<typeof MemberDataListItem.Skeleton>;

/**
 * Default usage example of the MemberDataListItemSkeleton component.
 */
export const Default: Story = {
    render: () => (
        <DataList.Root entityLabel="Proposal" state="initialLoading" pageSize={1}>
            <DataList.Container SkeletonElement={MemberDataListItem.Skeleton} />
        </DataList.Root>
    ),
};

export default meta;
