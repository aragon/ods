import { render, screen } from '@testing-library/react';
import { NumberFormat, formatterUtils } from '../../../../core';
import { OdsModulesProvider } from '../../odsModulesProvider';
import { AssetTransfer, type IAssetTransferProps } from './assetTransfer';

jest.mock('./assetTransferAddress/assetTransferAddress.tsx', () => ({
    AssetTransferAddress: () => <div data-testid="asset-transfer-address" />,
}));

describe('<AssetTransfer /> component', () => {
    const formatNumberMock = jest.spyOn(formatterUtils, 'formatNumber');

    beforeEach(() => {
        formatNumberMock.mockImplementation((value, options) => {
            if (options && options.format === NumberFormat.TOKEN_AMOUNT_SHORT) {
                return `+${value}`;
            } else if (options && options.format === NumberFormat.FIAT_TOTAL_SHORT) {
                const formattedFiatValue = `$${Number(value).toFixed(2)}`;
                return formattedFiatValue;
            }
            return null;
        });
    });

    afterEach(() => {
        formatNumberMock.mockReset();
    });

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

    it('renders the formatted fiat estimate', () => {
        const tokenPrice = 100;
        const tokenAmount = 10;

        render(createTestComponent({ tokenPrice, tokenAmount }));
        const formattedUsdEstimate = screen.getByText('$1000.00');
        expect(formattedUsdEstimate).toBeInTheDocument();
    });

    it('renders the token value and symbol with sign', () => {
        const tokenSymbol = 'ETH';
        const tokenAmount = 10;

        render(createTestComponent({ tokenSymbol, tokenAmount }));
        const tokenPrintout = screen.getByText('+10 ETH');
        expect(tokenPrintout).toBeInTheDocument();
    });

    it('renders both avatar elements for the from and to addresses', () => {
        render(createTestComponent());

        expect(screen.getAllByTestId('asset-transfer-address')).toHaveLength(2);
    });

    it('configures and applies the correct link for transfer tx', () => {
        const hash = '0x0ca620e2dd3147658b8a042b3e7b7cd6f5fa043bf3625140c0dbddcabf47dfb9';
        render(createTestComponent({ hash }));

        const links = screen.getByRole('link');
        const expectedTransactionLink = `https://etherscan.io/tx/${hash}`;

        expect(links).toHaveAttribute('href', expectedTransactionLink);
    });
});
