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
                <Heading size="h3">Summary</Heading>
                <div>
                    <div className="flex flex-col gap-y-1 py-3 md:grid md:grid-cols-4">
                        <p className="col-span-1 text-neutral-800">
                            {action.addOrRemove === 'add' ? 'Added' : 'Removed'}
                        </p>
                        <p className="col-span-3 text-neutral-500">
                            {action.addOrRemove === 'add' ? `+` : `-`}
                            {action.changingMembers.length} members
                        </p>
                    </div>
                    <div className="h-0 w-full border-b border-neutral-100" />
                    <div className="flex flex-col gap-y-1 py-3 md:grid md:grid-cols-4">
                        <p className="col-span-1 text-neutral-800">Total members</p>
                        <div className="col-span-3 flex flex-col gap-y-1">
                            <p className="text-neutral-500">
                                {action.addOrRemove === 'add'
                                    ? action.currentMemberCount + action.changingMembers.length
                                    : action.currentMemberCount - action.changingMembers.length}{' '}
                                members
                            </p>
                            <p className="text-sm text-neutral-500">
                                This is by the current block number, and might change in the future
                            </p>
                        </div>
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
