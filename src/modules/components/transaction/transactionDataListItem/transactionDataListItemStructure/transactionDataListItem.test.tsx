import { render, screen, waitFor } from '@testing-library/react';
import { DataList, NumberFormat, formatterUtils } from '../../../../../core';
import { TransactionDataListItemStructure } from './transactionDataListItemStructure';
import {
    TransactionStatus,
    TransactionType,
    type ITransactionDataListItemProps,
} from './transactionDataListItemStructure.api';

jest.mock('wagmi', () => ({
    useChains: () => [
        {
            id: '1',
            blockExplorers: { default: { url: 'https://example.com' } },
        },
    ],
}));

describe('<TransactionDataListItemStructure /> component', () => {
    const createTestComponent = (props?: Partial<ITransactionDataListItemProps>) => {
        const defaultProps: ITransactionDataListItemProps = {
            chainId: 1,
            type: TransactionType.ACTION,
            status: TransactionStatus.PENDING,
            hash: '0x123',
            ...props,
        };
        return (
            <DataList.Root entityLabel="Daos">
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

    it('overrides the transaction type display with the transaction status', () => {
        render(createTestComponent({ type: TransactionType.DEPOSIT, status: TransactionStatus.FAILED }));
        const failedTransactionText = screen.getByText('Failed transaction');
        expect(failedTransactionText).toBeInTheDocument();
        const closeIcon = screen.getByTestId('CLOSE');
        expect(closeIcon).toBeInTheDocument();
    });

    it('renders the provided timestamp correctly', () => {
        const timestamp = '2023-01-01T00:00:00Z';
        render(createTestComponent({ timestamp }));
        expect(screen.getByText(timestamp)).toBeInTheDocument();
    });

    it('renders with the correct block explorer URL', async () => {
        render(createTestComponent());

        await waitFor(() => {
            const linkElement = screen.getByRole<HTMLAnchorElement>('link');
            expect(linkElement).toHaveAttribute('href', 'https://example.com/tx/0x123');
        });
    });
});
