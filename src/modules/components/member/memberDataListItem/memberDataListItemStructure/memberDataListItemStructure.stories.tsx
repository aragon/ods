import type { Meta, StoryObj } from '@storybook/react';
import { DataList } from '../../../../../core';
import { MemberDataListItemStructure } from './memberDataListItemStructure';

const meta: Meta<typeof MemberDataListItemStructure> = {
    title: 'Modules/Components/Member/MemberDataListItem.Structure',
    component: MemberDataListItemStructure,
    tags: ['autodocs'],
    parameters: {
        design: {
            type: 'figma',
            url: 'https://www.figma.com/file/ISSDryshtEpB7SUSdNqAcw/branch/P0GeJKqILL7UXvaqu5Jj7V/Aragon-ODS?type=design&node-id=14385%3A30819&mode=dev',
        },
    },
    argTypes: {
        isDelegate: {
            control: {
                type: 'boolean',
            },
        },
        delegationCount: {
            control: {
                type: 'number',
            },
        },
        votingPower: {
            control: {
                type: 'number',
            },
        },
        ensName: {
            control: {
                type: 'string',
            },
        },
        address: {
            control: {
                type: 'string',
            },
        },
        avatarSrc: {
            control: {
                type: 'string',
            },
        },
    },
};

type Story = StoryObj<typeof MemberDataListItemStructure>;

/**
 * Default usage example of the MemberDataList module component.
 */
export const Default: Story = {
    args: {
        isDelegate: undefined,
        ensName: undefined,
        address: '0x1234567890123456789012345678901234567890',
        delegationCount: undefined,
        votingPower: undefined,
    },
    render: (args) => (
        <DataList.Root entityLabel="Members">
            <DataList.Container>
                <MemberDataListItemStructure {...args} />
            </DataList.Container>{' '}
        </DataList.Root>
    ),
};

/**
 * Example of the MemberDataList module component with fully loaded props and token voting.
 */
export const Loaded: Story = {
    args: {
        isDelegate: true,
        ensName: 'vitalik.eth',
        address: '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045',
        delegationCount: 9,
        votingPower: 13370,
    },
    render: (args) => (
        <DataList.Root entityLabel="Members">
            <DataList.Container>
                <MemberDataListItemStructure {...args} />
            </DataList.Container>{' '}
        </DataList.Root>
    ),
};

export default meta;
