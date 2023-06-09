import { type Meta, type Story } from '@storybook/react';
import React from 'react';
import { TokenListItem, type TokenListItemProps } from './tokenListItem';

export default {
    title: 'Components/TokenListItem',
    component: TokenListItem,
} as Meta;

const Template: Story<TokenListItemProps> = (args) => <TokenListItem {...args} />;

export const Default = Template.bind({});
Default.args = {
    tokenName: 'Aragon',
    tokenSymbol: 'ANT',
    tokenAmount: '5000',
    tokenLogo: 'https://cdn.discordapp.com/icons/672466989217873929/a_51c83f18bd98ca37916f540b3ecf40f7.webp?size=1024',
};
