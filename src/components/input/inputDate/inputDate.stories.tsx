import type { Meta, StoryObj } from '@storybook/react';
import { useState, type ChangeEvent } from 'react';
import { InputDate, type IInputDateProps } from './inputDate';

const meta: Meta<typeof InputDate> = {
    title: 'components/Input/InputDate',
    component: InputDate,
    tags: ['autodocs'],
    parameters: {
        design: {
            type: 'figma',
            url: 'https://www.figma.com/file/jfKRr1V9evJUp1uBeyP3Zz/v1.0.0?type=design&node-id=17-292&mode=design&t=dehPZplRn0YEdOuB-4',
        },
    },
};

type Story = StoryObj<typeof InputDate>;

/**
 * Default uncontrolled usage example of the InputDate component.
 */
export const Default: Story = {
    args: {
        placeholder: 'Date',
    },
};

const ControlledComponent = (props: IInputDateProps) => {
    const [value, setValue] = useState<string>('');

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => setValue(event.target.value);

    return <InputDate value={value} onChange={handleChange} {...props} />;
};

/**
 * Usage example of a controlled InputDate.
 */
export const Controlled: Story = {
    render: (props) => <ControlledComponent {...props} />,
    args: {
        placeholder: 'Controlled date',
    },
};

export default meta;
