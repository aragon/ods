import type { Meta, StoryObj } from '@storybook/react';
import { VoteDataListItem } from '..';
import { DataList } from '../../../../../core';

const meta: Meta<typeof VoteDataListItem.Structure> = {
    title: 'Modules/Components/Votes/VotesDataListItem/VotesDataListItem.Structure',
    component: VoteDataListItem.Structure,
    tags: ['autodocs'],
    parameters: {
        design: {
            type: 'figma',
            url: 'https://www.figma.com/design/ISSDryshtEpB7SUSdNqAcw/Aragon-ODS?m=auto&node-id=17239-29368&t=peSiBlLobN0veIUU-1',
        },
    },
};

type Story = StoryObj<typeof VoteDataListItem.Structure>;

/**
 * Default usage example of the VotesDataListItem module component.
 */
export const Default: Story = {
    args: {
        voter: { address: '0x1234567890123456789012345678901234567890', name: 'vitalik.eth' },
        voteIndicator: 'yes',
        voteTokenAmount: 1230000,
        voteTokenSymbol: 'PDC',
    },
    render: (args) => (
        <DataList.Root entityLabel="Members">
            <DataList.Container>
                <VoteDataListItem.Structure {...args} />
            </DataList.Container>
        </DataList.Root>
    ),
};

export default meta;
