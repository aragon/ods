import { render, screen } from '@testing-library/react';
import { DataList } from '../../../../../core';
import { TransactionDataListItemStructure } from './transactionDataListItemStructure';
import {
    TransactionType,
    TxStatusCode,
    type ITransactionDataListItemProps,
} from './transactionDataListItemStructure.api';

describe('<TransactionDataListItemStructure /> component', () => {
    const createTestComponent = (props?: Partial<ITransactionDataListItemProps>) => {
        return (
            <DataList.Root entityLabel="Daos">
                <DataList.Container>
                    <TransactionDataListItemStructure {...props} />
                </DataList.Container>
            </DataList.Root>
        );
    };

    it('renders the transaction type heading', () => {
        const txType = TransactionType.ACTION;
        render(createTestComponent({ txType }));
        const transactionTypeHeading = screen.getByText('Smart contract action');
        expect(transactionTypeHeading).toBeInTheDocument();
    });

    // fails on the local run, but passes on the CI for relative unix timestamps (CI server location == UTC 0)
    it('renders the formatted date', () => {
        const unixTimestamp = 1628841600;
        render(createTestComponent({ unixTimestamp }));
        const formattedDate = screen.getByText('January 19, 1970 at 8:27 PM');
        expect(formattedDate).toBeInTheDocument();
    });

    it('renders the token value and symbol', () => {
        const tokenSymbol = 'ETH';
        const tokenValue = 10;
        render(createTestComponent({ tokenSymbol, tokenValue }));
        const tokenPrintout = screen.getByText('10 ETH');
        expect(tokenPrintout).toBeInTheDocument();
    });

    it('renders the formatted USD estimate', () => {
        const usdEstimate = 100;
        render(createTestComponent({ usdEstimate }));
        const formattedUsdEstimate = screen.getByText('$100.00');
        expect(formattedUsdEstimate).toBeInTheDocument();
    });

    it('renders "Unknown" for transactions with an undefined type', () => {
        render(createTestComponent({}));
        const unknownTransactionTypeHeading = screen.getByText('Unknown');
        expect(unknownTransactionTypeHeading).toBeInTheDocument();
    });

    it('overrides the transaction type display with the transaction status', () => {
        render(createTestComponent({ txType: TransactionType.DEPOSIT, txStatus: TxStatusCode.FAILED }));
        const failedTransactionText = screen.getByText('Failed transaction');
        expect(failedTransactionText).toBeInTheDocument();
        const closeIcon = screen.getByTestId('CLOSE');
        expect(closeIcon).toBeInTheDocument();
    });
});
