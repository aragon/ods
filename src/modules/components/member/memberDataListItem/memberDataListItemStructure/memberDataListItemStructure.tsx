import { getAddress } from 'viem';
import { useAccount } from 'wagmi';
import { DataList, Heading, NumberFormat, Tag, formatterUtils, type IDataListItemProps } from '../../../../../core';
import { addressUtils } from '../../../../utils';
import { MemberAvatar } from '../../memberAvatar';

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
    address: string;
    /**
     * Direct URL src of the user avatar image to be rendered.
     */
    avatarSrc?: string;
}

export const MemberDataListItemStructure: React.FC<IMemberDataListItemProps> = (props) => {
    const { isDelegate, delegationCount = 0, votingPower = 0, avatarSrc, ensName, address, ...otherProps } = props;

    const { address: currentUserAddress, isConnected } = useAccount();

    const isCurrentUser = isConnected && address && currentUserAddress === getAddress(address);

    const resolvedUserHandle = ensName != null && ensName !== '' ? ensName : addressUtils.truncateAddress(address);

    const hasDelegationOrVotingPower = delegationCount > 0 || votingPower > 0;

    return (
        <DataList.Item className="min-w-fit !py-0 px-4 md:px-6" {...otherProps}>
            <div className="flex flex-col items-start justify-center gap-y-3 py-4 md:min-w-44 md:py-6">
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
                    {resolvedUserHandle}
                </Heading>

                {hasDelegationOrVotingPower && (
                    <div className="flex flex-col gap-y-2">
                        {delegationCount > 0 && (
                            <Heading size="h5" as="h2">
                                {formatterUtils.formatNumber(delegationCount, { format: NumberFormat.GENERIC_SHORT })}
                                <span className="text-neutral-500">{` Delegation${delegationCount === 1 ? '' : 's'}`}</span>
                            </Heading>
                        )}
                        {votingPower > 0 && (
                            <Heading size="h5" as="h2">
                                {formatterUtils.formatNumber(votingPower, { format: NumberFormat.GENERIC_SHORT })}
                                <span className="text-neutral-500"> Voting Power</span>
                            </Heading>
                        )}
                    </div>
                )}
            </div>
        </DataList.Item>
    );
};
