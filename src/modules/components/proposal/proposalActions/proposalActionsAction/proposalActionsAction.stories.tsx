import type { Meta, StoryObj } from '@storybook/react';
import { ProposalActions } from '..';
import { Accordion } from '../../../../../core';
import { withdrawActionsMock } from '../actions/mocks/proposalActionWithdrawToken';
import { ProposalActionsProvider } from '../proposalActionsContext';

const meta: Meta<typeof ProposalActions.Action> = {
    title: 'Modules/Components/Proposal/ProposalActions/ProposalActions.Action',
    component: ProposalActions.Action,
    parameters: {
        design: {
            type: 'figma',
            url: 'https://www.figma.com/design/ISSDryshtEpB7SUSdNqAcw/Aragon-ODS?m=auto&t=aAKsoiPV8GlakDa1-1',
        },
    },
};

type Story = StoryObj<typeof ProposalActions.Action>;

/**
 * Usage example of the ProposalActions.Action module component with mocked TokenWithdraw actions.
 */
export const TokenWithdraw: Story = {
    args: {
        action: withdrawActionsMock[0],
    },
    render: (props) => (
        <ProposalActionsProvider>
            <Accordion.Container isMulti={true}>
                <ProposalActions.Action {...props} />
            </Accordion.Container>
        </ProposalActionsProvider>
    ),
};

export default meta;
