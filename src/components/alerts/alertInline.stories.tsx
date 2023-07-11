import { type Meta, type Story } from '@storybook/react';
import React from 'react';
import { AlertInline, type AlertInlineProps } from './alertInline';

export default {
    title: 'Components/Alerts/Inline',
    component: AlertInline,
} as Meta;

const Template: Story<AlertInlineProps> = (args) => <AlertInline {...args} />;

export const Default = Template.bind({});
Default.args = {
    mode: 'critical',
    label: 'Message text',
};
