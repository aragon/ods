import type { Meta, StoryObj } from '@storybook/react';
import { ProposalActions } from '..';
import { generateProposalAdjustMemberCount } from '../actions/generators/proposalActionAdjustMemberCount';
import {
    generateCompositeAddress,
    generateProposalActionWithdrawToken,
    generateToken,
} from '../actions/generators/proposalActionWithdrawToken';

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
    render: () => {
        const actions = [
            generateProposalActionWithdrawToken({
                contractAddress: '0x6B175474E89094C44Da98b954EedeAC495271d0F',
                token: generateToken({ name: 'Ether' }),
            }),
            generateProposalActionWithdrawToken({
                contractAddress: '0x1234567890abcdef1234567890abcdef12345678',
                inputData: null,
            }),
        ];
        return (
            <ProposalActions.Container>
                {actions.map((action, index) => (
                    <ProposalActions.Action key={`action-${index}`} action={action} index={index} />
                ))}
            </ProposalActions.Container>
        );
    },
};

/**
 * Usage example of the ProposalActions.Container module component with mocked TokenWithdraw actions.
 */
export const AdjustMemberCount: Story = {
    render: () => {
        const actions = [
            generateProposalAdjustMemberCount({
                changingMembers: [
                    generateCompositeAddress({ name: 'alice.eth' }),
                    generateCompositeAddress({ name: 'bob.eth' }),
                ],
                addOrRemove: 'add',
                currentMemberCount: 10,
            }),
            generateProposalAdjustMemberCount({
                changingMembers: [
                    generateCompositeAddress({ name: 'alice.eth' }),
                    generateCompositeAddress({ name: 'bob.eth' }),
                ],
                addOrRemove: 'remove',
                currentMemberCount: 10,
                inputData: null,
            }),
        ];

        return (
            <ProposalActions.Container>
                {actions.map((action, index) => (
                    <ProposalActions.Action key={`action-${index}`} action={action} index={index} />
                ))}
            </ProposalActions.Container>
        );
    },
};

export default meta;
