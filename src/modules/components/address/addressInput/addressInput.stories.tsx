import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Button } from '../../../../core';
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

const AddressInputValue = (props: { value?: string; addressValue?: IAddressInputValue }) => {
    const { value, addressValue } = props;

    const stringValue = value ?? 'undefined';
    const stringAddressValue =
        addressValue != null ? `{ address: ${addressValue.address}, name: ${addressValue.name} }` : 'undefined';

    return (
        <code>
            Value: {stringValue}
            <br />
            Address value: {stringAddressValue}
        </code>
    );
};

const ControlledComponent = (props: IAddressInputProps) => {
    const [value, setValue] = useState<string>();
    const [addressValue, setAddressValue] = useState<IAddressInputValue>();

    return (
        <div className="flex grow flex-col gap-2">
            <AddressInput value={value} onChange={setValue} onAccept={setAddressValue} {...props} />
            <AddressInputValue value={value} addressValue={addressValue} />
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
    render: ({ onChange, onAccept, ...props }) => <ControlledComponent {...props} />,
};

const ChangeValueComponent = (props: IAddressInputProps) => {
    const [value, setValue] = useState<string>();
    const [addressValue, setAddressValue] = useState<IAddressInputValue>();

    const handleSetAddress = () => setValue('0xe11BFCBDd43745d4Aa6f4f18E24aD24f4623af04');

    const handleSetEns = () => setValue('vitalik.eth');

    const handleClearValue = () => setValue(undefined);

    return (
        <div className="flex grow flex-col gap-2">
            <div className="flex flex-row gap-2">
                <Button onClick={handleSetAddress} variant="secondary" size="sm">
                    Set address
                </Button>
                <Button onClick={handleSetEns} variant="secondary" size="sm">
                    Set ENS
                </Button>
                <Button onClick={handleClearValue} variant="secondary" size="sm">
                    Clear input
                </Button>
            </div>
            <AddressInput value={value} onChange={setValue} onAccept={setAddressValue} {...props} />
            <AddressInputValue value={value} addressValue={addressValue} />
        </div>
    );
};

export const ChangeValueProgrammatically: Story = {
    args: {
        placeholder: 'ENS or 0x …',
    },
    render: ({ onChange, onAccept, ...props }) => <ChangeValueComponent {...props} />,
};

export default meta;
