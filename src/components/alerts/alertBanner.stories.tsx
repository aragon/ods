import { type Meta, type Story } from '@storybook/react';
import React from 'react';
import { AlertBanner, type AlertBannerProps } from './alertBanner';

export default {
    title: 'Components/Alerts/Banner',
    component: AlertBanner,
} as Meta;

const Template: Story<AlertBannerProps> = (args) => <AlertBanner {...args} />;

export const Default = Template.bind({});
Default.args = {
    mode: 'info',
    label: 'Testnet Active',
};
