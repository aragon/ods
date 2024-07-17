import type { Meta, StoryObj } from '@storybook/react';
import { ProposalVoting } from '../index';

const meta: Meta<typeof ProposalVoting.Tabs> = {
    title: 'Modules/Components/Proposal/ProposalVoting/ProposalVoting.Tabs',
    component: ProposalVoting.Tabs,
    parameters: {
        design: {
            type: 'figma',
            url: 'https://www.figma.com/design/ISSDryshtEpB7SUSdNqAcw/Aragon-ODS?node-id=17255-43662&m=dev',
        },
    },
};

type Story = StoryObj<typeof ProposalVoting.Tabs>;

/**
 * Default usage example of the ProposalVoting.Tabs component.
 */
export const Default: Story = {};

export default meta;
