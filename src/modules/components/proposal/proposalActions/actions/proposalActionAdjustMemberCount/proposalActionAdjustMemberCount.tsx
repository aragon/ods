import { DataList, Heading } from '../../../../../../core';
import { MemberDataListItem } from '../../../../member';
import { useOdsModulesContext } from '../../../../odsModulesProvider';
import type { IProposalActionAdjustMemberCount } from '../../proposalActionsTypes';

export interface IProposalActionAdjustMemberCountProps {
    /**
     * The action to render for Member count adjustment
     */
    action: IProposalActionAdjustMemberCount;
}

export const ProposalActionAdjustMemberCount: React.FC<IProposalActionAdjustMemberCountProps> = (props) => {
    const { action } = props;
    const { copy } = useOdsModulesContext();
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
                <Heading size="h3">{copy.proposalActionAdjustMemberCount.summary}</Heading>
                <div>
                    <div className="flex flex-col gap-y-1 py-3 md:grid md:grid-cols-4">
                        <p className="col-span-1 text-neutral-800">
                            {action.addOrRemove === 'add'
                                ? copy.proposalActionAdjustMemberCount.added
                                : copy.proposalActionAdjustMemberCount.removed}
                        </p>
                        <p className="col-span-3 text-neutral-500">
                            {action.addOrRemove === 'add' ? `+` : `-`}
                            {action.changingMembers.length} {copy.proposalActionAdjustMemberCount.members}
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
                                {copy.proposalActionAdjustMemberCount.members}
                            </p>
                            <p className="text-sm text-neutral-500">{copy.proposalActionAdjustMemberCount.blockNote}</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};
