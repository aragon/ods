import classNames from 'classnames';
import { Hash, isAddress } from 'viem';
import { useEnsName } from 'wagmi';
import { Card, Heading, NumberFormat, Tag, formatterUtils } from '../../../../core';
import { truncateEthAddress } from '../../../../utils/truncateEthereumAddress';
import { IMemberAvatarProps, MemberAvatar } from '../memberAvatar';

export interface IMemberDataListProps extends IMemberAvatarProps {
    /**
     * Whether the DAO is a multi-sig or not.
     */
    isMultiSig?: boolean;
    /**
     * Whether the member is a delegate of current user or not.
     */
    isDelegate?: boolean;
    /**
     * The number of delegations the member has from other members. @default 0
     */
    delegationCount?: number;
    /**
     * The total voting power of the member. @default 0
     */
    votingPower?: number;
    /**
     * The callback to be called when the component is clicked.
     */
    onClick?: () => void;
}

export const MemberDataListItem: React.FC<IMemberDataListProps> = (props) => {
    const { isDelegate, isMultiSig, avatarSrc, ensName, address, onClick, delegationCount, votingPower } = props;
    const cardClasses = classNames({
        'cursor-pointer': !!onClick,
    });

    const { data: ensNameData } = useEnsName({
        address: address as Hash,
        query: { enabled: !!address && address !== '' && isAddress(address) },
    });

    const resolvedUserHandle = (): string | undefined => {
        if (ensName && ensName !== '') {
            return ensName;
        }
        if (ensNameData) {
            return ensNameData;
        }
        if (address && isAddress(address)) {
            return address;
        }
        return undefined;
    };

    return (
        <Card onClick={onClick} className={cardClasses}>
            <div className="mx-6 flex w-[169.5px] flex-col items-start space-y-3 py-6 md:w-[262px]">
                <div className="flex w-full items-center justify-between">
                    <MemberAvatar size="sm" ensName={ensName} address={address} avatarSrc={avatarSrc} />
                    {isDelegate && <Tag variant="info" label="Your Delegate" />}
                </div>

                <Heading className="inline-block w-[169.5px] truncate md:w-[262px]" size="h2" as="h1">
                    {truncateEthAddress(resolvedUserHandle()) ?? 'Unknown'}
                </Heading>
                <div className="space-y-2">
                    <Heading size="h5" as="h2" className="min-h-[18px] !text-neutral-500 md:min-h-5">
                        {delegationCount && delegationCount > 0 && !isMultiSig ? (
                            <>
                                <span className="text-neutral-800">
                                    {formatterUtils.formatNumber(delegationCount, {
                                        format: NumberFormat.GENERIC_SHORT,
                                    })}
                                </span>
                                {` Delegation${delegationCount === 1 ? '' : 's'}`}
                            </>
                        ) : (
                            ''
                        )}
                    </Heading>
                    <Heading size="h5" as="h2" className="min-h-[18px] !text-neutral-500 md:min-h-5">
                        {votingPower && votingPower > 0 && !isMultiSig ? (
                            <>
                                <span className="text-neutral-800">
                                    {formatterUtils.formatNumber(votingPower, { format: NumberFormat.GENERIC_SHORT })}
                                </span>
                                {` Voting Power`}
                            </>
                        ) : (
                            ''
                        )}
                    </Heading>
                </div>
            </div>
        </Card>
    );
};
