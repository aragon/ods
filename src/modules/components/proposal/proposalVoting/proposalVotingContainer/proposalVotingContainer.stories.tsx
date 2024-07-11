import type { Meta, StoryObj } from '@storybook/react';
import { ProposalVotingStage } from '../proposalVotingStage';
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
 * Default usage example of the ProposalVotingContainer module component.
 */
export const Default: Story = {
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

export default meta;
