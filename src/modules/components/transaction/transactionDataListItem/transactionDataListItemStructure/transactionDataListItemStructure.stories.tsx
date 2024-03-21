import type { Meta, StoryObj } from '@storybook/react';
import { DataList } from '../../../../../core';
import { TransactionDataListItemStructure } from './transactionDataListItemStructure';

const meta: Meta<typeof TransactionDataListItemStructure> = {
    title: 'Modules/Components/Transaction/TransactionDataListItem.Structure',
    component: TransactionDataListItemStructure,
    tags: ['autodocs'],
    parameters: {
        design: {
            type: 'figma',
            url: 'https://www.figma.com/file/ISSDryshtEpB7SUSdNqAcw/branch/P0GeJKqILL7UXvaqu5Jj7V/Aragon-ODS?type=design&node-id=14385%3A30819&mode=dev',
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

export default meta;
