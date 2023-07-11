import { type Meta, type Story } from '@storybook/react';
import React from 'react';
import { AlertCard, type AlertCardProps } from './alertCard';

export default {
    title: 'Components/Alerts/Card',
    component: AlertCard,
} as Meta;

const Template: Story<AlertCardProps> = (args) => <AlertCard {...args} />;

export const Default = Template.bind({});
Default.args = {
    mode: 'info',
    title: 'This is a title',
    helpText: 'This is a help text',
};
