import { render, screen } from '@testing-library/react';
import { AssetTransfer } from '../../../../asset';
import type { IProposalActionWithdrawToken } from '../../proposalActionsTypes';
import { generateProposalActionWithdrawToken } from '../generators/proposalActionWithdrawToken';
import { type IProposalActionWithdrawTokenProps, ProposalActionWithdrawToken } from './proposalActionWithdrawToken';

jest.mock('../../../../asset', () => ({
    AssetTransfer: jest.fn(() => <div>Mock AssetTransfer</div>),
}));

describe('<ProposalActionWithdrawToken /> component', () => {
    const createTestComponent = (props?: Partial<IProposalActionWithdrawToken>) => {
        const defaultProps: IProposalActionWithdrawTokenProps = {
            action: generateProposalActionWithdrawToken(props),
        };

        return <ProposalActionWithdrawToken {...defaultProps} />;
    };

    it('renders the AssetTransfer component', () => {
        render(createTestComponent());
        expect(screen.getByText('Mock AssetTransfer')).toBeInTheDocument();
    });

    it('passes correct props to AssetTransfer', () => {
        const action = generateProposalActionWithdrawToken({
            sender: { address: '0x1D03D98c0aac1f83860cec5156116FE68725642E' },
            receiver: { address: '0x1D03D98c0aac1f83860cec5156116FE687259999' },
            token: {
                name: 'Bitcoin',
                symbol: 'BTC',
                logo: 'btc-logo.png',
                decimals: 8,
                priceUsd: '50000',
                address: '0x1234567890abcdef1234567890abcdef12345678',
            },
            amount: '10',
        });

        render(createTestComponent(action));

        expect(AssetTransfer).toHaveBeenCalledWith(
            expect.objectContaining({
                sender: action.sender,
                recipient: action.receiver,
                assetName: action.token.name,
                assetAmount: action.amount,
                assetSymbol: action.token.symbol,
                assetIconSrc: action.token.logo,
                hash: '',
            }),
            expect.any(Object),
        );
    });
});
