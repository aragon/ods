import type { Meta, StoryObj } from '@storybook/react';
import { ProposalActionUpdateSettings } from './proposalActionChangeSettings';
import { generateProposalActionUpdateSettingsMultisig } from '../generators/proposalActionUpdateSettings';

const meta: Meta<typeof ProposalActionUpdateSettings> = {
    title: 'Modules/Components/Proposal/ProposalActions/Actions/WithdrawToken',
    component: ProposalActionUpdateSettings,
    parameters: {
        design: {
            type: 'figma',
            url: 'https://www.figma.com/design/ISSDryshtEpB7SUSdNqAcw/Aragon-ODS?m=auto&t=aAKsoiPV8GlakDa1-1',
        },
    },
};

type Story = StoryObj<typeof ProposalActionUpdateSettings>;

/**
 * Usage example of the ProposalActions module component with mocked TokenWithdraw actions.
 */
export const Default: Story = {
    render: () => {
        return <ProposalActionUpdateSettings action={generateProposalActionUpdateSettingsMultisig()} />;
    },
};

export default meta;
