import classNames from 'classnames';
import { type Hash } from 'viem';
import { useConfig } from 'wagmi';
import { Avatar, AvatarIcon, IconType, NumberFormat, formatterUtils } from '../../../../core';
import { type IWeb3ComponentProps } from '../../../types';
import { addressUtils } from '../../../utils';
import { AssetTransferAddress } from './assetTransferAddress';

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

// could be moved to a utils file for export? reusable in TranactionDataListItem.Structure for example
const formatValue = (tokenAmount: number, tokenSymbol: string, tokenPrice: number | string) => {
    const formattedTokenValue = formatterUtils.formatNumber(tokenAmount, {
        format: NumberFormat.TOKEN_AMOUNT_SHORT,
        withSign: true,
    });
    const fiatValue = Number(tokenAmount) * Number(tokenPrice);
    const formattedFiatValue = formatterUtils.formatNumber(fiatValue, { format: NumberFormat.FIAT_TOTAL_SHORT });
    const formattedTokenAmount = `${formattedTokenValue} ${tokenSymbol}`;

    return { formattedTokenAmount, formattedFiatValue };
};

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

    const createLink = (address: Hash) => blockExplorerUrl && `${blockExplorerUrl}/address/${address}`;
    const resolveHandle = (ensName: string | undefined, address: Hash) =>
        ensName ?? addressUtils.truncateAddress(address);

    const { formattedTokenAmount, formattedFiatValue } = formatValue(tokenAmount, tokenSymbol, tokenPrice);

    return (
        <div className="flex h-full w-[320px] flex-col gap-y-2 md:w-[640px] md:gap-y-3">
            <div className="relative flex h-full  flex-col rounded-xl border-[1px] border-neutral-100 md:flex-row">
                <AssetTransferAddress
                    txRole="sender"
                    ensName={senderEnsName}
                    address={senderAddress}
                    link={createLink(senderAddress)}
                    handle={resolveHandle(senderEnsName, senderAddress)}
                />
                <div className="border-t-[1px] border-neutral-100 md:border-l-[1px]" />
                <AvatarIcon
                    icon={IconType.CHEVRON_DOWN}
                    size="sm"
                    className={classNames(
                        'absolute left-4 top-1/2 -translate-y-1/2 bg-neutral-50 text-neutral-300', //base
                        'md:left-1/2 md:-translate-x-1/2 md:-rotate-90', //responsive
                    )}
                />
                <AssetTransferAddress
                    txRole="recipient"
                    ensName={recipientEnsName}
                    address={recipientAddress}
                    link={createLink(recipientAddress)}
                    handle={resolveHandle(recipientEnsName, recipientAddress)}
                />
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
