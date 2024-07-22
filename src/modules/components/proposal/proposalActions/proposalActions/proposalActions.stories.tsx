import type { Meta, StoryObj } from '@storybook/react';

import { generateProposalActionAdjustMemberCount } from '../actions/generators/proposalActionAdjustMemberCount';
import {
    generateCompositeAddress,
    generateProposalActionWithdrawToken,
    generateToken,
} from '../actions/generators/proposalActionWithdrawToken';
import type { IProposalAction } from '../proposalActionsTypes';
import { ProposalActions } from './proposalActions';

const meta: Meta<typeof ProposalActions> = {
    title: 'Modules/Components/Proposal/ProposalActions/ProposalActions',
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
export const VarietyExample: Story = {
    render: () => {
        const CustomActionComponentOne: React.FC<{ action: IProposalAction }> = ({ action }) => {
            return (
                <div>
                    <h4>Custom Action One</h4>
                    <p>Type: {action.type}</p>
                    <p>From: {action.from}</p>
                    <p>To: {action.to}</p>
                    <p>Value: {action.value}</p>
                    <p>Contract Address: {action.contractAddress}</p>
                </div>
            );
        };

        const actions = [
            generateProposalActionWithdrawToken({
                contractAddress: '0x6B175474E89094C44Da98b954EedeAC495271d0F',
                token: generateToken({
                    name: 'Ether',
                    symbol: 'ETH',
                    decimals: 18,
                    logo: 'ether-logo.png',
                    priceUsd: '2000',
                }),
                inputData: {
                    function: 'transfer',
                    contract: '0x6B175474E89094C44Da98b954EedeAC495271d0F',
                    parameters: [
                        { type: 'address', value: '0x3f5CE5FBFe3E9af3971dD833D26BA9b5C936F0bE' },
                        { type: 'uint256', value: '1000000000000000000' },
                    ],
                },
            }),
            generateProposalActionAdjustMemberCount({
                changingMembers: [
                    generateCompositeAddress({ name: 'alice.eth' }),
                    generateCompositeAddress({ name: 'bob.eth' }),
                ],
                addOrRemove: 'remove',
                currentMemberCount: 10,
                contractAddress: '0x1234567890abcdef1234567890abcdef12345678',
            }),
            {
                type: 'customActionOne',
                inputData: { function: 'doSomething', contract: 'Ether', parameters: [] },
                contractAddress: '0x1111111111111111111111111111111111111111',
                from: '0x1111111111111111111111111111111111111111',
                to: '0x2222222222222222222222222222222222222222',
                data: '',
                value: '10',
            },
            {
                type: 'customActionUnknown',
                inputData: { function: 'doSomethingElse', contract: 'DAI', parameters: [] },
                contractAddress: '0x3333333333333333333333333333333333333333',
                from: '0x3333333333333333333333333333333333333333',
                to: '0x4444444444444444444444444444444444444444',
                data: '',
                value: '20',
            },
        ];

        return (
            <ProposalActions
                actions={actions}
                customActionComponents={{
                    customActionOne: CustomActionComponentOne,
                }}
            />
        );
    },
};

export default meta;
