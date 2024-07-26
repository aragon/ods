import type { Meta, StoryObj } from '@storybook/react';
import { ProposalActionChangeSettings } from './proposalActionChangeSettings';

import { generateProposalActionChangeSettingsMultisig } from '../generators/proposalActionChangeSettingsMultisig';
import { generateProposalActionChangeSettingsTokenVote } from '../generators/proposalActionChangeSettingsTokenVote';

const meta: Meta<typeof ProposalActionChangeSettings> = {
    title: 'Modules/Components/Proposal/ProposalActions/Actions/ChangeSettings',
    component: ProposalActionChangeSettings,
    parameters: {
        design: {
            type: 'figma',
            url: 'https://www.figma.com/design/ISSDryshtEpB7SUSdNqAcw/Aragon-ODS?m=auto&t=aAKsoiPV8GlakDa1-1',
        },
    },
};

type Story = StoryObj<typeof ProposalActionChangeSettings>;

/**
 * Usage example of the ProposalActions module component with mocked Multisig settings.
 */
export const MultisigSettings: Story = {
    args: {
        action: generateProposalActionChangeSettingsMultisig(),
    },
};

/**
 * Usage example of the ProposalActions module component with mocked Multisig settings.
 */
export const TokenVoteSettings: Story = {
    args: {
        action: generateProposalActionChangeSettingsTokenVote(),
    },
};

export default meta;
