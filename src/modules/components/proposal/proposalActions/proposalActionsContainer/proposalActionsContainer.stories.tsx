import type { Meta, StoryObj } from '@storybook/react';
import { ProposalActions, ProposalActionsProvider } from '..';
import { withdrawActionsMock } from '../actions/mocks/proposalActionWithdrawToken';

const meta: Meta<typeof ProposalActions.Container> = {
    title: 'Modules/Components/Proposal/ProposalActions/ProposalActions.Container',
    component: ProposalActions.Container,
    parameters: {
        design: {
            type: 'figma',
            url: 'https://www.figma.com/design/ISSDryshtEpB7SUSdNqAcw/Aragon-ODS?m=auto&t=aAKsoiPV8GlakDa1-1',
        },
    },
};

type Story = StoryObj<typeof ProposalActions.Container>;

/**
 * Usage example of the ProposalActions.Container module component with mocked TokenWithdraw actions.
 */
export const TokenWithdraw: Story = {
    args: {
        actions: withdrawActionsMock,
        containerName: 'Actions',
    },
    render: (props) => (
        <ProposalActionsProvider>
            <ProposalActions.Container {...props} />
        </ProposalActionsProvider>
    ),
};

export default meta;
