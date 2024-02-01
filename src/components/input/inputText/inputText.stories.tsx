import type { Meta, StoryObj } from '@storybook/react';
import { useState, type ChangeEvent } from 'react';
import { InputText } from './inputText';
import type { IInputTextProps } from './inputText.api';

const meta: Meta<typeof InputText> = {
    title: 'components/Input/InputText',
    component: InputText,
    tags: ['autodocs'],
    parameters: {
        design: {
            type: 'figma',
            url: 'https://www.figma.com/file/jfKRr1V9evJUp1uBeyP3Zz/v1.0.0?type=design&node-id=17-292&mode=design&t=dehPZplRn0YEdOuB-4',
        },
    },
};

type Story = StoryObj<typeof InputText>;

/**
 * Default uncontrolled usage example of the InputText component.
 */
export const Default: Story = {
    args: {
        placeholder: 'Uncontrolled input',
    },
};

const ControlledComponent = (props: IInputTextProps) => {
    const [value, setValue] = useState<string>('');

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => setValue(event.target.value);

    return <InputText value={value} onChange={handleChange} {...props} />;
};

/**
 * Usage example of a controlled input.
 */
export const Controlled: Story = {
    render: (props) => <ControlledComponent {...props} />,
    args: {
        placeholder: 'Controlled input',
    },
};

/**
 * Usage example of an input with an addon element.
 */
export const Addon: Story = {
    args: {
        addon: 'Addon',
        placeholder: 'Input with addon',
    },
};

export default meta;
