import type { Meta, StoryObj } from '@storybook/react';
import { DataList } from '../../../../../core';
import { IVoteDataListItemStructureProps, VoteDataListItem } from '../../../vote';
import { ProposalVoting } from '../index';

const meta: Meta<typeof ProposalVoting.Container> = {
    title: 'Modules/Components/Proposal/ProposalVoting/ProposalVoting.Container',
    component: ProposalVoting.Container,
    parameters: {
        design: {
            type: 'figma',
            url: 'https://www.figma.com/design/ISSDryshtEpB7SUSdNqAcw/Aragon-ODS?node-id=16752-20193&m=dev',
        },
    },
};

type Story = StoryObj<typeof ProposalVoting.Container>;

const getTotalVotes = (votes: IVoteDataListItemStructureProps[], indicator: string) =>
    votes.reduce(
        (accumulator, { voteIndicator, votingPower }) =>
            accumulator + (voteIndicator === indicator ? Number(votingPower) : 0),
        0,
    );

/**
 * Usage example of the ProposalVotingContainer module component for multi-stage proposals
 */
export const MultiStage: Story = {
    render: (args) => (
        <ProposalVoting.Container {...args} style={{ maxWidth: 560 }}>
            <ProposalVoting.Stage name="Token holder voting" status="active" startDate={0} value="token-holder">
                <ProposalVoting.BreakdownToken
                    tokenSymbol="ARA"
                    totalYes={8000}
                    totalNo={1000}
                    totalAbstain={1000}
                    supportThreshold={50}
                    minParticipation={15}
                    tokenTotalSupply={200000}
                />
                <ProposalVoting.Votes />
                <ProposalVoting.Details />
            </ProposalVoting.Stage>
            <ProposalVoting.Stage name="Founders approval" status="pending" startDate={0} value="founders">
                <ProposalVoting.BreakdownMultisig />
                <ProposalVoting.Votes />
                <ProposalVoting.Details />
            </ProposalVoting.Stage>
        </ProposalVoting.Container>
    ),
    args: {
        title: 'Voting',
        description:
            'The proposal must pass all governance stages to be accepted and potential onchain actions to execute.',
    },
};

/**
 * Usage example of the ProposalVotingContainer module component for single-stage proposals
 */
export const SingleStage: Story = {
    render: (args) => {
        const votes: IVoteDataListItemStructureProps[] = [
            {
                voter: { address: '0x17366cae2b9c6C3055e9e3C78936a69006BE5409', name: 'cgero.eth' },
                isDelegate: true,
                voteIndicator: 'yes',
                votingPower: 47289374,
                tokenSymbol: 'ARA',
            },
            {
                voter: { address: '0xd5fb864ACfD6BB2f72939f122e89fF7F475924f5', name: 'sio.eth' },
                voteIndicator: 'yes',
                votingPower: 1238948,
                tokenSymbol: 'ARA',
            },
            {
                voter: { address: '0xF6ad40D5D477ade0C640eaD49944bdD0AA1fBF05' },
                voteIndicator: 'no',
                votingPower: 8495,
                tokenSymbol: 'ARA',
            },
            {
                voter: { address: '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045', name: 'vitalik.eth' },
                voteIndicator: 'abstain',
                votingPower: 69420000,
                tokenSymbol: 'ARA',
            },
            {
                voter: { address: '0xe11BFCBDd43745d4Aa6f4f18E24aD24f4623af04', name: 'cdixon.eth' },
                voteIndicator: 'yes',
                votingPower: 66749851,
                tokenSymbol: 'ARA',
            },
        ];

        return (
            <ProposalVoting.Container {...args} style={{ maxWidth: 560 }}>
                <ProposalVoting.Tabs>
                    <ProposalVoting.BreakdownToken
                        tokenSymbol="ARA"
                        totalYes={getTotalVotes(votes, 'yes')}
                        totalNo={getTotalVotes(votes, 'no')}
                        totalAbstain={getTotalVotes(votes, 'abstain')}
                        supportThreshold={50}
                        minParticipation={15}
                        tokenTotalSupply={9451231259}
                    />
                    <ProposalVoting.Votes>
                        <DataList.Root itemsCount={votes.length} entityLabel="Votes">
                            <DataList.Filter onSearchValueChange={() => null} />
                            <DataList.Container>
                                {votes.map((vote) => (
                                    <VoteDataListItem.Structure key={vote.voter.address} {...vote} />
                                ))}
                            </DataList.Container>
                            <DataList.Pagination />
                        </DataList.Root>
                    </ProposalVoting.Votes>
                    <ProposalVoting.Details />
                </ProposalVoting.Tabs>
            </ProposalVoting.Container>
        );
    },
    args: {
        title: 'Voting',
        description: 'The proposal must pass the voting to be accepted and potential onchain actions to execute.',
    },
};

export default meta;
