import { type Hash } from 'viem';
import { IconType, type AvatarIconVariant, type IDataListItemProps } from '../../../../../core';

export enum TxStatusCode {
    PENDING = 'PENDING',
    SUCCESS = 'SUCCESS',
    FAILED = 'FAILED',
}

export enum TransactionType {
    DEPOSIT = 'DEPOSIT',
    WITHDRAW = 'WITHDRAW',
    ACTION = 'ACTION',
}

export const txHeadingStringList: Record<TransactionType, string> = {
    [TransactionType.DEPOSIT]: 'Deposit',
    [TransactionType.WITHDRAW]: 'Withdraw',
    [TransactionType.ACTION]: 'Smart contract action',
};

export const txIconTypeList: Record<TransactionType, IconType> = {
    [TransactionType.DEPOSIT]: IconType.DEPOSIT,
    [TransactionType.WITHDRAW]: IconType.WITHDRAW,
    [TransactionType.ACTION]: IconType.BLOCKCHAIN_SMARTCONTRACT,
};

export const txVariantList: Record<TransactionType, AvatarIconVariant> = {
    [TransactionType.DEPOSIT]: 'success',
    [TransactionType.WITHDRAW]: 'warning',
    [TransactionType.ACTION]: 'info',
};

export interface ITransactionDataListItemProps extends IDataListItemProps {
    /**
     * The chain ID of the transaction.
     */
    chainId?: number;
    /**
     * The address of the token.
     */
    tokenAddress?: string;
    /**
     * The symbol of the token, e.g. 'ETH' as a string
     */
    tokenSymbol?: string;
    /**
     * The token value in the transaction.
     */
    tokenValue?: number;
    /**
     * The type of transaction.
     */
    transactionType?: TransactionType;
    /**
     * The network state of the transaction.
     */
    status?: TxStatusCode;
    /**
     * The Unix timestamp of the transaction.
     */
    unixTimestamp?: number;
    /**
     * The estimated USD value of the transaction.
     */
    usdEstimate?: number;
    /**
     * Whether the transaction is pending.
     */
    isPending?: boolean;
    /**
     * The transaction hash.
     */
    txHash?: Hash;
}
