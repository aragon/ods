import type { Meta, StoryObj } from '@storybook/react';
import { ProposalVoting } from '../index';

const meta: Meta<typeof ProposalVoting.Container> = {
    title: 'Modules/Components/Proposal/ProposalVoting/ProposalVoting.Container',
    component: ProposalVoting.Container,
    parameters: {
        design: {
            type: 'figma',
            url: 'https://www.figma.com/design/ISSDryshtEpB7SUSdNqAcw/Aragon-ODS?node-id=16752-20193&m=dev',
        },
    },
};

type Story = StoryObj<typeof ProposalVoting.Container>;

/**
 * Usage example of the ProposalVotingContainer module component for multi-stage proposals
 */
export const MultiStage: Story = {
    render: (args) => (
        <ProposalVoting.Container {...args} style={{ maxWidth: 560 }}>
            <ProposalVoting.Stage name="Token holder voting" status="active" startDate={0} value="token-holder">
                <ProposalVoting.BreakdownToken />
                <ProposalVoting.Votes />
                <ProposalVoting.Details />
            </ProposalVoting.Stage>
            <ProposalVoting.Stage name="Founders approval" status="pending" startDate={0} value="founders">
                <ProposalVoting.BreakdownMultisig />
                <ProposalVoting.Votes />
                <ProposalVoting.Details />
            </ProposalVoting.Stage>
        </ProposalVoting.Container>
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
export const SingleStage: Story = {
    render: (args) => (
        <ProposalVoting.Container {...args} style={{ maxWidth: 560 }}>
            <ProposalVoting.Tabs>
                <ProposalVoting.BreakdownToken />
                <ProposalVoting.Votes />
                <ProposalVoting.Details />
            </ProposalVoting.Tabs>
        </ProposalVoting.Container>
    ),
    args: {
        title: 'Voting',
        description: 'The proposal must pass the voting to be accepted and potential onchain actions to execute.',
    },
};

export default meta;
