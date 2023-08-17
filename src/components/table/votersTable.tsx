import React from 'react';
import styled from 'styled-components';

import { shortenAddress } from '../../utils/addresses';
import { ListItemAddress } from '../listItem';

export type VoterType = {
    wallet: string;
    option: 'yes' | 'abstain' | 'no' | 'approved' | 'none';
    votingPower?: string;
    tokenAmount?: string;
    voteReplaced?: boolean;
};

export type VotersTableProps = {
    voters: VoterType[];
    page?: number;
    onLoadMore?: () => void;
    showOption?: boolean;
    showVotingPower?: boolean;
    showAmount?: boolean;
    pageSize?: number; // number of rows to show
    baseUrl?: string;
};

const colorScheme = (option: string) =>
    option === 'yes' || option === 'approved' ? 'success' : option === 'no' ? 'critical' : 'neutral';

export const VotersTable: React.FC<VotersTableProps> = ({
    voters,
    onLoadMore,
    page = 1,
    showOption = false,
    showVotingPower = false,
    showAmount = false,
    pageSize = 3,
    baseUrl,
}) => {
    const displayedVoters = page * pageSize;

    return (
        <div className="overflow-x-auto">
            <Container>
                {voters.slice(0, displayedVoters).map((voter, index) => (
                    <ListItemAddress
                        key={index}
                        label={shortenAddress(voter.wallet)}
                        src={voter.wallet}
                        onClick={() => null}
                    />
                ))}
                {/* {onLoadMore && voters.length > pageSize && displayedVoters < voters.length && (
                    <tr>
                        <TableCell type="link">
                            <Link label="Load More" iconRight={<IconChevronDown />} onClick={onLoadMore} />
                        </TableCell>
                        {showOption && <TableCell type="text" text="" />}
                        {showVotingPower && <TableCell type="text" text="" />}
                        {showAmount && <TableCell type="text" text="" />}
                    </tr>
                )} */}
            </Container>
        </div>
    );
};

const Container = styled.div.attrs(() => ({
    className: 'w-full',
}))``;
