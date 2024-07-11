import type { Meta, StoryObj } from '@storybook/react';
import { ProposalVotingStage } from '../proposalVotingStage';
import { ProposalVotingTabs } from '../proposalVotingTabs';
import { ProposalVotingContainer } from './proposalVotingContainer';

const meta: Meta<typeof ProposalVotingContainer> = {
    title: 'Modules/Components/Proposal/ProposalVoting/ProposalVoting.Container',
    component: ProposalVotingContainer,
    parameters: {
        design: {
            type: 'figma',
            url: 'https://www.figma.com/design/ISSDryshtEpB7SUSdNqAcw/Aragon-ODS?node-id=16752-20193&m=dev',
        },
    },
};

type Story = StoryObj<typeof ProposalVotingContainer>;

/**
 * Usage example of the ProposalVotingContainer module component for multi-stage proposals
 */
export const MultiStage: Story = {
    render: (args) => (
        <ProposalVotingContainer {...args} style={{ maxWidth: 560 }}>
            <ProposalVotingStage name="Token holder voting" status="active" startDate={0} value="token-holder" />
            <ProposalVotingStage name="Founders approval" status="pending" startDate={0} value="founders" />
        </ProposalVotingContainer>
    ),
    args: {
        title: 'Voting',
        description:
            'The proposal must pass all governance stages to be accepted and potential onchain actions to execute.',
    },
};

/**
 * Usage example of the ProposalVotingContainer module component for single-stage proposals
 */
export const Single: Story = {
    render: (args) => (
        <ProposalVotingContainer {...args} style={{ maxWidth: 560 }}>
            <ProposalVotingTabs />
        </ProposalVotingContainer>
    ),
    args: {
        title: 'Voting',
        description: 'The proposal must pass the voting to be accepted and potential onchain actions to execute.',
    },
};

export default meta;
