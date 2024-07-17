import type { Meta, StoryObj } from '@storybook/react';
import { Tabs } from '../../../../../core';
import { ProposalVoting } from '../index';
import { ProposalVotingTab } from '../proposalVotingDefinitions';

const meta: Meta<typeof ProposalVoting.Details> = {
    title: 'Modules/Components/Proposal/ProposalVoting/ProposalVoting.Details',
    component: ProposalVoting.Details,
    parameters: {
        design: {
            type: 'figma',
            url: 'https://www.figma.com/design/ISSDryshtEpB7SUSdNqAcw/Aragon-ODS?node-id=16738-17822&m=dev',
        },
    },
};

type Story = StoryObj<typeof ProposalVoting.Details>;

/**
 * Default usage example of the ProposalVoting.Details component.
 */
export const Default: Story = {
    args: {
        settings: [
            { term: 'Strategy', value: '1 Address → 1 Vote' },
            { term: 'Voting options', value: 'Approve' },
            { term: 'Minimum approval', value: '3 of 5' },
        ],
    },
    render: (args) => {
        return (
            <Tabs.Root defaultValue={ProposalVotingTab.DETAILS} className="w-full">
                <ProposalVoting.Details {...args} />
            </Tabs.Root>
        );
    },
};

export default meta;
