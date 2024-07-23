import classNames from 'classnames';
import { useEnsName } from 'wagmi';
import { StateSkeletonBar } from '../../../core';
import { type ICompositeAddress } from '../../types';
import { addressUtils } from '../../utils';
import { MemberAvatar } from '../member';
import { useOdsModulesContext } from '../odsModulesProvider';

export interface IWalletProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    /**
     * The connected user details.
     */
    user?: ICompositeAddress;
}

export const Wallet: React.FC<IWalletProps> = (props) => {
    const { user, className, ...otherProps } = props;
    const { data: ensName, isLoading: ensLoading } = useEnsName({
        address: user != null ? addressUtils.getChecksum(user.address) : undefined,
        query: { enabled: user?.name != null },
    });
    const resolvedUserHandle = user?.name ?? ensName ?? addressUtils.truncateAddress(user?.address);

    const { copy } = useOdsModulesContext();

    const buttonClassName = classNames(
        'flex items-center rounded-full border border-neutral-100 bg-neutral-0 text-neutral-500 transition-all',
        'hover:border-neutral-200',
        'focus:outline-none focus-visible:ring focus-visible:ring-primary focus-visible:ring-offset',
        'active:bg-neutral-50 active:text-neutral-800',
        {
            'px-4 py-2.5': user == null,
            'p-1 md:pl-4': user != null,
        },
        className,
    );

    return (
        <button className={buttonClassName} {...otherProps}>
            {!user && copy.wallet.connect}

            {user && (
                <>
                    <div
                        title={user.name ?? user.address}
                        className="hidden min-w-0 max-w-24 items-center truncate md:mr-3 md:flex"
                    >
                        {ensLoading ? <StateSkeletonBar size="lg" /> : resolvedUserHandle}
                    </div>
                    <MemberAvatar size="lg" ensName={user.name} address={user.address} />
                </>
            )}
        </button>
    );
};
