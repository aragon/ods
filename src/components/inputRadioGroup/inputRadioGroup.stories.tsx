import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { InputRadio } from './inputRadio';
import { InputRadioGroup, type IInputRadioGroupProps } from './inputRadioGroup';

const meta: Meta<typeof InputRadioGroup> = {
    title: 'components/InputRadioGroup',
    component: InputRadioGroup,
    tags: ['autodocs'],
    parameters: {
        design: {
            type: 'figma',
            url: 'https://www.figma.com/file/jfKRr1V9evJUp1uBeyP3Zz/v1.0.0?type=design&node-id=8322-22482&mode=design&t=HyaiVyRmOAeVa91z-4',
        },
    },
};

type Story = StoryObj<typeof InputRadioGroup>;

/**
 * Default usage of the `InputRadioGroup` component
 */
export const Default: Story = {
    render: (props) => (
        <InputRadioGroup {...props}>
            <InputRadio label="Option one" value="1" />
            <InputRadio label="Option two" value="2" />
            <InputRadio label="Option three" value="3" />
        </InputRadioGroup>
    ),
    args: {
        defaultValue: '2',
        name: 'Options',
        disabled: false,
        onValueChange: undefined,
    },
};

const ControlledComponent = (props: IInputRadioGroupProps) => {
    const [value, setValue] = useState('1');
    return (
        <InputRadioGroup {...props} value={value} onValueChange={setValue}>
            <InputRadio label="Option one" value="1" />
            <InputRadio label="Option two" value="2" />
            <InputRadio label="Option three" value="3" />
        </InputRadioGroup>
    );
};

/**
 * Usage example of a controlled `InputRadioGroup` component.
 */
export const Controlled: Story = {
    render: (props) => <ControlledComponent {...props} />,
    args: {
        name: 'Options',
        value: '1',
        disabled: false,
    },
};

export default meta;
