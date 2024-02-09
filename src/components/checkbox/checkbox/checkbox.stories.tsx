import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Checkbox, type CheckboxState, type ICheckboxProps } from './checkbox';

const meta: Meta<typeof Checkbox> = {
    title: 'components/Checkbox/Checkbox',
    component: Checkbox,
    tags: ['autodocs'],
    argTypes: {
        disabled: { type: 'boolean' },
    },
    parameters: {
        design: {
            type: 'figma',
            url: 'https://www.figma.com/file/jfKRr1V9evJUp1uBeyP3Zz/v1.0.0?type=design&node-id=8322-22460&mode=design&t=l7HfAdX7WAtBtHYX-4',
        },
    },
};

type Story = StoryObj<typeof Checkbox>;

/**
 * Default uncontrolled usage of the Checkbox component.
 */
export const Default: Story = {
    args: { label: 'Default' },
};

const ControlledComponent = (props: ICheckboxProps) => {
    const [checked, setChecked] = useState<CheckboxState>(false);

    return <Checkbox checked={checked} onCheckedChange={setChecked} {...props} />;
};

/**
 * Usage of a controlled Checkbox component.
 */
export const Controlled: Story = {
    render: (props) => <ControlledComponent {...props} />,
    args: { label: 'Controlled' },
};

/**
 * The Checkbox component handles an indeterminate state when the checked property is set to "indeterminate".
 */
export const IndeterminateState: Story = {
    args: { checked: 'indeterminate', label: 'Indeterminate' },
};

export default meta;
