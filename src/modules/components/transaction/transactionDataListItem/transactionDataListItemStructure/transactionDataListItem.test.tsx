import { render, screen } from '@testing-library/react';
import { DataList, NumberFormat, formatterUtils } from '../../../../../core';
import { TransactionDataListItemStructure } from './transactionDataListItemStructure';
import {
    TransactionType,
    TxStatusCode,
    type ITransactionDataListItemProps,
} from './transactionDataListItemStructure.api';

jest.mock('wagmi', () => ({
    ...jest.requireActual('wagmi'),
    useChains: jest.fn(),
}));

describe('<TransactionDataListItemStructure /> component', () => {
    const createTestComponent = (props?: Partial<ITransactionDataListItemProps>) => {
        const defaultProps: ITransactionDataListItemProps = {
            txType: TransactionType.ACTION,
            txStatus: TxStatusCode.PENDING,
            txHash: '0x123',
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
        const txType = TransactionType.ACTION;
        render(createTestComponent({ txType }));
        const transactionTypeHeading = screen.getByText('Smart contract action');
        expect(transactionTypeHeading).toBeInTheDocument();
    });

    it('renders the token value and symbol in a deposit', () => {
        const tokenSymbol = 'ETH';
        const tokenValue = 10;
        const txType = TransactionType.DEPOSIT;
        render(createTestComponent({ tokenSymbol, tokenValue, txType }));
        const tokenPrintout = screen.getByText('10 ETH');
        expect(tokenPrintout).toBeInTheDocument();
    });

    it('renders the formatted USD estimate', () => {
        const fiatEstimate = 100;
        const txType = TransactionType.DEPOSIT;
        const formattedEstimate = formatterUtils.formatNumber(fiatEstimate, {
            format: NumberFormat.FIAT_TOTAL_SHORT,
        });
        render(createTestComponent({ fiatEstimate, txType }));
        const formattedUsdEstimate = screen.getByText(formattedEstimate as string);
        expect(formattedUsdEstimate).toBeInTheDocument();
    });

    it('overrides the transaction type display with the transaction status', () => {
        render(createTestComponent({ txType: TransactionType.DEPOSIT, txStatus: TxStatusCode.FAILED }));
        const failedTransactionText = screen.getByText('Failed transaction');
        expect(failedTransactionText).toBeInTheDocument();
        const closeIcon = screen.getByTestId('CLOSE');
        expect(closeIcon).toBeInTheDocument();
    });
});
