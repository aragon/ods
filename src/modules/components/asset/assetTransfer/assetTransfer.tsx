import classNames from 'classnames';
import { type Hash } from 'viem';
import { useConfig } from 'wagmi';
import { Avatar, AvatarIcon, Icon, IconType, NumberFormat, formatterUtils } from '../../../../core';
import { type IWeb3ComponentProps } from '../../../types';
import { addressUtils } from '../../../utils';
import { MemberAvatar } from '../../member';

export interface IAssetTransferProps extends IWeb3ComponentProps {
    /**
     * Address of the transaction sender.
     */
    senderAddress: Hash;
    /**
     * Address of the transaction recipient.
     */
    recipientAddress: Hash;
    /**
     * ENS name of the transaction sender.
     */
    senderEnsName?: string;
    /**
     * ENS name of the transaction recipient.
     */
    recipientEnsName?: string;
    /**
     * Name of the token transferred.
     */
    tokenName: string;
    /**
     * Icon URL of the tranferred token.
     */
    tokenIconSrc?: string;
    /**
     * Amount of tokens transferred.
     */
    tokenAmount: number;
    /**
     * Symbol of the token transferred. Example: ETH, DAI, etc.
     */
    tokenSymbol: string;
    /**
     * Price per token in fiat.
     */
    tokenPrice: number | string;
    /**
     * Transaction hash.
     */
    hash: string;
    /**
     * Chain ID of the transaction.
     */
    chainId: number;
}

export const AssetTransfer: React.FC<IAssetTransferProps> = (props) => {
    const {
        senderAddress,
        recipientAddress,
        senderEnsName,
        recipientEnsName,
        tokenName,
        tokenIconSrc,
        tokenAmount,
        tokenSymbol,
        tokenPrice,
        chainId,
        hash,
        wagmiConfig: wagmiConfigProps,
    } = props;
    const wagmiConfigProvider = useConfig();

    const wagmiConfig = wagmiConfigProps ?? wagmiConfigProvider;

    const processedChainId = chainId ?? wagmiConfig.chains[0].id;

    const currentChain = wagmiConfig.chains.find(({ id }) => id === processedChainId);
    const blockExplorerUrl = currentChain?.blockExplorers?.default.url;

    const blockExplorerAssembledHref = blockExplorerUrl && hash ? `${blockExplorerUrl}/tx/${hash}` : undefined;

    const resolvedSenderHandle =
        senderEnsName != null && senderEnsName !== '' ? senderEnsName : addressUtils.truncateAddress(senderAddress);

    const resolvedRecipientHandle =
        recipientEnsName != null && recipientEnsName !== ''
            ? recipientEnsName
            : addressUtils.truncateAddress(recipientAddress);

    const resolvedSenderLink =
        blockExplorerUrl && senderAddress ? `${blockExplorerUrl}/address/${senderAddress}` : undefined;
    const resolvedRecipientLink =
        blockExplorerUrl && recipientAddress ? `${blockExplorerUrl}/address/${recipientAddress}` : undefined;

    const formattedTokenValue = formatterUtils.formatNumber(tokenAmount && tokenAmount > 0 ? tokenAmount : null, {
        format: NumberFormat.TOKEN_AMOUNT_SHORT,
        withSign: true,
    });
    const fiatValue = Number(tokenAmount ?? 0) * Number(tokenPrice ?? 0);
    const formattedFiatValue = formatterUtils.formatNumber(fiatValue, {
        format: NumberFormat.FIAT_TOTAL_SHORT,
    });
    const formattedTokenAmount = formattedTokenValue && tokenSymbol ? `${formattedTokenValue} ${tokenSymbol}` : `-`;

    return (
        <div className="flex h-full w-[320px] flex-col gap-y-2 md:w-[640px] md:gap-y-3">
            <div className="relative flex h-full  flex-col rounded-xl border-[1px] border-neutral-100 md:flex-row">
                <a
                    href={resolvedSenderLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={classNames(
                        'flex h-20 w-full items-center space-x-4 rounded-l-xl px-4 py-7', //base
                        'hover:border-neutral-200 hover:shadow-neutral-md', //hover
                        'focus:outline-none focus-visible:rounded-l-xl focus-visible:ring focus-visible:ring-primary focus-visible:ring-offset', //focus
                        'active:border-[1px] active:border-neutral-300', //active
                        'md:w-1/2 md:p-6', //responsive
                    )}
                >
                    <MemberAvatar responsiveSize={{ md: 'md' }} ensName={senderEnsName} address={senderAddress} />
                    <div className="flex flex-col">
                        <p className="text-xs font-normal leading-tight text-neutral-500 md:text-sm">From</p>
                        <div className="flex items-center space-x-1">
                            <p className="text-sm font-normal leading-tight text-neutral-800 md:text-base">
                                {resolvedSenderHandle}
                            </p>
                            <Icon icon={IconType.LINK_EXTERNAL} size="sm" className="text-neutral-300" />
                        </div>
                    </div>
                </a>
                <div className="border-t-[1px] border-neutral-100 md:border-l-[1px]" />
                <AvatarIcon
                    icon={IconType.CHEVRON_DOWN}
                    size="sm"
                    className={classNames(
                        'absolute left-4 top-1/2 -translate-y-1/2 bg-neutral-50 text-neutral-300', //base
                        'md:left-1/2 md:-translate-x-1/2 md:-rotate-90', //responsive
                    )}
                />
                <a
                    href={resolvedRecipientLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={classNames(
                        'flex h-20 w-full items-center space-x-4 rounded-r-xl px-4 py-7', //base
                        'hover:border-neutral-200 hover:shadow-neutral-md', //hover
                        'focus:outline-none focus-visible:rounded-r-xl focus-visible:ring focus-visible:ring-primary focus-visible:ring-offset', //focus
                        'active:border-[1px] active:border-neutral-300', //active
                        'md:w-1/2 md:p-6 md:pl-8', //responsive
                    )}
                >
                    <MemberAvatar responsiveSize={{ md: 'md' }} ensName={recipientEnsName} address={recipientAddress} />
                    <div className="flex flex-col">
                        <p className="text-xs font-normal leading-tight text-neutral-500 md:text-sm">To</p>
                        <div className="flex items-center space-x-1">
                            <p className="text-sm font-normal leading-tight text-neutral-800 md:text-base">
                                {resolvedRecipientHandle}
                            </p>
                            <Icon icon={IconType.LINK_EXTERNAL} size="sm" className="text-neutral-300" />
                        </div>
                    </div>
                </a>
            </div>
            <a
                href={blockExplorerAssembledHref}
                target="_blank"
                rel="noopener noreferrer"
                className={classNames(
                    'flex h-16 w-full items-center justify-between rounded-xl border-[1px] border-neutral-100 px-4',
                    'hover:border-neutral-200 hover:shadow-neutral-md',
                    'focus:outline-none focus-visible:rounded-xl focus-visible:ring focus-visible:ring-primary focus-visible:ring-offset',
                    'active:border-neutral-300',
                    'md:h-20 md:px-6',
                )}
            >
                <div className="flex items-center space-x-3 md:space-x-4">
                    <Avatar responsiveSize={{ md: 'md' }} src={tokenIconSrc} />
                    <p className="text-sm leading-tight text-neutral-800 md:text-base">{tokenName}</p>
                </div>
                <div className="flex flex-col items-end justify-end">
                    <p className="text-sm leading-tight text-neutral-800 md:text-base">{formattedTokenAmount}</p>
                    <p className="text-sm leading-tight text-neutral-500 md:text-base">{formattedFiatValue}</p>
                </div>
            </a>
        </div>
    );
};
