import type { Meta, StoryObj } from '@storybook/react';
import { AddressInput } from './addressInput';

const meta: Meta<typeof AddressInput> = {
    title: 'Modules/Components/Address/AddressInput',
    component: AddressInput,
    tags: ['autodocs'],
    parameters: {
        design: {
            type: 'figma',
            url: 'https://www.figma.com/file/P0GeJKqILL7UXvaqu5Jj7V/v1.1.0?type=design&node-id=8192-18146&mode=design&t=VfR81DAQucRS3iGm-4',
        },
    },
};

type Story = StoryObj<typeof AddressInput>;

/**
 * Default usage of the AddressInput component.
 */
export const Default: Story = {
    args: {},
};

export default meta;
