import { DataList, Heading } from '../../../../../../core';
import { MemberDataListItem } from '../../../../member';
import type { IProposalActionAdjustMemberCount } from '../../proposalActionsTypes';

export interface IProposalActionAdjustMemberCountProps {
    action: IProposalActionAdjustMemberCount;
}

const ProposalActionAdjustMemberCount: React.FC<IProposalActionAdjustMemberCountProps> = (props) => {
    const { action } = props;
    return (
        <div className="flex flex-col gap-y-6">
            <DataList.Root entityLabel="Members">
                <DataList.Container SkeletonElement={MemberDataListItem.Skeleton}>
                    {action.changingMembers.map((member, index) => (
                        <MemberDataListItem.Structure
                            key={`member-${index}`}
                            address={member.address}
                            ensName={member.name}
                        />
                    ))}
                </DataList.Container>
            </DataList.Root>
            <section>
                <Heading size="h2">Summary</Heading>
                <div>
                    <div className="flex flex-col gap-y-1 py-3">
                        <p>{action.addOrRemove === 'add' ? 'Added' : 'Removed'}</p>
                        <p>
                            {action.addOrRemove === 'add' ? `+` : `-`}
                            {action.changingMembers.length} members
                        </p>
                        <div className="h-0 w-full border-b border-neutral-100" />
                    </div>
                    <div className="flex flex-col gap-y-1 py-3">
                        <p>Total members</p>
                        <p>
                            {action.addOrRemove === 'add'
                                ? action.currentMemberCount + action.changingMembers.length
                                : action.currentMemberCount - action.changingMembers.length}{' '}
                            members
                        </p>
                        <p>This is by the current block number, and might change in the future</p>
                    </div>
                </div>
            </section>
        </div>
    );

    // mapping of members
    // summary of member count +/-
    // total members after action
};

export default ProposalActionAdjustMemberCount;
