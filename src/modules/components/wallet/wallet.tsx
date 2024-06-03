import classNames from 'classnames';
import { useEnsName } from 'wagmi';
import { StateSkeletonBar } from '../../../core';
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
    const { user, isConnected = false, onClick, ...otherProps } = props;
    const { data: ensName, isLoading: ensLoading } = useEnsName({
        address: isConnected ? addressUtils.getChecksum(user.address) : undefined,
        query: { enabled: isConnected },
    });

    const buttonClassName = classNames(
        'flex h-12 items-center rounded-full border border-neutral-100 bg-neutral-0 px-4 py-1 text-neutral-500 transition-all',
        'hover:border-neutral-200',
        'focus:outline-none focus-visible:ring focus-visible:ring-primary focus-visible:ring-offset',
        'active:bg-neutral-50 active:text-neutral-800',
        {
            '!p-1 md:!pl-4': isConnected,
        },
    );

    return (
        <button className={buttonClassName} onClick={onClick} {...otherProps}>
            {!isConnected && <div>Connect</div>}

            {isConnected && (
                <>
                    <div
                        title={user.name ?? user.address}
                        className="hidden min-w-0 max-w-24 items-center truncate md:mr-3 md:flex"
                    >
                        {user.name ??
                            (ensLoading ? (
                                <StateSkeletonBar size="lg" />
                            ) : (
                                ensName ?? addressUtils.truncateAddress(user.address)
                            ))}
                    </div>
                    <MemberAvatar size="lg" ensName={user.name} address={user.address} />
                </>
            )}
        </button>
    );
};
