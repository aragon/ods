import type { Meta, StoryObj } from '@storybook/react';
import { generateProposalActionWithdrawToken } from '../actions/generators/proposalActionWithdrawToken';
import { ProposalActionsActionVerification } from './proposalActionsActionVerfication';

const meta: Meta<typeof ProposalActionsActionVerification> = {
    title: 'Modules/Components/Proposal/ProposalActions/ProposalActionsActionVerification',
    component: ProposalActionsActionVerification,
    parameters: {
        design: {
            type: 'figma',
            url: 'https://www.figma.com/design/ISSDryshtEpB7SUSdNqAcw/Aragon-ODS?m=auto&t=aAKsoiPV8GlakDa1-1',
        },
    },
};

type Story = StoryObj<typeof ProposalActionsActionVerification>;

/**
 * Usage example of the ProposalActionsActionVerification sub-component with a verified contract interaction.
 */
export const Verified: Story = {
    args: {
        action: generateProposalActionWithdrawToken(),
    },
};

/**
 * Usage example of the ProposalActionsActionVerification sub-component with a unverified contract interaction.
 */
export const Unverified: Story = {
    args: {
        action: generateProposalActionWithdrawToken({ inputData: null }),
    },
};

export default meta;
