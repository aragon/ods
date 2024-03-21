import { AvatarIcon, DataList, Heading, NumberFormat, Spinner, formatterUtils } from '../../../../../core';
import { QueryType, createBlockExplorerLink } from '../../../../utils/blockExplorerUtils/blockExplorerUtils';
import { formatDate } from '../../../../utils/timestampUtils';
import {
    TransactionType,
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
        transactionType,
        unixTimestamp,
        txHash,
        ...otherProps
    } = props;

    const getTxIcon = () => {
        if (transactionType) {
            return (
                <AvatarIcon
                    variant={txVariantList[transactionType]}
                    icon={txIconTypeList[transactionType]}
                    responsiveSize={{ md: 'md' }}
                />
            );
        }
        return <Spinner className="transition" variant="neutral" responsiveSize={{ md: 'lg' }} />;
    };

    return (
        <DataList.Item
            className="min-w-fit !py-0 px-4 md:px-6"
            {...otherProps}
            href={createBlockExplorerLink({ chainId, queryType: QueryType.TX, txHash })}
            target="_blank"
        >
            <div className="flex w-full justify-between py-3 md:py-4">
                <div className="flex gap-x-3 md:gap-x-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-x-2">{getTxIcon()}</div>
                    </div>
                    <div className="flex w-full flex-col items-start gap-y-0.5">
                        <Heading className="text-neutral-800" size="h5" as="h2">
                            {transactionType ? txHeadingStringList[transactionType] : 'Transfer Type'}
                        </Heading>
                        <Heading className="!text-neutral-500" size="h5" as="h2">
                            {formatDate(unixTimestamp)}
                        </Heading>
                    </div>
                </div>

                <div className="flex flex-col items-end gap-y-0.5">
                    <Heading size="h5" as="h2">
                        {tokenValue && transactionType !== TransactionType.ACTION ? (
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
                            usdEstimate && transactionType !== TransactionType.ACTION ? usdEstimate : 0,
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
