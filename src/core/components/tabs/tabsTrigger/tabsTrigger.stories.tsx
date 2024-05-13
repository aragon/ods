import { Meta, Story } from '@storybook/react';

import tabsTrigger, { Props } from './tabsTrigger';

export default {
    title: 'coponent/tabsTrigger',
    component: tabsTrigger,
    argTypes: {},
} as Meta;

const Template: Story<Props> = (args) => <tabsTrigger {...args} />;

export const Default = Template.bind({});
Default.args = {};
