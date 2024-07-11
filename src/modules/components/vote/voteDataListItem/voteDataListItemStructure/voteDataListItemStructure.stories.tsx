import type { Meta, StoryObj } from '@storybook/react';
import { VoteDataListItem } from '..';
import { DataList } from '../../../../../core';

const meta: Meta<typeof VoteDataListItem.Structure> = {
    title: 'Modules/Components/Vote/VoteDataListItem/VoteDataListItem.Structure',
    component: VoteDataListItem.Structure,
    parameters: {
        design: {
            type: 'figma',
            url: 'https://www.figma.com/design/ISSDryshtEpB7SUSdNqAcw/Aragon-ODS?m=auto&node-id=17239-29368&t=peSiBlLobN0veIUU-1',
        },
    },
};

type Story = StoryObj<typeof VoteDataListItem.Structure>;

/**
 * Usage example of the VotesDataListItem module component for a token based vote.
 */
export const TokenVoting: Story = {
    args: {
        voter: { address: '0x1234567890123456789012345678901234567890', name: 'vitalik.eth' },
        voteIndicator: 'yes',
        votingPower: 1230000,
        tokenSymbol: 'PDC',
    },
    render: (args) => (
        <DataList.Root entityLabel="Votes">
            <DataList.Container>
                <VoteDataListItem.Structure {...args} />
            </DataList.Container>
        </DataList.Root>
    ),
};

/**
 * Usage example of the VotesDataListItem module component for a multisig vote.
 */
export const Multisig: Story = {
    args: {
        voter: { address: '0x1234567890123456789012345678901234567890', name: 'vitalik.eth' },
        voteIndicator: 'approve',
    },
    render: (args) => (
        <DataList.Root entityLabel="Votes">
            <DataList.Container>
                <VoteDataListItem.Structure {...args} />
            </DataList.Container>
        </DataList.Root>
    ),
};

/**
 * Usage example of the VotesDataListItem module component for a token based vote with large number and long ens name.
 */
export const TokenVotingLongNames: Story = {
    args: {
        voter: {
            address: '0x1234567890123456789012345678901234567890',
            name: 'theLongestEnsDomainEverThatWillTruncateWhenNeeded.eth',
        },
        voteIndicator: 'yes',
        votingPower: 123456789,
        tokenSymbol: 'PDC',
    },
    render: (args) => (
        <DataList.Root entityLabel="Votes">
            <DataList.Container>
                <VoteDataListItem.Structure {...args} />
            </DataList.Container>
        </DataList.Root>
    ),
};

export default meta;
