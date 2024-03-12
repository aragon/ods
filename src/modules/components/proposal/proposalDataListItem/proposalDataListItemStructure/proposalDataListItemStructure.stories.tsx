import type { Meta, StoryObj } from '@storybook/react';
import { DataList } from '../../../../../core';
import { type ICompositeAddress } from '../../../../types';
import { OdsModulesProvider } from '../../../odsModulesProvider';
import { ProposalDataListItem } from '../../index';
import { type IProposalListItemBaseProps } from './proposalDataListItemStructureApi';

const meta: Meta<typeof ProposalDataListItem.Structure> = {
    title: 'Modules/Components/Proposal/ProposalDataListItem/ProposalDataListItem.Structure',
    component: ProposalDataListItem.Structure,
    tags: ['autodocs'],
    parameters: {
        design: {
            type: 'figma',
            url: 'https://www.figma.com/file/P0GeJKqILL7UXvaqu5Jj7V/v1.1.0?type=design&node-id=13724-27671&mode=dev',
        },
    },
};

type Story = StoryObj<typeof ProposalDataListItem.Structure>;

const baseArgs: IProposalListItemBaseProps = {
    date: '5 days left',
    protocolUpdate: false,
    publisher: { address: '0xd5fb864ACfD6BB2f72939f122e89fF7F475924f5' },
    status: 'draft',
    title: 'This is a very serious proposal to send funds to a wallet address',
    summary: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris vel eleifend neque, in mattis eros. 
        Integer ornare dapibus sem sit amet viverra. Sed blandit ipsum quis erat elementum lacinia.
        Sed eu nisi urna. Ut quis urna ac mi vulputate suscipit. Aenean lacinia, libero sit amet laoreet vulputate,
        magna magna sollicitudin tellus, ut volutpat nulla arcu nec neque. Phasellus vulputate tincidunt orci vitae eleifend.`,
    type: 'majorityVoting',
    voted: false,
    onPublisherClick: (publisher: ICompositeAddress) => {
        window.open(`https://etherscan.io/address/${publisher.address}`, '_blank');
    },
};

/**
 * Example of the `ProposalDataListItem.Structure` module component for a MajorityVoting type proposal.
 */
export const MajorityVoting: Story = {
    args: {
        ...baseArgs,
        type: 'majorityVoting',
        option: 'yes',
        voteAmount: '100k wAnt',
        votePercentage: 15,
    },
    render: (props) => (
        <OdsModulesProvider>
            <DataList.Root entityLabel="Proposals">
                <DataList.Container>
                    <ProposalDataListItem.Structure {...props} />
                </DataList.Container>
            </DataList.Root>
        </OdsModulesProvider>
    ),
};

/**
 * Example of the `ProposalDataListItem.Structure` module component for an ApprovalThreshold type proposal.
 */
export const ApprovalThreshold: Story = {
    args: {
        ...baseArgs,
        publisher: { name: 'sio.eth', address: baseArgs.publisher.address },
        type: 'approvalThreshold',
        approvalAmount: 4,
        approvalThreshold: 6,
    },
    render: (props) => (
        <OdsModulesProvider>
            <DataList.Root entityLabel="Proposals">
                <DataList.Container>
                    <ProposalDataListItem.Structure {...props} />
                </DataList.Container>
            </DataList.Root>
        </OdsModulesProvider>
    ),
};

export default meta;
