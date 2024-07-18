import type { Meta, StoryObj } from '@storybook/react';
import { ProposalActions } from '..';
import { Accordion } from '../../../../../core';
import { generateProposalActionWithdrawToken, generateToken } from '../actions/generators/proposalActionWithdrawToken';

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
        action: generateProposalActionWithdrawToken({
            contractAddress: '0x6B175474E89094C44Da98b954EedeAC495271d0F',
            token: generateToken({ name: 'Ether' }),
        }),
    },
    render: (props) => (
        <Accordion.Container isMulti={true}>
            <ProposalActions.Action {...props} />
        </Accordion.Container>
    ),
};

export default meta;
