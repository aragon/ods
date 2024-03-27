import type { Meta, StoryObj } from '@storybook/react';
import { DataList } from '../../../../../core';
import { TransactionDataListItemStructure } from './transactionDataListItemStructure';
import { TransactionType, TxStatusCode } from './transactionDataListItemStructure.api';

const meta: Meta<typeof TransactionDataListItemStructure> = {
    title: 'Modules/Components/Transaction/TransactionDataListItem.Structure',
    component: TransactionDataListItemStructure,
    tags: ['autodocs'],
    parameters: {
        design: {
            type: 'figma',
            url: 'https://www.figma.com/file/P0GeJKqILL7UXvaqu5Jj7V/v1.1.0?type=design&node-id=445-5113&mode=design&t=qzF3muTU7z33q8EX-4',
        },
    },
    argTypes: {
        txHash: {
            control: 'text',
        },
    },
};

type Story = StoryObj<typeof TransactionDataListItemStructure>;

/**
 * Default usage example of the TransactionDataList module component.
 */
export const Default: Story = {
    render: (args) => (
        <DataList.Root entityLabel="Transactions">
            <DataList.Container>
                <TransactionDataListItemStructure {...args} />
            </DataList.Container>
        </DataList.Root>
    ),
};

export const Withdraw: Story = {
    args: {
        txStatus: TxStatusCode.SUCCESS,
        txType: TransactionType.WITHDRAW,
        tokenValue: 10,
        tokenSymbol: 'ETH',
    },
    render: (args) => (
        <DataList.Root entityLabel="Transactions">
            <DataList.Container>
                <TransactionDataListItemStructure {...args} />
            </DataList.Container>
        </DataList.Root>
    ),
};

export const Failed: Story = {
    args: {
        txStatus: TxStatusCode.FAILED,
        txType: TransactionType.DEPOSIT,
        tokenSymbol: 'ETH',
        tokenValue: 10,
        fiatEstimate: 100,
    },
    render: (args) => (
        <DataList.Root entityLabel="Transactions">
            <DataList.Container>
                <TransactionDataListItemStructure {...args} />
            </DataList.Container>
        </DataList.Root>
    ),
};

export default meta;
