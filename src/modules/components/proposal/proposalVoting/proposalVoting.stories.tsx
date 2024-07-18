import type { Meta, StoryObj } from '@storybook/react';
import { DateTime } from 'luxon';
import { useState } from 'react';
import { Button, DataList } from '../../../../core';
import { type IVoteDataListItemStructureProps, VoteDataListItem } from '../../vote';
import { ProposalVoting, ProposalVotingStatus } from '../index';

const meta: Meta<typeof ProposalVoting.Container> = {
    title: 'Modules/Components/Proposal/ProposalVoting/ProposalVoting',
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

const filterVotes = (votes: IVoteDataListItemStructureProps[], search?: string) =>
    votes.filter(
        (vote) =>
            search == null ||
            search.length === 0 ||
            vote.voter.address.includes(search) ||
            vote.voter.name?.includes(search),
    );

const tokenVotes: IVoteDataListItemStructureProps[] = [
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

const multisigVotes: IVoteDataListItemStructureProps[] = [
    {
        voter: { address: '0xFe89cc7aBB2C4183683ab71653C4cdc9B02D44b7', name: 'ens.eth' },
        voteIndicator: 'approve',
    },
    {
        voter: { address: '0x650235a0889CAe912673AAD13Ff75d1F1A175487' },
        voteIndicator: 'approve',
    },
    {
        voter: { address: '0xDCFfFFA68464A4AFC96EEf885844631A439cE625' },
        voteIndicator: 'approve',
    },
    {
        voter: { address: '0x2536c09E5F5691498805884fa37811Be3b2BDdb4' },
        voteIndicator: 'approve',
    },
];

const tokenSettings = [
    { term: 'Strategy', value: '1 Token → 1 Vote' },
    { term: 'Voting options', value: 'Yes, Abstain, or No' },
    { term: 'Minimum support', value: '>50%' },
    { term: 'Minimum participation (Quorum)', value: '≥62.42K of 1M DEGEN (≥6.942)' },
    { term: 'Early execution', value: 'Yes' },
    { term: 'Vote replacement', value: 'No' },
    { term: 'Minimum duration', value: '7 days' },
];

const multisigSettings = [
    { term: 'Strategy', value: '1 Address → 1 Vote' },
    { term: 'Voting options', value: 'Approve' },
    { term: 'Minimum approval', value: '3 of 5' },
];

/**
 * Usage example of the ProposalVotingContainer module component for multi-stage proposals
 */
export const MultiStage: Story = {
    args: {
        title: 'Voting',
        description:
            'The proposal must pass all governance stages to be accepted and potential onchain actions to execute.',
        activeStage: '0',
    },
    render: (args) => {
        const [tokenSearch, setTokenSearch] = useState<string | undefined>('');
        const [multisigSearch, setMultisigSearch] = useState<string | undefined>('');

        const filteredTokenVotes = filterVotes(tokenVotes, tokenSearch);

        return (
            <ProposalVoting.Container {...args} style={{ maxWidth: 560 }}>
                <ProposalVoting.Stage
                    name="Token holder voting"
                    status={ProposalVotingStatus.ACTIVE}
                    startDate={DateTime.now().toMillis()}
                    endDate={DateTime.now().plus({ days: 5 }).toMillis()}
                >
                    <ProposalVoting.BreakdownToken
                        tokenSymbol="ARA"
                        totalYes={getTotalVotes(tokenVotes, 'yes')}
                        totalNo={getTotalVotes(tokenVotes, 'no')}
                        totalAbstain={getTotalVotes(tokenVotes, 'abstain')}
                        supportThreshold={50}
                        minParticipation={15}
                        tokenTotalSupply={9451231259}
                    >
                        <Button variant="primary" size="md" className="md:self-start">
                            Vote on proposal
                        </Button>
                    </ProposalVoting.BreakdownToken>
                    <ProposalVoting.Votes>
                        <DataList.Root itemsCount={filteredTokenVotes.length} entityLabel="Votes">
                            <DataList.Filter searchValue={tokenSearch} onSearchValueChange={setTokenSearch} />
                            <DataList.Container>
                                {filteredTokenVotes.map((vote) => (
                                    <VoteDataListItem.Structure key={vote.voter.address} {...vote} />
                                ))}
                            </DataList.Container>
                            <DataList.Pagination />
                        </DataList.Root>
                    </ProposalVoting.Votes>
                    <ProposalVoting.Details settings={tokenSettings} />
                </ProposalVoting.Stage>
                <ProposalVoting.Stage
                    name="Founders approval"
                    status={ProposalVotingStatus.PENDING}
                    startDate={DateTime.now().plus({ days: 7 }).toMillis()}
                    endDate={DateTime.now().plus({ days: 10 }).toMillis()}
                >
                    <ProposalVoting.BreakdownMultisig approvalsAmount={0} minApprovals={4} />
                    <ProposalVoting.Votes>
                        <DataList.Root itemsCount={0} entityLabel="Votes">
                            <DataList.Filter searchValue={multisigSearch} onSearchValueChange={setMultisigSearch} />
                            <DataList.Container
                                emptyState={{ heading: 'No votes', description: 'Stage has no votes' }}
                            />
                            <DataList.Pagination />
                        </DataList.Root>
                    </ProposalVoting.Votes>
                    <ProposalVoting.Details settings={multisigSettings} />
                </ProposalVoting.Stage>
            </ProposalVoting.Container>
        );
    },
};

/**
 * Usage example of the ProposalVotingContainer module component for single-stage proposals
 */
export const SingleStage: Story = {
    render: (args) => {
        const [search, setSearch] = useState<string | undefined>('');

        const filteredVotes = filterVotes(multisigVotes, search);

        return (
            <ProposalVoting.Container {...args} style={{ maxWidth: 560 }}>
                <ProposalVoting.Stage
                    name="Token holder voting"
                    status={ProposalVotingStatus.ACTIVE}
                    startDate={DateTime.now().toMillis()}
                    endDate={DateTime.now().plus({ hours: 7 }).toMillis()}
                >
                    <ProposalVoting.BreakdownMultisig approvalsAmount={4} minApprovals={5} />
                    <ProposalVoting.Votes>
                        <DataList.Root itemsCount={filteredVotes.length} entityLabel="Votes">
                            <DataList.Filter searchValue={search} onSearchValueChange={setSearch} />
                            <DataList.Container>
                                {filteredVotes.map((vote) => (
                                    <VoteDataListItem.Structure key={vote.voter.address} {...vote} />
                                ))}
                            </DataList.Container>
                            <DataList.Pagination />
                        </DataList.Root>
                    </ProposalVoting.Votes>
                    <ProposalVoting.Details settings={multisigSettings} />
                </ProposalVoting.Stage>
            </ProposalVoting.Container>
        );
    },
    args: {
        title: 'Voting',
        description: 'The proposal must pass the voting to be accepted and potential onchain actions to execute.',
    },
};

export default meta;
