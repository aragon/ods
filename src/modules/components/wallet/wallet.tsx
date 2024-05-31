import classNames from 'classnames';
import { useConnect, useDisconnect } from 'wagmi';
import { StateSkeletonBar, StateSkeletonCircular } from '../../../core';
import { type ICompositeAddress } from '../../types';
import { addressUtils } from '../../utils';
import { MemberAvatar } from '../member';

export interface IWalletProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    /**
     * The connected user details.
     */
    user: ICompositeAddress;
    /**
     * Whether or not the app is connected to a wallet.
     */
    isConnected: boolean;
}

export const Wallet: React.FC<IWalletProps> = (props) => {
    const { user, isConnected, onClick, disabled, ...otherProps } = props;
    const { isPending: connectPending } = useConnect();
    const { isPending: disconnectPending } = useDisconnect();

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
        <button className={buttonClassName} onClick={onClick} disabled={isPending || disabled} {...otherProps}>
            {!isConnected && <div>Connect</div>}

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
                    <div
                        title={user.name ?? user.address}
                        className="hidden min-w-0 max-w-24 truncate md:mr-3 md:block"
                    >
                        {user.name ?? addressUtils.truncateAddress(user.address)}
                    </div>
                    <MemberAvatar size="lg" address={user.address} />
                </>
            )}
        </button>
    );
};
