import type { Meta, StoryObj } from '@storybook/react';
import { InputRadioGroup } from '../inputRadioGroup';
import { InputRadio } from './inputRadio';

const meta: Meta<typeof InputRadio> = {
    title: 'components/InputRadioGroup/InputRadio',
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

/**
 * Default usage of the `InputRadio` component
 */
export const Default: Story = {
    render: (props) => (
        <InputRadioGroup name="bob">
            <InputRadio {...props} />
        </InputRadioGroup>
    ),
    args: {
        value: '1',
        label: 'Number one',
    },
};

export default meta;
