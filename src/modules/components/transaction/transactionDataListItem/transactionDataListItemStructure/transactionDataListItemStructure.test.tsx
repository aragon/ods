import { render, screen, waitFor } from '@testing-library/react';
import * as wagmi from 'wagmi';
import { DataList, DateFormat, NumberFormat, formatterUtils } from '../../../../../core';
import { TransactionDataListItemStructure } from './transactionDataListItemStructure';
import {
    TransactionStatus,
    TransactionType,
    type ITransactionDataListItemProps,
} from './transactionDataListItemStructure.api';

describe('<TransactionDataListItem.Structure /> component', () => {
    const useChainsMock = jest.spyOn(wagmi, 'useChains');

    beforeEach(() => {
        useChainsMock.mockReturnValue([
            {
                id: 1,
                blockExplorers: {
                    default: { name: 'Etherscan', url: 'https://etherscan.io', apiUrl: 'https://api.etherscan.io/api' },
                },
                name: 'Chain Name',
                nativeCurrency: {
                    decimals: 18,
                    name: 'Ether',
                    symbol: 'ETH',
                },
                rpcUrls: { default: { http: ['https://cloudflare-eth.com'] } },
            },
        ]);
    });

    afterEach(() => {
        useChainsMock.mockReset();
    });

    const createTestComponent = (props?: Partial<ITransactionDataListItemProps>) => {
        const defaultProps: ITransactionDataListItemProps = {
            chainId: 1,
            hash: '0x123',
            date: '2023-01-01T00:00:00Z',
            ...props,
        };
        return (
            <DataList.Root entityLabel="Transactions">
                <DataList.Container>
                    <TransactionDataListItemStructure {...defaultProps} />
                </DataList.Container>
            </DataList.Root>
        );
    };

    it('renders the transaction type heading', () => {
        const type = TransactionType.ACTION;
        render(createTestComponent({ type }));
        const transactionTypeHeading = screen.getByText('Smart contract action');
        expect(transactionTypeHeading).toBeInTheDocument();
    });

    it('renders the token value and symbol in a deposit', () => {
        const tokenSymbol = 'ETH';
        const tokenAmount = 10;
        const type = TransactionType.DEPOSIT;
        render(createTestComponent({ tokenSymbol, tokenAmount, type }));
        const tokenPrintout = screen.getByText('10 ETH');
        expect(tokenPrintout).toBeInTheDocument();
    });

    it('renders the formatted USD estimate', () => {
        const tokenPrice = 100;
        const tokenAmount = 10;
        const type = TransactionType.DEPOSIT;
        const formattedEstimate = formatterUtils.formatNumber(tokenPrice * tokenAmount, {
            format: NumberFormat.FIAT_TOTAL_SHORT,
        });
        render(createTestComponent({ tokenPrice, tokenAmount, type }));
        const formattedUsdEstimate = screen.getByText(formattedEstimate as string);
        expect(formattedUsdEstimate).toBeInTheDocument();
    });

    it('renders a failed transaction indicator alongside the transaction type', () => {
        render(createTestComponent({ type: TransactionType.DEPOSIT, status: TransactionStatus.FAILED }));
        const failedTransactionText = screen.getByText('Deposit');
        expect(failedTransactionText).toBeInTheDocument();
        const closeIcon = screen.getByTestId('CLOSE');
        expect(closeIcon).toBeInTheDocument();
    });

    it('renders the provided date correctly', () => {
        const date = '2000-01-01T00:00:00Z';
        render(createTestComponent({ date }));
        const formattedDate = formatterUtils.formatDate(date, { format: DateFormat.YEAR_MONTH_DAY_TIME })!;
        expect(screen.getByText(formattedDate)).toBeInTheDocument();
    });

    it('renders with the correct block explorer URL', async () => {
        const chainId = 1;
        const hash = '0x123';
        render(createTestComponent({ chainId, hash }));

        await waitFor(() => {
            const linkElement = screen.getByRole<HTMLAnchorElement>('link');
            expect(linkElement).toHaveAttribute('href', 'https://etherscan.io/tx/0x123');
        });
    });
});
