import classNames from 'classnames';
import { Icon, IconType } from '../../../../../core';
import { addressUtils } from '../../../../utils';
import { MemberAvatar } from '../../../member';
import { type IRequiredCompositeAddress } from '../assetTransfer';

export type TxRole = 'sender' | 'recipient';

export interface IAssetTransferAddressProps {
    /**
     * Role of the transaction participant.
     */
    txRole: TxRole;
    /**
     * Address (& optional ENS Name) of the transaction participant.
     */
    participant: IRequiredCompositeAddress;
    /**
     * URL of the block explorer.
     */
    blockExplorerUrl?: string;
}

export const AssetTransferAddress: React.FC<IAssetTransferAddressProps> = (props) => {
    const { participant, blockExplorerUrl, txRole } = props;

    const assembledHref = blockExplorerUrl != null ? `${blockExplorerUrl}/address/${participant.address}` : undefined;
    const resolvedUserHandle =
        participant.name != null && participant.name !== ''
            ? participant.name
            : addressUtils.truncateAddress(participant.address);

    return (
        <a
            href={assembledHref}
            target="_blank"
            rel="noopener noreferrer"
            className={classNames(
                'flex h-20 items-center space-x-4 border-neutral-100 px-4 py-7', //base
                { 'border-x border-t md:border-y md:border-l md:border-r-0': txRole === 'sender' }, // border sides sender
                {
                    'border-x border-b md:border-y md:border-l-0 md:border-r': txRole === 'recipient',
                }, // border sides recipient
                'hover:border-neutral-200 hover:shadow-neutral-md', //hover
                'focus:outline-none focus-visible:ring focus-visible:ring-primary focus-visible:ring-offset', //focus
                'active:border-neutral-300', //active
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
            <MemberAvatar
                className="shrink-0"
                responsiveSize={{ md: 'md' }}
                ensName={participant.name}
                address={participant.address}
            />
            <div className="flex flex-col">
                <span className="text-xs font-normal leading-tight text-neutral-500 md:text-sm">
                    {txRole === 'sender' ? 'From' : 'To'}
                </span>
                <div className="flex items-center space-x-1">
                    <span className=" truncate text-sm font-normal leading-tight text-neutral-800  md:text-base">
                        {resolvedUserHandle}
                    </span>
                    <Icon icon={IconType.LINK_EXTERNAL} size="sm" className="text-neutral-300" />
                </div>
            </div>
        </a>
    );
};
