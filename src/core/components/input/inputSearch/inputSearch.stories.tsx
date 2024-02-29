import type { Meta, StoryObj } from '@storybook/react';
import { useState, type ChangeEvent } from 'react';
import { InputSearch, type IInputSearchProps } from './inputSearch';

const meta: Meta<typeof InputSearch> = {
    title: 'Core/Components/Input/InputSearch',
    component: InputSearch,
    tags: ['autodocs'],
    parameters: {
        design: {
            type: 'figma',
            url: 'https://www.figma.com/file/jfKRr1V9evJUp1uBeyP3Zz/v1.0.0?type=design&node-id=8199-17879&mode=design&t=2bLCEeKZ7ueBboTs-4',
        },
    },
};

type Story = StoryObj<typeof InputSearch>;

/**
 * Default uncontrolled usage example of the InputSearch component.
 */
export const Default: Story = {
    args: {
        placeholder: 'Search',
    },
};

const ControlledComponent = (props: IInputSearchProps) => {
    const [value, setValue] = useState<string>('');

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => setValue(event.target.value);

    return <InputSearch value={value} onChange={handleChange} {...props} />;
};

/**
 * Usage example of a controlled InputSearch component.
 */
export const Controlled: Story = {
    render: (props) => <ControlledComponent {...props} />,
    args: {
        placeholder: 'Controlled search',
    },
};

export default meta;
