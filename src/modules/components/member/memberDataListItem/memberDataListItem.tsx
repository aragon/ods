import { useEffect, useState } from 'react';
import { getAddress } from 'viem';
import { useAccount } from 'wagmi';
import { DataList, Heading, NumberFormat, Tag, formatterUtils, type IDataListItemProps } from '../../../../core';
import { truncateEthAddress } from '../../../../utils/truncateEthereumAddress';
import { MemberAvatar } from '../memberAvatar';

export interface IMemberDataListItemProps extends IDataListItemProps {
    /**
     * Whether the member is a delegate of current user or not.
     */
    isDelegate?: boolean;
    /**
     * The number of delegations the member has from other members.
     */
    delegationCount?: number;
    /**
     * The total voting power of the member.
     */
    votingPower?: number;
    /**
     * ENS name of the user.
     */
    ensName?: string;
    /**
     * 0x address of the user.
     */
    address?: string;
    /**
     * Direct URL src of the user avatar image to be rendered.
     */
    avatarSrc?: string;
}

export const MemberDataListItemStructure: React.FC<IMemberDataListItemProps> = (props) => {
    const { isDelegate, avatarSrc, ensName, address, delegationCount, votingPower } = props;
    const [isCurrentUser, setIsCurrentUser] = useState(false);

    const { address: currentUserAddress, isConnected } = useAccount();

    useEffect(() => {
        if (isConnected && address && currentUserAddress === getAddress(address)) {
            setIsCurrentUser(true);
        }
    }, [currentUserAddress, address, isConnected]);

    const resolvedUserHandle = ensName != null && ensName !== '' ? ensName : address ?? undefined;

    return (
        <DataList.Item className="min-w-fit !py-0 px-4  md:px-6">
            <div className="flex min-w-36 flex-col items-start space-y-3 py-4 md:min-w-44  md:py-6">
                <div className="flex w-full items-center justify-between">
                    <MemberAvatar
                        ensName={ensName}
                        address={address}
                        avatarSrc={avatarSrc}
                        responsiveSize={{ md: 'md' }}
                    />
                    {isDelegate && !isCurrentUser && <Tag variant="info" label="Your Delegate" />}
                    {isCurrentUser && <Tag variant="neutral" label="You" />}
                </div>

                <Heading className="inline-block w-full truncate" size="h2" as="h1">
                    {truncateEthAddress(resolvedUserHandle) ?? 'Unknown'}
                </Heading>
                <div className="space-y-2">
                    <Heading size="h5" as="h2" className="min-h-[18px] md:min-h-5">
                        {delegationCount && delegationCount > 0 ? (
                            <>
                                {formatterUtils.formatNumber(delegationCount, {
                                    format: NumberFormat.GENERIC_SHORT,
                                })}
                                <span className="text-neutral-500">
                                    {` Delegation${delegationCount === 1 ? '' : 's'}`}
                                </span>
                            </>
                        ) : undefined}
                    </Heading>
                    <Heading size="h5" as="h2" className="min-h-[18px] md:min-h-5">
                        {votingPower && votingPower > 0 ? (
                            <>
                                {formatterUtils.formatNumber(votingPower, {
                                    format: NumberFormat.GENERIC_SHORT,
                                })}
                                <span className="text-neutral-500">{` Voting Power`}</span>
                            </>
                        ) : undefined}
                    </Heading>
                </div>
            </div>
        </DataList.Item>
    );
};
