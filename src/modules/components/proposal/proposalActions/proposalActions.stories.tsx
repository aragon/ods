import type { Meta, StoryObj } from '@storybook/react';
import { withdrawActionsMock } from './actions/proposalActionWithdrawToken/mocks';
import { ProposalActions } from './proposalActions';

const meta: Meta<typeof ProposalActions> = {
    title: 'Modules/Components/Proposal/ProposalActions',
    component: ProposalActions,
    parameters: {
        design: {
            type: 'figma',
            url: 'https://www.figma.com/design/ISSDryshtEpB7SUSdNqAcw/Aragon-ODS?m=auto&t=aAKsoiPV8GlakDa1-1',
        },
    },
};

type Story = StoryObj<typeof ProposalActions>;

/**
 * Usage example of the ProposalActions module component with mocked TokenWithdraw actions.
 */
export const TokenWithdraw: Story = {
    args: {
        actions: withdrawActionsMock,
    },
};

export default meta;
