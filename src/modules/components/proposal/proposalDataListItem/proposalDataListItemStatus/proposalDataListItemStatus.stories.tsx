import type { Meta, StoryObj } from '@storybook/react';
import { ProposalDataListItemStatus } from './proposalDataListItemStatus';

const meta: Meta<typeof ProposalDataListItemStatus> = {
    title: 'Modules/Components/Proposal/ProposalDataListItem/ProposalDataListItemStatus',
    component: ProposalDataListItemStatus,
    tags: ['autodocs'],
    parameters: {
        design: {
            type: 'figma',
            url: 'https://www.figma.com/file/P0GeJKqILL7UXvaqu5Jj7V/v1.1.0?type=design&node-id=14274-24084&mode=design&t=9dhWQoSf3FfdUvlQ-4',
        },
    },
};

type Story = StoryObj<typeof ProposalDataListItemStatus>;

/**
 * Default usage of the `ProposalDataListItemStatus` component.
 */
export const MajorityVoting: Story = {
    args: {
        date: 'Yesterday',
        status: 'pending',
        voted: false,
    },
};

export default meta;
