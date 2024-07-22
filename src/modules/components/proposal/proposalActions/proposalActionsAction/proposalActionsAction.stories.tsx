import type { Meta, StoryObj } from '@storybook/react';

import { Accordion } from '../../../../../core';
import { generateProposalActionWithdrawToken, generateToken } from '../actions/generators/proposalActionWithdrawToken';
import { ProposalActionsAction } from './proposalActionsAction';

const meta: Meta<typeof ProposalActionsAction> = {
    title: 'Modules/Components/Proposal/ProposalActions/ProposalActionsAction',
    component: ProposalActionsAction,
    parameters: {
        design: {
            type: 'figma',
            url: 'https://www.figma.com/design/ISSDryshtEpB7SUSdNqAcw/Aragon-ODS?m=auto&t=aAKsoiPV8GlakDa1-1',
        },
    },
};

type Story = StoryObj<typeof ProposalActionsAction>;

/**
 * Usage example of the ProposalActions.Action module component with mocked TokenWithdraw actions.
 */
export const TokenWithdraw: Story = {
    args: {
        action: generateProposalActionWithdrawToken({
            contractAddress: '0x6B175474E89094C44Da98b954EedeAC495271d0F',
            token: generateToken({ name: 'Ether' }),
        }),
    },
    render: (props) => (
        <Accordion.Container isMulti={true}>
            <ProposalActionsAction {...props} />
        </Accordion.Container>
    ),
};

export default meta;
