import type { Meta, StoryObj } from '@storybook/react';
import { RadioGroup } from '../radioGroup';
import { InputRadio } from './inputRadio';

const meta: Meta<typeof InputRadio> = {
    title: 'components/RadioGroup/InputRadio',
    component: InputRadio,
    tags: ['autodocs'],
    parameters: {
        design: {
            type: 'figma',
            url: 'https://www.figma.com/file/jfKRr1V9evJUp1uBeyP3Zz/v1.0.0?type=design&node-id=9778-14&mode=dev',
        },
    },
};

type Story = StoryObj<typeof InputRadio>;

export const Default: Story = {
    render: (props) => (
        <RadioGroup>
            <InputRadio {...props} />
        </RadioGroup>
    ),
    args: {
        value: '1',
        label: 'Number one',
    },
};

export default meta;
