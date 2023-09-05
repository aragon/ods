// Button.stories.ts|tsx

import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

import { IconCopy, IconGovernance, IconLinkExternal } from '../icons';
import { ListItemAction } from '../listItem';
import { ActionItemAddress, TAG_WALLET_ID_VARIANTS } from './address';

const meta: Meta<typeof ActionItemAddress> = {
    component: ActionItemAddress,
    title: 'Components/ActionItems/Address',
    tags: ['autodocs'],
    argTypes: {
        addressOrEns: { control: { type: 'text' } },
        avatar: { control: { type: 'text' } },
        tagLabel: { control: { type: 'text' } },
        walletId: {
            options: TAG_WALLET_ID_VARIANTS,
            control: { type: 'radio' },
        },
    },
};

export default meta;

type Story = StoryObj<typeof ActionItemAddress>;

export const Primary: Story = {
    render: ({ ...args }) => <ActionItemAddress {...args} />,
    args: {
        addressOrEns: '0x0000000000000000000000000000000000000000',
        tagLabel: 'You',
        delegations: 2,
        delegationLabel: 'Delegations',
        supplyPercentage: 10,
        tokenAmount: '1000',
        tokenSymbol: 'ANT',
        menuOptions: [
            {
                component: (
                    <ListItemAction title="Copy Address" iconRight={<IconCopy className="text-ui-300" />} bgWhite />
                ),
            },
            {
                component: (
                    <ListItemAction
                        title="View on block explorer"
                        iconRight={<IconLinkExternal className="text-ui-300" />}
                        bgWhite
                    />
                ),
            },
            {
                component: (
                    <ListItemAction
                        title="Delegate to"
                        iconRight={<IconGovernance className="text-ui-300" />}
                        bgWhite
                    />
                ),
            },
        ],
    },
};
