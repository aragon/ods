import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Radio } from './radio';
import { RadioGroup, type IRadioGroupProps } from './radioGroup';

const meta: Meta<typeof RadioGroup> = {
    title: 'components/RadioGroup',
    component: RadioGroup,
    tags: ['autodocs'],
    parameters: {
        design: {
            type: 'figma',
            url: 'https://www.figma.com/file/jfKRr1V9evJUp1uBeyP3Zz/v1.0.0?type=design&node-id=8322-22482&mode=design&t=HyaiVyRmOAeVa91z-4',
        },
    },
};

type Story = StoryObj<typeof RadioGroup>;

/**
 * Default usage of the `RadioGroup` component
 */
export const Default: Story = {
    render: (props) => (
        <RadioGroup {...props}>
            <Radio label="Option one" value="1" />
            <Radio label="Option two" value="2" />
            <Radio label="Option three" value="3" />
        </RadioGroup>
    ),
    args: {
        defaultValue: '2',
        name: 'Options',
        disabled: false,
        onValueChange: undefined,
    },
};

const ControlledComponent = (props: IRadioGroupProps) => {
    const [value, setValue] = useState('1');
    return (
        <RadioGroup {...props} value={value} onValueChange={setValue}>
            <Radio label="Option one" value="1" />
            <Radio label="Option two" value="2" />
            <Radio label="Option three" value="3" />
        </RadioGroup>
    );
};

/**
 * Usage example of a controlled `RadioGroup` component.
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
