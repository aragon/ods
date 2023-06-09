import { type Meta, type Story } from '@storybook/react';
import React, { useState } from 'react';
import { NumberInput, type NumberInputProps } from './numberInput';

export default {
    title: 'Components/Input/Number',
    component: NumberInput,
} as Meta;

const Template: Story<NumberInputProps> = (args) => {
    const [value, setValue] = useState<string>('');
    return <NumberInput {...args} value={value} onChange={(e) => setValue(e.target.value)} />;
};

export const Number = Template.bind({});
Number.args = {
    mode: 'default',
    view: 'default',
    disabled: false,
};
