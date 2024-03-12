import type { Meta, StoryObj } from '@storybook/react';
import { ProposalDataListItemResult } from './proposalDataListItemResult';

const meta: Meta<typeof ProposalDataListItemResult> = {
    title: 'Modules/Components/Proposal/ProposalDataListItem/ProposalDataListItemResult',
    component: ProposalDataListItemResult,
    tags: ['autodocs'],
    parameters: {
        design: {
            type: 'figma',
            url: 'https://www.figma.com/file/P0GeJKqILL7UXvaqu5Jj7V/v1.1.0?type=design&node-id=8026-20703&mode=design&t=XXBkavqBDY31y42h-4',
        },
    },
};

type Story = StoryObj<typeof ProposalDataListItemResult>;

/**
 * Example of the `majorityVoting` variant of the `ProposalDataListItemResult` component.
 */
export const MajorityVoting: Story = {
    args: {
        type: 'majorityVoting',
        option: 'yes',
        voteAmount: '100k wAnt',
        votePercentage: 15,
    },
};

/**
 * Example of the `approvalThreshold` variant of the `ProposalDataListItemResult` component.
 */
export const ApprovalThreshold: Story = {
    args: {
        type: 'approvalThreshold',
        approvalAmount: 4,
        approvalThreshold: 6,
    },
};

export default meta;
