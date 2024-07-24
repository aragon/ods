import type { Meta, StoryObj } from '@storybook/react';
import { generateProposalActionTokenMint } from '../generators';
import { ProposalActionTokenMint } from './proposalActionTokenMint';

const meta: Meta<typeof ProposalActionTokenMint> = {
    title: 'Modules/Components/Proposal/ProposalActions/Actions/TokenMint',
    component: ProposalActionTokenMint,
    parameters: {
        design: {
            type: 'figma',
            url: 'https://www.figma.com/design/ISSDryshtEpB7SUSdNqAcw/Aragon-ODS?m=auto&t=aAKsoiPV8GlakDa1-1',
        },
    },
};

type Story = StoryObj<typeof ProposalActionTokenMint>;

/**
 * Usage example of the ProposalActions module component with mocked TokenMint actions.
 */
export const Default: Story = {
    render: () => {
        return (
            <ProposalActionTokenMint
                action={generateProposalActionTokenMint({
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
                })}
            />
        );
    },
};

export default meta;
