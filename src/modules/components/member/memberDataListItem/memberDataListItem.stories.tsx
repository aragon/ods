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

/**
 * Example of the MemberDataList module component with fully loaded props and token voting.
 */
export const Loaded: Story = {
    args: {
        isDelegate: true,
        ensName: 'vitalik.eth',
        delegationCount: 9,
        votingPower: 13370,
        handleClick: () => {
            alert('<MemberDataListItem /> clicked');
        },
    },
};

export const Grid: Story = {
    args: {
        isDelegate: true,
        ensName: 'makeethereumcypherpunkagain.eth',
        delegationCount: 9,
        votingPower: 13370,
        handleClick: () => {
            alert('<MemberDataListItem /> clicked');
        },
    },
    render: (args) => (
        <div className="grid w-full grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-2">
            {Array.from({ length: 5 }, (_, index) => (
                <MemberDataListItem key={index} {...args} />
            ))}
        </div>
    ),
};

export default meta;
