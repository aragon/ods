import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { getAddress, isAddress } from 'viem';
import { useAccount } from 'wagmi';
import { DataList, NumberFormat, formatterUtils } from '../../../../../core';
import { addressUtils } from '../../../../utils';
import { VoteDataListItemStructure, type IVoteDataListItemStructureProps } from '../../voteDataListItem';

jest.mock('wagmi', () => ({
    useAccount: jest.fn(),
}));

jest.mock('viem', () => ({
    isAddress: jest.fn(),
    getAddress: jest.fn(),
}));

jest.mock('../../../../../core/components/tag', () => ({
    Tag: ({ label }: { label: string }) => <div data-testid="tag">{label}</div>,
}));

jest.mock('../../../member', () => ({
    MemberAvatar: () => <div data-testid="member-avatar" />,
}));

describe('<VoteDataListItemStructure /> component', () => {
    const createTestComponent = (props?: Partial<IVoteDataListItemStructureProps>) => {
        const completeProps: IVoteDataListItemStructureProps = {
            voter: { address: '0x1D03D98c0aac1f83860cec5156116FE68725642E' },
            voteIndicator: 'yes',
            ...props,
        };

        return (
            <DataList.Root entityLabel="Votes">
                <DataList.Container>
                    <VoteDataListItemStructure {...completeProps} />
                </DataList.Container>
            </DataList.Root>
        );
    };

    beforeEach(() => {
        (isAddress as unknown as jest.Mock).mockImplementation(() => true);
        (getAddress as jest.Mock).mockImplementation((address: string) => address);
        (useAccount as jest.Mock).mockReturnValue({
            address: '0x1234567890123456789012345678901234567890',
            isConnected: true,
        });
    });

    it('renders with minimum props', () => {
        const voter = { address: '0x1D03D98c0aac1f83860cec5156116FE68725642E' };
        const voteIndicator = 'no';
        render(createTestComponent({ voter, voteIndicator }));
        const formattedAddress = addressUtils.truncateAddress(voter.address);

        expect(screen.getByTestId('member-avatar')).toBeInTheDocument();
        expect(screen.getByText(formattedAddress)).toBeInTheDocument();
        expect(screen.getByTestId('tag')).toHaveTextContent('no');
    });

    it('renders the formatted token vote amount and symbol', () => {
        const votingPower = 50000;
        const tokenSymbol = 'WIP';
        const formattedTokenNumber = formatterUtils.formatNumber(votingPower, {
            format: NumberFormat.TOKEN_AMOUNT_SHORT,
        }) as string;

        render(createTestComponent({ votingPower, tokenSymbol }));

        expect(screen.getByText(`${formattedTokenNumber} ${tokenSymbol}`)).toBeInTheDocument();
    });

    it('renders the voter name if available', () => {
        const voter = { address: '0x1D03D98c0aac1f83860cec5156116FE68725642E', name: 'John Doe' };
        render(createTestComponent({ voter }));

        expect(screen.getByText(voter.name)).toBeInTheDocument();
    });

    it('renders the "You" tag if the voter is the current user', () => {
        const voter = { address: '0x1234567890123456789012345678901234567890' };
        render(createTestComponent({ voter }));

        expect(screen.getByText('You')).toBeInTheDocument();
    });

    it('renders "Your Delegate" tag if the voter is a delegate of the current user', () => {
        const voter = { address: '0x1D03D98c0aac1f83860cec5156116FE68725642E' };
        const isDelegate = true;
        render(createTestComponent({ voter, isDelegate }));

        expect(screen.getByText('Your Delegate')).toBeInTheDocument();
    });
});
