import { Meta, Story } from '@storybook/react';

import tabsList, { Props } from './tabsList';

export default {
    title: 'coponent/tabsList',
    component: tabsList,
    argTypes: {},
} as Meta;

const Template: Story<Props> = (args) => <tabsList {...args} />;

export const Default = Template.bind({});
Default.args = {};
