import classNames from 'classnames';
import { useAccount, useConnect, useDisconnect, useEnsName } from 'wagmi';
import { injected } from 'wagmi/connectors';
import { StateSkeletonBar, StateSkeletonCircular } from '../../../core';
import { addressUtils } from '../../utils';
import { MemberAvatar } from '../member';
export interface IWalletProps {
    onConnect: () => void;
    onDisconnect: () => void;
}

const Wallet: React.FC<IWalletProps> = (props) => {
    const { ...otherProps } = props;
    const { connect, isPending: connectPending } = useConnect();
    const { disconnect, isPending: disconnectPending } = useDisconnect();
    const { address, isConnected, isDisconnected } = useAccount();
    const { data: ensName } = useEnsName({ address });

    const handleClick = () => {
        if (isConnected) {
            disconnect();
        } else {
            connect({ connector: injected() });
        }
    };

    const buttonClassName = classNames(
        'flex h-12 items-center rounded-full border border-neutral-100 bg-neutral-0 px-4 py-1 text-neutral-500 transition-all', //base
        'hover:border-neutral-200', // hover
        'focus:outline-none focus-visible:ring focus-visible:ring-primary focus-visible:ring-offset', // focus
        'active:bg-neutral-50 active:text-neutral-800', // active
        {
            '!p-1 md:!pl-4': isConnected,
            'cursor-not-allowed !p-1 md:!pl-4': connectPending,
        },
    );

    return (
        <button
            className={buttonClassName}
            onClick={() => handleClick()}
            disabled={disconnectPending && connectPending}
            {...otherProps}
        >
            {isDisconnected && <div>Connect</div>}

            {connectPending && (
                <div className="hidden md:mr-3 md:flex">
                    <StateSkeletonBar className="shrink-0" width="64px" size="lg" />
                </div>
            )}

            {connectPending && <StateSkeletonCircular size="lg" />}

            {isConnected && (
                <div className="hidden md:mr-3 md:block"> {ensName ?? addressUtils.truncateAddress(address)} </div>
            )}

            {isConnected && <MemberAvatar size="md" address={address} />}
        </button>
    );
};

export default Wallet;
