import type { Meta, StoryObj } from '@storybook/react';
import { DataList } from '../../../../core';
import { MemberDataListItemStructure } from './memberDataListItem';

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
};

type Story = StoryObj<typeof MemberDataListItemStructure>;

/**
 * Default usage example of the MemberDataList module component.
 */
export const Default: Story = {
    render: () => (
        <DataList.Root entityLabel="Members">
            <DataList.Container>
                <MemberDataListItemStructure />
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
        delegationCount: 9,
        votingPower: 13370,
    },
    render: () => (
        <DataList.Root entityLabel="Members">
            <DataList.Container>
                <MemberDataListItemStructure />
            </DataList.Container>{' '}
        </DataList.Root>
    ),
};

export default meta;
