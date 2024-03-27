import classNames from 'classnames';
import { useChains } from 'wagmi';
import {
    AvatarIcon,
    DataList,
    Heading,
    IconType,
    NumberFormat,
    Spinner,
    formatterUtils,
    type AvatarIconVariant,
} from '../../../../../core';
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
        formattedTimestamp,
        txHash,
        href,
        className,
        ...otherProps
    } = props;
    const chains = useChains();

    const blockExplorerBaseUrl = chainId
        ? chains.find((chain) => chain.id === chainId)?.blockExplorers?.default?.url
        : undefined;
    const blockExplorerAssembledHref =
        blockExplorerBaseUrl && txHash ? `${blockExplorerBaseUrl}/tx/${txHash}` : undefined;

    const parsedHref = blockExplorerAssembledHref ?? href;

    const getEffectiveStatus = () => {
        const type = txType;
        if (txStatus === TxStatusCode.FAILED) {
            return {
                icon: IconType.CLOSE,
                variant: 'critical' as AvatarIconVariant,
                heading: 'Failed transaction',
            };
        }

        return {
            icon: txIconTypeList[type],
            variant: txVariantList[type],
            heading: txHeadingStringList[type],
        };
    };

    const { icon, variant, heading } = getEffectiveStatus();
    const formattedTokenValue = formatterUtils.formatNumber(tokenValue && tokenValue > 0 ? tokenValue : null, {
        format: NumberFormat.TOKEN_AMOUNT_SHORT,
    });

    return (
        <DataList.Item
            className={classNames('min-w-fit px-4 py-0 md:px-6', className)}
            href={parsedHref}
            target="_blank"
            {...otherProps}
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
                            {formattedTimestamp ? formattedTimestamp : '-'}
                        </Heading>
                    </div>
                </div>

                <div className="flex flex-col items-end gap-y-0.5">
                    <Heading size="h5" as="h2">
                        {txType === TransactionType.ACTION || tokenValue == null
                            ? '-'
                            : `${formattedTokenValue} ${tokenSymbol}`}
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
