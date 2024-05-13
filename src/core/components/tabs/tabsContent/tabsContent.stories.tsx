import { Meta, Story } from '@storybook/react';

import tabsContent, { Props } from './tabsContent';

export default {
    title: 'coponent/tabsContent',
    component: tabsContent,
    argTypes: {},
} as Meta;

const Template: Story<Props> = (args) => <tabsContent {...args} />;

export const Default = Template.bind({});
Default.args = {};
