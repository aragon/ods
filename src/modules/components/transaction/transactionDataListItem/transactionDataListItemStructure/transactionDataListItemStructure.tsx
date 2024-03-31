import classNames from 'classnames';
import { useChains } from 'wagmi';
import { AvatarIcon, DataList, Heading, IconType, NumberFormat, Spinner, formatterUtils } from '../../../../../core';
import {
    TransactionStatus,
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
        tokenAmount,
        tokenPrice,
        type = TransactionType.ACTION,
        status = TransactionStatus.PENDING,
        // TO-DO: implement formatter decision
        timestamp,
        hash,
        href,
        className,
        ...otherProps
    } = props;
    const chains = useChains();

    const matchingChain = chains.find((chain) => chain.id.toString() === chainId.toString());
    const blockExplorerBaseUrl = matchingChain?.blockExplorers?.default?.url;
    const blockExplorerAssembledHref = blockExplorerBaseUrl && hash ? `${blockExplorerBaseUrl}/tx/${hash}` : undefined;

    const parsedHref = blockExplorerAssembledHref ?? href;

    const getEffectiveTxType = () => {
        const e = type;
        if (status === TransactionStatus.FAILED) {
            return {
                icon: IconType.CLOSE,
                variant: 'critical' as const,
                heading: 'Failed transaction',
            };
        }

        return {
            icon: txIconTypeList[e],
            variant: txVariantList[e],
            heading: txHeadingStringList[e],
        };
    };

    const { icon, variant, heading } = getEffectiveTxType();

    const formattedTokenValue = formatterUtils.formatNumber(tokenAmount && tokenAmount > 0 ? tokenAmount : null, {
        format: NumberFormat.TOKEN_AMOUNT_SHORT,
    });

    const fiatValue = Number(tokenAmount ?? 0) * Number(tokenPrice ?? 0);

    const formattedTokenPrice = formatterUtils.formatNumber(
        fiatValue && type !== TransactionType.ACTION ? fiatValue : 0,
        {
            format: NumberFormat.FIAT_TOTAL_SHORT,
        },
    );

    const formattedTokenAmount =
        type === TransactionType.ACTION || tokenAmount == null ? '-' : `${formattedTokenValue} ${tokenSymbol}`;

    return (
        <DataList.Item
            className={classNames('min-w-fit px-4 py-0 md:px-6', className)}
            href={parsedHref}
            target="_blank"
            {...otherProps}
        >
            <div className="flex w-full justify-between py-3 md:py-4">
                <div className="flex items-center gap-x-3 md:gap-x-4">
                    {status !== TransactionStatus.PENDING && (
                        <AvatarIcon className="shrink-0" variant={variant} icon={icon} responsiveSize={{ md: 'md' }} />
                    )}
                    {status === TransactionStatus.PENDING && (
                        <div className="flex size-6 shrink-0 items-center justify-center md:size-8">
                            <Spinner className="transition" variant="neutral" responsiveSize={{ md: 'lg' }} />
                        </div>
                    )}
                    <div className="flex w-full flex-col items-start gap-y-0.5">
                        <Heading size="h5" as="h2">
                            {heading}
                        </Heading>
                        <Heading className="!text-neutral-500" size="h5" as="h2">
                            {timestamp ? timestamp : '-'}
                        </Heading>
                    </div>
                </div>

                <div className="flex flex-col items-end gap-y-0.5">
                    <Heading size="h5" as="h2">
                        {formattedTokenAmount}
                    </Heading>
                    <Heading className="!text-neutral-500" size="h5" as="h2">
                        {formattedTokenPrice}
                    </Heading>
                </div>
            </div>
        </DataList.Item>
    );
};
