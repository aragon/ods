import { render, screen } from '@testing-library/react';
import { DataList, NumberFormat, formatterUtils } from '../../../../../core';
import { addressUtils } from '../../../../utils';
import { VoteDataListItem, type IVoteDataListItemStructureProps } from '../../voteDataListItem';

jest.mock('../../../member', () => ({
    MemberAvatar: () => <div data-testid="member-avatar" />,
}));

jest.mock('../../../../../core/components/tag', () => ({
    Tag: ({ label }: { label: string }) => <div data-testid="tag">{label}</div>,
}));

describe('<VotesDataListItem.Structure /> component', () => {
    const createTestComponent = (props?: Partial<IVoteDataListItemStructureProps>) => {
        const completeProps: IVoteDataListItemStructureProps = {
            voter: { address: '0x1D03D98c0aac1f83860cec5156116FE68725642E' },
            voteIndicator: 'yes',
            ...props,
        };

        return (
            <DataList.Root entityLabel="Votes">
                <DataList.Container>
                    <VoteDataListItem.Structure {...completeProps} />
                </DataList.Container>
            </DataList.Root>
        );
    };

    it('renders with minimum props', () => {
        const voter = { address: '0x1D03D98c0aac1f83860cec5156116FE68725642E' };
        const voteIndicator = 'no';
        render(
            createTestComponent({
                voter,
                voteIndicator,
            }),
        );
        const formattedAddress = addressUtils.truncateAddress(voter.address);

        expect(screen.getByTestId('member-avatar')).toBeInTheDocument();
        expect(screen.getByText(formattedAddress)).toBeInTheDocument();
        expect(screen.getByTestId('tag')).toHaveTextContent('no');
    });

    it('renders the formatted token vote amount and symbol', () => {
        const voteTokenAmount = 50000;
        const voteTokenSymbol = 'WIP';
        const formattedTokenNumber = formatterUtils.formatNumber(voteTokenAmount, {
            format: NumberFormat.TOKEN_AMOUNT_SHORT,
        }) as string;

        render(createTestComponent({ voteTokenAmount, voteTokenSymbol }));

        expect(screen.getByText(`${formattedTokenNumber} ${voteTokenSymbol}`)).toBeInTheDocument();
    });

    it('renders the voter name if available', () => {
        const voter = { address: '0x1D03D98c0aac1f83860cec5156116FE68725642E', name: 'John Doe' };
        render(createTestComponent({ voter }));

        expect(screen.getByText(voter.name)).toBeInTheDocument();
    });
});
