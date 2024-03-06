import type { Meta, StoryObj } from '@storybook/react';
import { DataList } from '../../../../core';
import { ProposalDataListItem } from '../index';

const meta: Meta<typeof ProposalDataListItem.Structure> = {
    title: 'Modules/Components/Proposal/ProposalDataListItem.Structure',
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

/**
 * Default usage example of the `ProposalDataListItem.Structure` component.
 */
export const Default: Story = {
    args: {},
    render: (props) => (
        <DataList.Root entityLabel="Proposals">
            <DataList.Container>
                <DataList.Item {...props}>
                    <ProposalDataListItem.Structure />
                </DataList.Item>
            </DataList.Container>
        </DataList.Root>
    ),
};

export default meta;
