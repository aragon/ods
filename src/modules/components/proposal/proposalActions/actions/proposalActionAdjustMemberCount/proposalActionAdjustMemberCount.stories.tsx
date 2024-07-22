import type { Meta, StoryObj } from '@storybook/react';

import { generateProposalActionAdjustMemberCount } from '../generators/proposalActionAdjustMemberCount';
import { ProposalActionAdjustMemberCount } from './proposalActionAdjustMemberCount';

const meta: Meta<typeof ProposalActionAdjustMemberCount> = {
    title: 'Modules/Components/Proposal/ProposalActions/Actions/AdjustMemberCount',
    component: ProposalActionAdjustMemberCount,
    parameters: {
        design: {
            type: 'figma',
            url: 'https://www.figma.com/design/ISSDryshtEpB7SUSdNqAcw/Aragon-ODS?m=auto&t=aAKsoiPV8GlakDa1-1',
        },
    },
};

type Story = StoryObj<typeof ProposalActionAdjustMemberCount>;

/**
 * Usage example of the ProposalActions module component with mocked TokenWithdraw actions.
 */
export const Default: Story = {
    render: () => {
        return <ProposalActionAdjustMemberCount action={generateProposalActionAdjustMemberCount()} />;
    },
};

export default meta;
