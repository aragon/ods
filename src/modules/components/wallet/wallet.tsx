import classNames from 'classnames';
import { useAccount, useConnect, useDisconnect, useEnsName, type CreateConnectorFn } from 'wagmi';
import { injected, walletConnect, type InjectedParameters } from 'wagmi/connectors';
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
    connector?: 'injected' | 'walletConnect';
    /**
     * If selecting WalletConnect as the connector, you must pass WalletConnect project ID. Required for WalletConnect -- see https://docs.walletconnect.com/
     */
    projectId?: string;
    /**
     * If `true`, the wallet button will be disabled.
     */
    disabled?: boolean;
}

const getPreferredConnector = (connector: 'injected' | 'walletConnect', projectId?: string) => {
    switch (connector) {
        case 'injected':
            return injected();
        case 'walletConnect':
            return walletConnect({ projectId: projectId ?? '' });
        default:
            return injected();
    }
};

export const Wallet: React.FC<IWalletProps> = (props) => {
    const { onConnect, onDisconnect, connector = 'injected', projectId, disabled, ...otherProps } = props;
    const { connect, isPending: connectPending } = useConnect();
    const { disconnect, isPending: disconnectPending } = useDisconnect();
    const { address, isConnected, isDisconnected } = useAccount();
    const { data: ensName } = useEnsName({ address });

    const handleClick = async () => {
        if (isConnected) {
            disconnect();
            onDisconnect?.();
        } else {
            connect({
                connector: getPreferredConnector(connector, projectId) as CreateConnectorFn<InjectedParameters>,
            });
            onConnect?.();
        }
    };

    const isPending = disconnectPending || connectPending;

    const buttonClassName = classNames(
        'flex h-12 items-center rounded-full border border-neutral-100 bg-neutral-0 px-4 py-1 text-neutral-500 transition-all',
        'hover:border-neutral-200',
        'focus:outline-none focus-visible:ring focus-visible:ring-primary focus-visible:ring-offset',
        'active:bg-neutral-50 active:text-neutral-800',
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
                    <div title={ensName ?? address} className="hidden min-w-0 max-w-24 truncate md:mr-3 md:block">
                        {ensName ?? addressUtils.truncateAddress(address)}
                    </div>
                    <MemberAvatar size="lg" address={address} />
                </>
            )}
        </button>
    );
};
