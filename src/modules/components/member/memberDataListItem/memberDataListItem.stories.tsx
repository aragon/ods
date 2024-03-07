import type { Meta, StoryObj } from '@storybook/react';
import { MemberDataListItem } from './memberDataListItem';

const meta: Meta<typeof MemberDataListItem> = {
    title: 'Modules/Components/Member/MemberDataListItem',
    component: MemberDataListItem,
    tags: ['autodocs'],
    parameters: {
        design: {
            type: 'figma',
            url: 'https://www.figma.com/file/ISSDryshtEpB7SUSdNqAcw/branch/P0GeJKqILL7UXvaqu5Jj7V/Aragon-ODS?type=design&node-id=14385%3A30819&mode=dev',
        },
    },
};

type Story = StoryObj<typeof MemberDataListItem>;

/**
 * Default usage example of the MemberDataList module component.
 */
export const Default: Story = {};

export const Loaded: Story = {
    args: {
        isDelegate: true,
        isMultiSig: false,
        avatar: 'https://avatars.githubusercontent.com/u/1',
        userHandle: 'replyguy.eth',
        delegationCount: 1,
        votingPower: 420690,
    },
};

export const Multsig: Story = {
    args: {
        isMultiSig: true,
        avatar: 'https://avatars.githubusercontent.com/u/1',
        userHandle: 'replyguy.eth',
    },
};

export default meta;
