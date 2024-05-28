import classNames from 'classnames';
import { useAccount, useConnect, useDisconnect, useEnsName, type CreateConnectorFn } from 'wagmi';
import { injected, metaMask, safe, walletConnect, type InjectedParameters } from 'wagmi/connectors';
import { StateSkeletonBar, StateSkeletonCircular } from '../../../core';
import { addressUtils } from '../../utils';
import { MemberAvatar } from '../member';
export interface IWalletProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    /**
     * Callback fired when the user connects their wallet.
     */
    onConnect?: () => void;
    /**
     * Callback fired when the user disconnects their wallet.
     */
    onDisconnect?: () => void;
    /**
     * The preferred connector to use. @default injected
     */
    connector?: 'injected' | 'metaMask' | 'walletConnect' | 'safe';
    /**
     * If selecting WalletConnect as the connector, you must pass WalletConnect project ID. Required for WalletConnect -- see https://docs.walletconnect.com/
     */
    projectId?: string;
    /**
     * If `true`, the wallet button will be disabled.
     */
    disabled?: boolean;
}

export const Wallet: React.FC<IWalletProps> = (props) => {
    const { onConnect, onDisconnect, connector = 'injected', projectId, disabled, ...otherProps } = props;
    const { connect, isPending: connectPending } = useConnect();
    const { disconnect, isPending: disconnectPending } = useDisconnect();
    const { address, isConnected, isDisconnected } = useAccount();
    const { data: ensName } = useEnsName({ address });

    const preferredConnector = (connector: 'injected' | 'metaMask' | 'walletConnect' | 'safe') => {
        switch (connector) {
            case 'injected':
                return injected();
            case 'metaMask':
                return metaMask();
            case 'walletConnect':
                return walletConnect({ projectId: projectId ?? '' });
            case 'safe':
                return safe();
            default:
                return injected;
        }
    };

    const handleClick = () => {
        if (isConnected) {
            disconnect();
            if (onDisconnect) {
                onDisconnect();
            }
        } else {
            connect({ connector: preferredConnector(connector) as CreateConnectorFn<InjectedParameters> });
            if (onConnect) {
                onConnect();
            }
        }
    };

    const isPending = disconnectPending || connectPending;

    const buttonClassName = classNames(
        'flex h-12 items-center rounded-full border border-neutral-100 bg-neutral-0 px-4 py-1 text-neutral-500 transition-all', // base
        'hover:border-neutral-200', // hover
        'focus:outline-none focus-visible:ring focus-visible:ring-primary focus-visible:ring-offset', // focus
        'active:bg-neutral-50 active:text-neutral-800', // active
        {
            '!p-1 md:!pl-4': isConnected || isPending,
        },
        {
            'cursor-not-allowed bg-neutral-100 text-neutral-300': disabled,
        },
    );

    return (
        <button className={buttonClassName} onClick={handleClick} disabled={isPending || disabled} {...otherProps}>
            {isDisconnected && <div>Connect</div>}

            {connectPending && (
                <>
                    <div className="hidden md:mr-3 md:flex">
                        <StateSkeletonBar className="shrink-0" width="64px" size="lg" />
                    </div>
                    <StateSkeletonCircular size="lg" />
                </>
            )}

            {isConnected && (
                <>
                    <div className="hidden md:mr-3 md:block">{ensName ?? addressUtils.truncateAddress(address)}</div>
                    <MemberAvatar size="md" address={address} />
                </>
            )}
        </button>
    );
};
