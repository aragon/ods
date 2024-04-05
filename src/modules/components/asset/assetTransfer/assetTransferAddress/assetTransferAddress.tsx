import classNames from 'classnames';
import { type Hash } from 'viem';
import { Icon, IconType } from '../../../../../core';
import { addressUtils } from '../../../../utils';
import { MemberAvatar } from '../../../member';

const txRoleType = ['sender', 'recipient'] as const;
export type TxRole = (typeof txRoleType)[number];

export interface IAssetTransferAddressProps {
    txRole: TxRole;
    /**
     * Address of the transaction user.
     */
    address: Hash;
    /**
     * ENS name of the transaction user.
     */
    ensName: string | undefined;
    /**
     * URL of the block explorer.
     */
    blockExplorerUrl: string | undefined;
}

export const AssetTransferAddress: React.FC<IAssetTransferAddressProps> = (props) => {
    const { address, ensName, blockExplorerUrl, txRole } = props;

    const createLink = blockExplorerUrl && `${blockExplorerUrl}/address/${address}`;
    const resolvedUserHandle = ensName != null && ensName !== '' ? ensName : addressUtils.truncateAddress(address);

    return (
        <a
            href={createLink}
            target="_blank"
            rel="noopener noreferrer"
            className={classNames(
                'flex h-20 w-[319px]  items-center space-x-4 px-4 py-7', //base
                'hover:border-neutral-200 hover:shadow-neutral-md', //hover
                'focus:outline-none focus-visible:ring focus-visible:ring-primary focus-visible:ring-offset', //focus
                'active:border-[1px] active:border-neutral-300', //active
                'md:w-1/2 md:p-6', //responsive
                {
                    'rounded-t-xl  md:rounded-l-xl md:rounded-r-none ': txRole === 'sender', // sender base
                    'rounded-b-xl  md:rounded-l-none md:rounded-r-xl md:pl-8': txRole === 'recipient', // recipient base
                },
                {
                    'focus-visible:rounded-t-xl md:focus-visible:rounded-l-xl md:focus-visible:rounded-r-none':
                        txRole === 'sender', // sender focus
                    'focus-visible:rounded-b-xl md:focus-visible:rounded-l-none md:focus-visible:rounded-r-xl':
                        txRole === 'recipient', // recipient focus
                },
            )}
        >
            <MemberAvatar className="shrink-0" responsiveSize={{ md: 'md' }} ensName={ensName} address={address} />
            <div className="flex flex-col">
                <span className="text-xs font-normal leading-tight text-neutral-500 md:text-sm">
                    {txRole === 'sender' ? 'From' : 'To'}
                </span>
                <div className="flex max-w-[245px] items-center space-x-1 md:max-w-[205px]">
                    <p className=" truncate text-sm font-normal leading-tight text-neutral-800  md:text-base">
                        {resolvedUserHandle}
                    </p>
                    <Icon icon={IconType.LINK_EXTERNAL} size="sm" className="text-neutral-300" />
                </div>
            </div>
        </a>
    );
};
