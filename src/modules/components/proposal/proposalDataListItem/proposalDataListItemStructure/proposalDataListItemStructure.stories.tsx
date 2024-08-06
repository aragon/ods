import type { Meta, StoryObj } from '@storybook/react';
import { DataList } from '../../../../../core';
import { ProposalDataListItem, ProposalStatus } from '../../index';
import { type IProposalDataListItemStructureProps } from './proposalDataListItemStructure.api';

const meta: Meta<typeof ProposalDataListItem.Structure> = {
    title: 'Modules/Components/Proposal/ProposalDataListItem/ProposalDataListItem.Structure',
    component: ProposalDataListItem.Structure,
    parameters: {
        design: {
            type: 'figma',
            url: 'https://www.figma.com/file/P0GeJKqILL7UXvaqu5Jj7V/v1.1.0?type=design&node-id=13724-27671&mode=dev',
        },
    },
};

type Story = StoryObj<typeof ProposalDataListItem.Structure>;

const basePublisher = {
    address: '0xd5fb864ACfD6BB2f72939f122e89fF7F475924f5',
    link: 'https://app.aragon.org/#/daos/base/0xd2705c56aa4edb98271cb8cea2b0df3288ad4585/members/0xd5fb864ACfD6BB2f72939f122e89fF7F475924f5',
};

const baseArgs: Omit<IProposalDataListItemStructureProps, 'result' | 'publisher'> = {
    date: 1719963030308,
    status: ProposalStatus.ACTIVE,
    title: 'This is a very serious proposal to send funds to a wallet address',
    summary: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris vel eleifend neque, in mattis eros.
        Integer ornare dapibus sem sit amet viverra. Sed blandit ipsum quis erat elementum lacinia.
        Sed eu nisi urna. Ut quis urna ac mi vulputate suscipit. Aenean lacinia, libero sit amet laoreet vulputate,
        magna magna sollicitudin tellus, ut volutpat nulla arcu nec neque. Phasellus vulputate tincidunt orci vitae eleifend.`,
    type: 'majorityVoting',
    voted: false,
};

/**
 * Example of the `ProposalDataListItem.Structure` module component for a MajorityVoting type proposal.
 */
export const MajorityVoting: Story = {
    args: {
        ...baseArgs,
        publisher: { ...basePublisher },
        type: 'majorityVoting',
        result: {
            option: 'yes',
            voteAmount: '100k wAnt',
            votePercentage: 15,
        },
    },
    render: (props) => (
        <DataList.Root entityLabel="Proposals">
            <DataList.Container>
                <ProposalDataListItem.Structure {...props} />
            </DataList.Container>
        </DataList.Root>
    ),
};

/**
 * Example of the `ProposalDataListItem.Structure` module component for an ApprovalThreshold type proposal.
 */
export const ApprovalThreshold: Story = {
    args: {
        ...baseArgs,
        publisher: { ...basePublisher, name: 'sio.eth' },
        type: 'approvalThreshold',
        result: {
            approvalAmount: 4,
            approvalThreshold: 6,
        },
    },
    render: (props) => (
        <DataList.Root entityLabel="Proposals">
            <DataList.Container>
                <ProposalDataListItem.Structure {...props} />
            </DataList.Container>
        </DataList.Root>
    ),
};

/**
 * Example of the `ProposalDataListItem.Structure` module component for a multi-body proposal.
 */
export const MultiBody: Story = {
    args: {
        ...baseArgs,
        id: 'PIP-1',
        publisher: [
            { ...basePublisher, name: '0xRugg', link: undefined },
            { ...basePublisher, name: 'Bob the Builder', link: undefined },
            { ...basePublisher, name: 'sio.eth' },
            { ...basePublisher },
        ],
        type: 'approvalThreshold',
        result: {
            stage: { title: 'Founders Approval Council', id: '1' },
            approvalAmount: 4,
            approvalThreshold: 6,
        },
    },
    render: (props) => (
        <DataList.Root entityLabel="Proposals">
            <DataList.Container SkeletonElement={ProposalDataListItem.Skeleton}>
                <ProposalDataListItem.Structure {...props} />
            </DataList.Container>
        </DataList.Root>
    ),
};

export default meta;
