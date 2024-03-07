import classNames from 'classnames';
import { Avatar, Card, Heading, NumberFormat, Tag, formatterUtils } from '../../../../core';

export interface IMemberDataListProps {
    /**
     * Whether the DAO is a multi-sig or not.
     */
    isMultiSig?: boolean;
    /**
     * Whether the member is a delegate of current user or not.
     */
    isDelegate?: boolean;
    /**
     * The avatar src URL of the member. If no ENS avatar is resolved, should default to a blockie based on public key.
     */
    avatar: string;
    /**
     * The (un)resolved handle of the member. Should be ENS if available. @default Unknown
     */
    userHandle: string;
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
    const { isDelegate, isMultiSig, avatar, userHandle, onClick, delegationCount = 0, votingPower = 0 } = props;
    const cardClasses = classNames({
        'cursor-pointer': !!onClick,
    });

    return (
        <Card onClick={onClick} className={cardClasses}>
            <div className="mx-6 flex w-[169.5px] flex-col items-start space-y-3 py-6 md:w-[262px]">
                <div className="flex w-full items-center justify-between">
                    <Avatar src={avatar} responsiveSize={{ md: 'md' }} />
                    {isDelegate && <Tag variant="info" label="Your Delegate" />}
                </div>

                <Heading className="inline-block w-[169.5px] truncate md:w-[262px]" size="h2" as="h1">
                    {userHandle || 'Unknown'}
                </Heading>
                <div className="space-y-2">
                    <Heading size="h5" as="h2" className="min-h-[18px] !text-neutral-500 md:min-h-5">
                        {delegationCount > 0 && !isMultiSig ? (
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
                        {!isMultiSig ? (
                            <>
                                <span className="text-neutral-800">
                                    {formatterUtils.formatNumber(votingPower, { format: NumberFormat.GENERIC_SHORT })}
                                </span>{' '}
                                Voting Power
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
