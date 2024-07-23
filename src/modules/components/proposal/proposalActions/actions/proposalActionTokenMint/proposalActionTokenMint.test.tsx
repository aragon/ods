import { render, screen } from '@testing-library/react';
import { modulesCopy } from '../../../../../assets';
import { OdsModulesProvider } from '../../../../odsModulesProvider';
import { generateProposalActionTokenMint } from '../generators';
import { ProposalActionTokenMint, type IProposalActionTokenMintProps } from './proposalActionTokenMint';

jest.mock('../../../../member/memberDataListItem/memberDataListItemStructure', () => ({
    MemberDataListItemStructure: () => <div data-testid="member-data-list-item" />,
}));

describe('<ProposalActionTokenMint /> component', () => {
    const createTestComponent = (props?: Partial<IProposalActionTokenMintProps>) => {
        const completeProps: IProposalActionTokenMintProps = {
            action: generateProposalActionTokenMint(),
            ...props,
        };

        return (
            <OdsModulesProvider>
                <ProposalActionTokenMint {...completeProps} />
            </OdsModulesProvider>
        );
    };

    it('renders the Summary heading', () => {
        render(createTestComponent());
        const summaryHeading = screen.getByText(modulesCopy.proposalActionsTokenMint.summaryHeading);
        expect(summaryHeading).toBeInTheDocument();
    });

    it('renders the correct summary terms', () => {
        render(createTestComponent());
        expect(screen.getByText(modulesCopy.proposalActionsTokenMint.newHoldersTerm)).toBeInTheDocument();
        expect(screen.getByText(modulesCopy.proposalActionsTokenMint.newTokensTerm)).toBeInTheDocument();
        expect(screen.getByText(modulesCopy.proposalActionsTokenMint.totalHoldersTerm)).toBeInTheDocument();
        expect(screen.getByText(modulesCopy.proposalActionsTokenMint.totalTokenSupplyTerm)).toBeInTheDocument();
    });

    it('renders the correct number of MemberDataListItemStructure components', () => {
        const receivers = [
            {
                currentBalance: 0,
                newBalance: 5,
                address: '0x32c2FE388ABbB3e678D44DF6a0471086D705316a',
            },
            {
                currentBalance: 100,
                newBalance: 110,
                address: '0xeefB13C7D42eFCc655E528dA6d6F7bBcf9A2251d',
            },
        ];
        const action = generateProposalActionTokenMint({ receivers });
        render(createTestComponent({ action }));
        const memberItems = screen.getAllByTestId('member-data-list-item');
        expect(memberItems.length).toBe(2);
    });

    it('renders the correct token supply', () => {
        const tokenSupply = 1000;
        const tokenSymbol = 'PDC';
        const action = generateProposalActionTokenMint({ tokenSupply, tokenSymbol });
        render(createTestComponent({ action }));
        expect(screen.getByText('1K PDC')).toBeInTheDocument();
    });

    it('renders the correct token holders', () => {
        const holdersCount = 999;
        const action = generateProposalActionTokenMint({ holdersCount });
        render(createTestComponent({ action }));
        expect(screen.getByText('999')).toBeInTheDocument();
    });

    it('does not render Voting Power label', () => {
        render(createTestComponent());
        expect(screen.queryByText('Voting Power')).not.toBeInTheDocument();
    });

    it('calculates new token holders correctly', () => {
        const receivers = [
            {
                currentBalance: 0,
                newBalance: 5,
                address: '0x32c2FE388ABbB3e678D44DF6a0471086D705316a',
            },
            {
                currentBalance: 100,
                newBalance: 110,
                address: '0xeefB13C7D42eFCc655E528dA6d6F7bBcf9A2251d',
            },
            {
                currentBalance: 0,
                newBalance: 200,
                address: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e',
            },
        ];
        const action = generateProposalActionTokenMint({ receivers });
        render(createTestComponent({ action }));
        expect(screen.getByText('+2')).toBeInTheDocument();
    });
    it('calculates new tokens correctly', () => {
        const receivers = [
            {
                currentBalance: 0,
                newBalance: 5,
                address: '0x32c2FE388ABbB3e678D44DF6a0471086D705316a',
            },
            {
                currentBalance: 100,
                newBalance: 110,
                address: '0xeefB13C7D42eFCc655E528dA6d6F7bBcf9A2251d',
            },
            {
                currentBalance: 50,
                newBalance: 200,
                address: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e',
            },
        ];
        const tokenSymbol = 'PDC';
        const action = generateProposalActionTokenMint({ receivers, tokenSymbol });
        render(createTestComponent({ action }));
        expect(screen.getByText('+165 PDC')).toBeInTheDocument();
    });
});
