import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { AddressInput, type IAddressInputProps, type IAddressInputValue } from './addressInput';

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

const ControlledComponent = (props: IAddressInputProps) => {
    const [value, setValue] = useState<IAddressInputValue>();
    const stringValue = value != null ? `{ address: ${value.address}, name: ${value.name} }` : 'undefined';

    return (
        <div className="flex grow flex-col gap-2">
            <AddressInput value={value} onChange={setValue} {...props} />
            <code>Output: {stringValue}</code>
        </div>
    );
};

/**
 * Default usage of the AddressInput component.
 */
export const Default: Story = {
    args: {
        placeholder: 'ENS or 0x …',
    },
    render: ({ onChange, ...props }) => <ControlledComponent {...props} />,
};

export default meta;
