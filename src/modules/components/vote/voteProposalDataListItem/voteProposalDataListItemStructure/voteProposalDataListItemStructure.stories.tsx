import type { Meta, StoryObj } from '@storybook/react';
import { VoteProposalDataListItem } from '..';
import { DataList } from '../../../../../core';

const meta: Meta<typeof VoteProposalDataListItem.Structure> = {
    title: 'Modules/Components/Vote/VoteProposalDataListItem/VoteProposalDataListItem.Structure',
    component: VoteProposalDataListItem.Structure,
    parameters: {
        design: {
            type: 'figma',
            url: 'https://www.figma.com/design/ISSDryshtEpB7SUSdNqAcw/Aragon-ODS?node-id=17239-29368',
        },
    },
};

type Story = StoryObj<typeof VoteProposalDataListItem.Structure>;

/**
 * Usage example of the VotesDataListItem module component for a token based vote.
 */
export const TokenVoting: Story = {
    args: {
        proposalId: 'PIP-06',
        proposalTitle: 'Introduction of Layer 2 Scaling Solutions',
        voteIndicator: 'yes',
        date: 1613984914000,
    },
    render: (args) => (
        <DataList.Root entityLabel="proposalVote">
            <DataList.Container>
                <VoteProposalDataListItem.Structure {...args} />
            </DataList.Container>
        </DataList.Root>
    ),
};

/**
 * Usage example of the VotesDataListItem module component for a multisig vote.
 */
export const Multisig: Story = {
    args: {
        proposalId: 'PIP-06',
        proposalTitle: 'Introduction of Layer 2 Scaling Solutions',
        voteIndicator: 'approve',
        date: 1613984914000,
    },
    render: (args) => (
        <DataList.Root entityLabel="proposalVote">
            <DataList.Container>
                <VoteProposalDataListItem.Structure {...args} />
            </DataList.Container>
        </DataList.Root>
    ),
};

export default meta;
