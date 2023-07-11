import { type Meta, type Story } from '@storybook/react';
import React from 'react';
import { IconCheckmark } from '../icons';
import { AlertChip, type AlertChipProps } from './alertChip';

export default {
    title: 'Components/Alerts/Chip',
    component: AlertChip,
} as Meta;

const Template: Story<AlertChipProps> = (args) => <AlertChip {...args} />;

export const Default = Template.bind({});
Default.args = {
    label: 'Pasted',
    icon: <IconCheckmark />,
    showIcon: true,
};
