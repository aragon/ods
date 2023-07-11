import { type Meta, type Story } from '@storybook/react';
import React from 'react';
import { VotersTable, type VotersTableProps } from './votersTable';

export default {
    title: 'Components/Table/Voters',
    component: VotersTable,
} as Meta;

const Template: Story<VotersTableProps> = (args) => <VotersTable {...args} />;

export const Default = Template.bind({});
Default.args = {
    voters: [
        {
            wallet: 'DAO XYZ',
            option: 'yes',
            votingPower: '40%',
            tokenAmount: '1,000TN',
        },
        {
            wallet: 'punk5768.eth',
            option: 'no',
            votingPower: '10%',
            tokenAmount: '200',
        },
        {
            wallet: '0xc54c...ee7a',
            option: 'yes',
            votingPower: '13.333%',
            tokenAmount: '250TN',
        },
    ],
    // onLoadMore: () => alert('load more clicked'),
    showOption: true,
    showVotingPower: true,
    showAmount: true,
};
