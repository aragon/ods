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
import { QueryType, createBlockExplorerLink } from '../../../../utils/blockExplorerUtils/blockExplorerUtils';
import { formatDate } from '../../../../utils/timestampUtils';
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
        usdEstimate,
        txType,
        txStatus = TxStatusCode.PENDING,
        unixTimestamp,
        txHash,
        ...otherProps
    } = props;

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
            icon: type ? txIconTypeList[type] : IconType.HELP,
            variant: type ? txVariantList[type] : ('neutral' as AvatarIconVariant),
            heading: type ? txHeadingStringList[type] : 'Unknown',
        };
    };

    const { icon, variant, heading } = getEffectiveStatus();

    const getTxIcon = () => {
        if (txStatus !== TxStatusCode.PENDING) {
            return <AvatarIcon className="shrink-0" variant={variant} icon={icon} responsiveSize={{ md: 'md' }} />;
        }
        return (
            <div className="flex size-6 shrink-0 items-center justify-center md:size-8">
                <Spinner className="transition" variant="neutral" responsiveSize={{ md: 'lg' }} />
            </div>
        );
    };

    return (
        <DataList.Item
            className="min-w-fit !py-0 px-4 md:px-6"
            {...otherProps}
            href={createBlockExplorerLink({ chainId, queryType: QueryType.TX, txHash })}
            target="_blank"
        >
            <div className="flex w-full justify-between py-3 md:py-4">
                <div className="flex items-center gap-x-3 md:gap-x-4">
                    {getTxIcon()}
                    <div className="flex w-full flex-col items-start gap-y-0.5">
                        <Heading size="h5" as="h2">
                            {heading}
                        </Heading>
                        <Heading className="!text-neutral-500" size="h5" as="h2">
                            {formatDate(unixTimestamp)}
                        </Heading>
                    </div>
                </div>

                <div className="flex flex-col items-end gap-y-0.5">
                    <Heading size="h5" as="h2">
                        {tokenValue && txType !== TransactionType.ACTION ? (
                            <>
                                {formatterUtils.formatNumber(tokenValue, { format: NumberFormat.TOKEN_AMOUNT_SHORT })}
                                {` ${tokenSymbol}`}
                            </>
                        ) : (
                            `-`
                        )}
                    </Heading>
                    <Heading className="!text-neutral-500" size="h5" as="h2">
                        {formatterUtils.formatNumber(
                            usdEstimate && txType !== TransactionType.ACTION ? usdEstimate : 0,
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
