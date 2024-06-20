import type { Meta, StoryObj } from '@storybook/react';
import { ProposalVoteDataListItem } from '..';
import { DataList } from '../../../../../core';

const meta: Meta<typeof ProposalVoteDataListItem.Skeleton> = {
    title: 'Modules/Components/Vote/ProposalVoteDataListItem/ProposalVoteDataListItem.Skeleton',
    component: ProposalVoteDataListItem.Skeleton,
    tags: ['autodocs'],
    parameters: {
        design: {
            type: 'figma',
            url: 'https://www.figma.com/design/ISSDryshtEpB7SUSdNqAcw/Aragon-ODS?node-id=17239-29368&m',
        },
    },
};

type Story = StoryObj<typeof ProposalVoteDataListItem.Skeleton>;

/**
 * Default usage example of the ProposalVoteDataListItem.Skeleton component.
 */
export const Default: Story = {
    render: () => (
        <DataList.Root entityLabel="Vote" state="initialLoading" pageSize={1}>
            <DataList.Container SkeletonElement={ProposalVoteDataListItem.Skeleton} />
        </DataList.Root>
    ),
};

export default meta;
