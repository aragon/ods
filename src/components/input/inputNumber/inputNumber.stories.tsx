import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { InputNumber, type IInputNumberProps } from './inputNumber';

const meta: Meta<typeof InputNumber> = {
    title: 'components/Input/InputNumber',
    component: InputNumber,
    tags: ['autodocs'],
    parameters: {
        design: {
            type: 'figma',
            url: 'https://www.figma.com/file/ISSDryshtEpB7SUSdNqAcw/branch/jfKRr1V9evJUp1uBeyP3Zz/Aragon-ODS?type=design&node-id=10074-6967&mode=design&t=LRQNgdDVgpUu0QIo-0',
        },
    },
};

type Story = StoryObj<typeof InputNumber>;

/**
 * Default usage example of the `InputNumber` component.
 */
export const Default: Story = {
    args: {
        placeholder: '0',
    },
};

const ControlledComponent = (props: IInputNumberProps) => {
    const [value, setValue] = useState<string>('1');

    return <InputNumber value={value} onChange={setValue} {...props} />;
};

/**
 * Usage example of a controlled `InputNumber` component.
 */
export const Controlled: Story = {
    args: { suffix: '%' },
    render: (props) => <ControlledComponent {...props} />,
};

export default meta;
