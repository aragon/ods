import type { Meta, StoryObj } from '@storybook/react';

import { withdrawActionsMock } from '../actions/proposalActionWithdrawToken/mocks';
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
        action: withdrawActionsMock[0],
    },
    render: (props) => <ProposalActionsActionVerification {...props} />,
};

/**
 * Usage example of the ProposalActionsActionVerification sub-component with a unverified contract interaction.
 */
export const Unverified: Story = {
    args: {
        action: withdrawActionsMock[2],
    },
    render: (props) => <ProposalActionsActionVerification {...props} />,
};

export default meta;
