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
    FAILED = 'FAILED',
}

export const txHeadingStringList: Record<TransactionType, string> = {
    [TransactionType.DEPOSIT]: 'Deposit',
    [TransactionType.WITHDRAW]: 'Withdraw',
    [TransactionType.ACTION]: 'Smart contract action',
    [TransactionType.FAILED]: 'Failed transaction',
};

export const txIconTypeList: Record<TransactionType, IconType> = {
    [TransactionType.DEPOSIT]: IconType.DEPOSIT,
    [TransactionType.WITHDRAW]: IconType.WITHDRAW,
    [TransactionType.ACTION]: IconType.BLOCKCHAIN_SMARTCONTRACT,
    [TransactionType.FAILED]: IconType.CLOSE,
};

export const txVariantList: Record<TransactionType, AvatarIconVariant> = {
    [TransactionType.DEPOSIT]: 'success',
    [TransactionType.WITHDRAW]: 'warning',
    [TransactionType.ACTION]: 'info',
    [TransactionType.FAILED]: 'critical',
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
    txType: TransactionType;
    /**
     * The current status of a blockchain transaction on the network.
     */
    txStatus: TxStatusCode;
    /**
     * The Unix timestamp of the transaction.
     */
    unixTimestamp?: number;
    /**
     * The estimated fiat value of the transaction.
     */
    fiatEstimate?: number;
    /**
     * The transaction hash.
     */
    txHash: Hash;
}
