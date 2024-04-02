import { render, screen } from '@testing-library/react';
import { NumberFormat, formatterUtils } from '../../../../core';
import { OdsModulesProvider } from '../../odsModulesProvider';
import { AssetTransfer, type IAssetTransferProps } from './assetTransfer';

jest.mock('../../member/memberAvatar', () => ({ MemberAvatar: () => <div data-testid="member-avatar-mock" /> }));

describe('<AssetTransfer /> component', () => {
    const createTestComponent = (props?: Partial<IAssetTransferProps>) => {
        const minimumProps: IAssetTransferProps = {
            recipientAddress: '0x1D03D98c0aac1f83860cec5156116FE68725642E',
            senderAddress: '0x1D03D98c0aac1f83860cec5156116FE687259999',
            tokenIconSrc: 'https://assets.coingecko.com/coins/images/279/large/ethereum.png?1696501628',
            tokenSymbol: 'ETH',
            tokenAmount: 1,
            tokenName: 'Ethereum',
            hash: '0xf006e9454ad77c5e8e6f54106c6939d3d8b68ae16fc216d67c752f54adb21fc6',
            tokenPrice: 3850,
            chainId: 1,
            ...props,
        };

        return (
            <OdsModulesProvider>
                <AssetTransfer {...minimumProps} />
            </OdsModulesProvider>
        );
    };

    it('renders with minimum props', () => {
        const tokenName = 'Bitcoin';
        render(createTestComponent({ tokenName }));

        expect(screen.getByText('Bitcoin')).toBeInTheDocument();
    });

    it('renders correctly with optional props, preferring ENS over address when available', () => {
        const senderEnsName = 'sender.eth';
        const recipientEnsName = 'recipient.eth';
        render(createTestComponent({ senderEnsName, recipientEnsName }));

        expect(screen.getByText('sender.eth')).toBeInTheDocument();
        expect(screen.getByText('recipient.eth')).toBeInTheDocument();
    });

    it('renders the formatted fiat estimate', () => {
        const tokenPrice = 100;
        const tokenAmount = 10;

        const formattedEstimate = formatterUtils.formatNumber(tokenPrice * tokenAmount, {
            format: NumberFormat.FIAT_TOTAL_SHORT,
        });
        render(createTestComponent({ tokenPrice, tokenAmount }));
        const formattedUsdEstimate = screen.getByText(formattedEstimate as string);
        expect(formattedUsdEstimate).toBeInTheDocument();
    });

    it('renders the token value and symbol with sign', () => {
        const tokenSymbol = 'ETH';
        const tokenAmount = 10;

        render(createTestComponent({ tokenSymbol, tokenAmount }));
        const tokenPrintout = screen.getByText('+10 ETH');
        expect(tokenPrintout).toBeInTheDocument();
    });

    it('renders sender and recipient addresses when ENS names are not provided', () => {
        render(createTestComponent());

        expect(screen.getByText('0x1D…642E')).toBeInTheDocument();
        expect(screen.getByText('0x1D…9999')).toBeInTheDocument();
    });

    it('renders both avatar elements for the from and to addresses', () => {
        render(createTestComponent());

        expect(screen.getAllByTestId('member-avatar-mock')).toHaveLength(2);
    });

    it('configures and applies the correct links for sender, recipient, transaction', () => {
        const senderAddress = '0x415c8893D514F9BC5211d36eEDA4183226b84AA7';
        const recipientAddress = '0xFf00000000000000000000000000000000081457';
        const hash = '0x0ca620e2dd3147658b8a042b3e7b7cd6f5fa043bf3625140c0dbddcabf47dfb9';

        render(createTestComponent({ senderAddress, recipientAddress, hash }));

        const links = screen.getAllByRole('link');

        const expectedSenderLink = `https://etherscan.io/address/${senderAddress}`;
        const expectedRecipientLink = `https://etherscan.io/address/${recipientAddress}`;
        const expectedTransactionLink = `https://etherscan.io/tx/${hash}`;

        expect(links[0]).toHaveAttribute('href', expectedSenderLink);
        expect(links[1]).toHaveAttribute('href', expectedRecipientLink);
        expect(links[2]).toHaveAttribute('href', expectedTransactionLink);
    });
});
