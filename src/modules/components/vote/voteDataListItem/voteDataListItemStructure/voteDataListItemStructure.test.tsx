import { render, screen } from '@testing-library/react';
import { VoteDataListItem, type IVoteDataListItemStructureProps } from '../..';
import { DataList } from '../../../../../core';

jest.mock('../../../member', () => ({
    MemberAvatar: () => <div data-testid="member-avatar" />,
}));

jest.mock('../../../../utils/addressUtils', () => ({
    addressUtils: {
        truncateAddress: (address: string) => `${address.slice(0, 6)}...${address.slice(-4)}`,
    },
}));

jest.mock('../../../../../core', () => ({
    DataList: {
        Item: (props: any) => <div {...props} />,
    },
    NumberFormat: {
        TOKEN_AMOUNT_SHORT: 'TOKEN_AMOUNT_SHORT',
    },
    Tag: ({ variant, className, label }: any) => (
        <div data-testid="tag" className={`${variant} ${className}`}>
            {label}
        </div>
    ),
    formatterUtils: {
        formatNumber: (amount: number | string | undefined, options: any) =>
            amount ? amount.toString() : options.fallback,
    },
}));

describe('<VotesDataListItem.Structure /> component', () => {
    const createTestComponent = (props?: Partial<IVoteDataListItemStructureProps>) => {
        const completeProps: IVoteDataListItemStructureProps = {
            voter: { address: '0x1D03D98c0aac1f83860cec5156116FE68725642E', name: 'John Doe' },
            voteTokenAmount: 100,
            voteTokenSymbol: 'ETH',
            voteIndicator: 'yes',
            ...props,
        };

        return (
            <DataList.Root entityLabel="Assets">
                <DataList.Container>
                    <VoteDataListItem.Structure {...completeProps} />
                </DataList.Container>
            </DataList.Root>
        );
    };

    it('renders with minimum props', () => {
        render(
            createTestComponent({
                voter: { address: '0x1D03D98c0aac1f83860cec5156116FE68725642E' },
                voteIndicator: 'no',
            }),
        );

        expect(screen.getByText('0x1D03...642E')).toBeInTheDocument();
        expect(screen.getByTestId('tag')).toHaveTextContent('no');
    });

    it('renders the formatted token vote amount and symbol', () => {
        render(createTestComponent({ voteTokenAmount: 50, voteTokenSymbol: 'BTC' }));

        expect(screen.getByText('50 BTC')).toBeInTheDocument();
    });

    it('renders the voter name if available', () => {
        render(createTestComponent());

        expect(screen.getByText('John Doe')).toBeInTheDocument();
    });

    it('renders both the avatar and tag elements', () => {
        render(createTestComponent());

        expect(screen.getByTestId('member-avatar')).toBeInTheDocument();
        expect(screen.getByTestId('tag')).toBeInTheDocument();
    });

    it('uses fallback for vote token amount if not provided', () => {
        render(createTestComponent({ voteTokenAmount: undefined, voteTokenSymbol: 'ETH' }));

        expect(screen.getByText('- ETH')).toBeInTheDocument();
    });
});
