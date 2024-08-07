import type { Meta, StoryObj } from '@storybook/react';

import {
    generateProposalAction,
    generateProposalActionTokenMint,
    generateProposalActionUpdateMetadata,
    generateProposalActionWithdrawToken,
    generateToken,
} from '../actions/generators';
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
 * Usage example of the ProposalActions module component with mocked actions.
 */
export const MixedActions: Story = {
    args: {
        actionNames: { WITHDRAW_TOKEN: 'Withdraw assets', ADD_MEMBERS: 'Add members' },
        actions: [
            generateProposalActionWithdrawToken({
                to: '0x6B175474E89094C44Da98b954EedeAC495271d0F',
                value: '1000000000000000000',
                token: generateToken({ name: 'Ether' }),
            }),
            generateProposalActionUpdateMetadata(),
            generateProposalAction({ to: '0x6B175474E89094C44Da98b954EedeAC495271d0F' }),
            generateProposalActionTokenMint({
                receivers: [
                    {
                        currentBalance: 0,
                        newBalance: 5,
                        address: '0x32c2FE388ABbB3e678D44DF6a0471086D705316a',
                    },
                    {
                        currentBalance: 100,
                        newBalance: 110,
                        address: '0xeefB13C7D42eFCc655E528dA6d6F7bBcf9A2251d',
                    },
                    {
                        currentBalance: 0,
                        newBalance: 200,
                        address: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e',
                    },
                ],
            }),
        ],
    },
};

export const CustomActions: Story = {
    render: () => {
        const actionNames = {
            WITHDRAW_TOKEN: 'Withdraw assets',
            CUSTOM_ACTION_ONE: 'Custom Action One',
            CUSTOM_ACTION_TWO: 'Custom Action Two',
            ADD_MEMBERS: 'Add members',
        };

        const CustomActionComponent: React.FC<{ action: IProposalAction }> = ({ action }) => {
            return (
                <div>
                    <h4>Custom Action One</h4>
                    <p>Type: {action.type}</p>
                    <p>From: {action.from}</p>
                    <p>To: {action.to}</p>
                    <p>Value: {action.value}</p>
                    <p>Contract: {action.to}</p>
                </div>
            );
        };

        const actions = [
            {
                type: 'CUSTOM_ACTION',
                inputData: { function: 'doSomething', contract: 'Ether', parameters: [] },
                from: '0x1111111111111111111111111111111111111111',
                to: '0x2222222222222222222222222222222222222222',
                data: '',
                value: '10',
            },
            {
                type: 'UNKNOWN',
                inputData: { function: 'doSomethingElse', contract: 'DAI', parameters: [] },
                from: '0x3333333333333333333333333333333333333333',
                to: '0x4444444444444444444444444444444444444444',
                data: '',
                value: '20',
            },
        ];

        return (
            <ProposalActions
                actions={actions}
                actionNames={actionNames}
                customActionComponents={{
                    CUSTOM_ACTION: CustomActionComponent,
                }}
            />
        );
    },
};

export default meta;
