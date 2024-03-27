import { useEffect, useState } from 'react';
import { useChains } from 'wagmi';
import { AvatarIcon, DataList, Heading, NumberFormat, Spinner, formatterUtils } from '../../../../../core';
import {
    TransactionType,
    TxStatusCode,
    txHeadingStringList,
    txIconTypeList,
    txVariantList,
    type ITransactionDataListItemProps,
} from './transactionDataListItemStructure.api';

export const TransactionDataListItemStructure: React.FC<ITransactionDataListItemProps> = (props) => {
    const {
        chainId,
        tokenAddress,
        tokenSymbol,
        tokenValue,
        fiatEstimate,
        txType = TransactionType.ACTION,
        txStatus = TxStatusCode.PENDING,
        // TO-DO: implement formatter decision for unixTimestamp
        unixTimestamp,
        txHash,
        ...otherProps
    } = props;
    const [blockExplorerBaseUrl, setBlockExplorerBaseUrl] = useState<string | undefined>();
    const chains = useChains();

    useEffect(() => {
        if (chainId) {
            const matchingChain = chains.find((chain) => chain.id === chainId);
            const url = matchingChain?.blockExplorers?.default.url;
            setBlockExplorerBaseUrl(url);
        }
    }, [chainId, chains]);

    const effectiveType = txStatus === TxStatusCode.FAILED ? 'FAILED' : txType;

    const icon = txIconTypeList[effectiveType];
    const variant = txVariantList[effectiveType];
    const heading = txHeadingStringList[effectiveType];

    return (
        <DataList.Item
            className="min-w-fit !py-0 px-4 md:px-6"
            {...otherProps}
            href={blockExplorerBaseUrl && txHash ? `${blockExplorerBaseUrl}/tx/${txHash}` : undefined}
            target="_blank"
        >
            <div className="flex w-full justify-between py-3 md:py-4">
                <div className="flex items-center gap-x-3 md:gap-x-4">
                    {txStatus !== TxStatusCode.PENDING && (
                        <AvatarIcon className="shrink-0" variant={variant} icon={icon} responsiveSize={{ md: 'md' }} />
                    )}
                    {txStatus === TxStatusCode.PENDING && (
                        <div className="flex size-6 shrink-0 items-center justify-center md:size-8">
                            <Spinner className="transition" variant="neutral" responsiveSize={{ md: 'lg' }} />
                        </div>
                    )}
                    <div className="flex w-full flex-col items-start gap-y-0.5">
                        <Heading size="h5" as="h2">
                            {heading}
                        </Heading>
                        <Heading className="!text-neutral-500" size="h5" as="h2">
                            {unixTimestamp && unixTimestamp}
                            {!unixTimestamp && '-'}
                        </Heading>
                    </div>
                </div>

                <div className="flex flex-col items-end gap-y-0.5">
                    <Heading size="h5" as="h2">
                        {tokenValue && txType !== TransactionType.ACTION && (
                            <>
                                {formatterUtils.formatNumber(tokenValue > 0 ? tokenValue : null, {
                                    format: NumberFormat.TOKEN_AMOUNT_SHORT,
                                })}
                                {` ${tokenSymbol}`}
                            </>
                        )}
                        {(tokenValue === undefined || txType === TransactionType.ACTION) && `-`}
                    </Heading>
                    <Heading className="!text-neutral-500" size="h5" as="h2">
                        {formatterUtils.formatNumber(
                            fiatEstimate && txType !== TransactionType.ACTION ? fiatEstimate : 0,
                            {
                                format: NumberFormat.FIAT_TOTAL_SHORT,
                            },
                        )}
                    </Heading>
                </div>
            </div>
        </DataList.Item>
    );
};
