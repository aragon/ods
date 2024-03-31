import { type Hash } from 'viem';
import { IconType, type AvatarIconVariant, type IDataListItemProps } from '../../../../../core';

export enum TransactionStatus {
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
    chainId: number;
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
    tokenAmount?: number;
    /**
     * The estimated fiat value of the transaction.
     */
    tokenPrice?: number | string;
    /**
     * The type of transaction. @default TransactionType.ACTION
     */
    type?: TransactionType;
    /**
     * The current status of a blockchain transaction on the network. @default TransactionStatus.PENDING
     */
    status?: TransactionStatus;
    /**
     * The Unix timestamp of the transaction.
     */
    timestamp?: string;
    /**
     * The transaction hash.
     */
    hash: Hash;
}
