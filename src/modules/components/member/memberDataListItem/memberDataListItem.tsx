import classNames from 'classnames';
import { Card, Heading, NumberFormat, Tag, formatterUtils } from '../../../../core';
import { truncateEthAddress } from '../../../../utils/truncateEthereumAddress';
import { MemberAvatar, type IMemberAvatarProps } from '../memberAvatar';

export interface IMemberDataListProps extends Omit<IMemberAvatarProps, 'size' | 'responsiveSize'> {
    /**
     * Whether the member is a delegate of current user or not.
     */
    isDelegate?: boolean;
    /**
     * Whether the member card is the current user or not.
     */
    isCurrentUser?: boolean;
    /**
     * The number of delegations the member has from other members.
     */
    delegationCount?: number;
    /**
     * The total voting power of the member.
     */
    votingPower?: number;
    /**
     * The callback to be called when the component is clicked.
     */
    handleClick?: () => void;
}

export const MemberDataListItem: React.FC<IMemberDataListProps> = (props) => {
    const { isDelegate, isCurrentUser, avatarSrc, ensName, address, handleClick, delegationCount, votingPower } = props;

    const resolvedUserHandle = ensName != null && ensName !== '' ? ensName : address ?? undefined;

    return (
        <Card
            onClick={handleClick}
            className={classNames({
                'cursor-pointer': !!handleClick,
            })}
        >
            <div className="mx-6 flex min-w-44 flex-col items-start space-y-3 py-6 md:min-w-52">
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
                    <Heading size="h5" as="h2" className="min-h-[18px] !text-neutral-500 md:min-h-5">
                        {delegationCount ? (
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
                        {votingPower ? (
                            <>
                                <span className="text-neutral-800">
                                    {formatterUtils.formatNumber(votingPower, {
                                        format: NumberFormat.GENERIC_SHORT,
                                    })}
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
