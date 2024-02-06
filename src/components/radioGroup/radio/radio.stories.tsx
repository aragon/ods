import type { Meta, StoryObj } from '@storybook/react';
import { RadioGroup } from '../radioGroup';
import { Radio } from './radio';

const meta: Meta<typeof Radio> = {
    title: 'components/RadioGroup/Radio',
    component: Radio,
    tags: ['autodocs'],
    parameters: {
        design: {
            type: 'figma',
            url: 'https://www.figma.com/file/jfKRr1V9evJUp1uBeyP3Zz/v1.0.0?type=design&node-id=9778-14&mode=dev',
        },
    },
};

type Story = StoryObj<typeof Radio>;

/**
 * Default usage of the `Radio` component
 */
export const Default: Story = {
    render: (props) => (
        <RadioGroup name="bob">
            <Radio {...props} />
        </RadioGroup>
    ),
    args: {
        value: '1',
        label: 'Number one',
    },
};

export default meta;
