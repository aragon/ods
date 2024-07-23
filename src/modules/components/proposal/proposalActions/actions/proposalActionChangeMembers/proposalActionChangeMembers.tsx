import { DataList, Heading } from '../../../../../../core';
import { MemberDataListItem } from '../../../../member';
import { useOdsModulesContext } from '../../../../odsModulesProvider';
import { ProposalActionType } from '../../proposalActionsTypes';
import type { IProposalActionChangeMembers } from '../../proposalActionsTypes/proposalActionChangeMembers';

export interface IProposalActionChangeMembersProps {
    /**
     * The action to render for Member count adjustment
     */
    action: IProposalActionChangeMembers;
}

export const ProposalActionChangeMembers: React.FC<IProposalActionChangeMembersProps> = (props) => {
    const { action } = props;
    const { copy } = useOdsModulesContext();
    return (
        <div className="flex flex-col gap-y-6">
            <DataList.Root entityLabel="Members">
                <DataList.Container SkeletonElement={MemberDataListItem.Skeleton}>
                    {action.members.map((member, index) => (
                        <MemberDataListItem.Structure
                            key={`member-${index}`}
                            address={member.address}
                            ensName={member.name}
                        />
                    ))}
                </DataList.Container>
            </DataList.Root>
            <section>
                <Heading size="h3">{copy.proposalActionsAction.proposalActionChangeMembers.summary}</Heading>
                <div>
                    <div className="flex flex-col gap-y-1 py-3 md:grid md:grid-cols-4">
                        <p className="col-span-1 text-neutral-800">
                            {action.type === ProposalActionType.ADD_MEMBERS
                                ? copy.proposalActionsAction.proposalActionChangeMembers.added
                                : copy.proposalActionsAction.proposalActionChangeMembers.removed}
                        </p>
                        <p className="col-span-3 text-neutral-500">
                            {action.type === ProposalActionType.ADD_MEMBERS ? `+` : `-`}
                            {action.members.length} {copy.proposalActionsAction.proposalActionChangeMembers.members}
                        </p>
                    </div>
                    <div className="h-0 w-full border-b border-neutral-100" />
                    <div className="flex flex-col gap-y-1 py-3 md:grid md:grid-cols-4">
                        <p className="col-span-1 text-neutral-800">
                            {copy.proposalActionsAction.proposalActionChangeMembers.existingMembers}
                        </p>
                        <div className="col-span-3 flex flex-col gap-y-1">
                            <p className="text-neutral-500">
                                {action.type === ProposalActionType.ADD_MEMBERS
                                    ? action.currentMembers + action.members.length
                                    : action.currentMembers - action.members.length}{' '}
                                {copy.proposalActionsAction.proposalActionChangeMembers.members}
                            </p>
                            <p className="text-sm text-neutral-500">
                                {copy.proposalActionsAction.proposalActionChangeMembers.blockNote}
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};
