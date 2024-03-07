import type { Meta, StoryObj } from '@storybook/react';
import { MemberAvatar } from './memberAvatar';

const meta: Meta<typeof MemberAvatar> = {
    title: 'Modules/Components/Member/MemberAvatar',
    component: MemberAvatar,
    tags: ['autodocs'],
    parameters: {
        design: {
            type: 'figma',
            url: 'https://www.figma.com/file/ISSDryshtEpB7SUSdNqAcw/branch/P0GeJKqILL7UXvaqu5Jj7V/Aragon-ODS?type=design&node-id=14385%3A24287&mode=dev&t=IX3Fa96hiwUEtcoA-1',
        },
    },
};

type Story = StoryObj<typeof MemberAvatar>;

/**
 * Default usage example of the MemberAvatar component.
 */
export const Default: Story = {};

/**
 * Usage example of the MemberAvatar component with 0x address that does not return usable avatar URL.
 */
export const WithENSNameAvatarUnresolved: Story = {
    args: {
        ensNameOrAddress: '0x38958f8b2aE828ECa1E2a30C8e931d224CAda075',
    },
};
/**
 * Usage example of the MemberAvatar component with ENS name that returns usable avatar URL.
 */
export const WithENSNameAvatarResolved: Story = {
    args: {
        ensNameOrAddress: 'sio.eth',
    },
};

export default meta;
