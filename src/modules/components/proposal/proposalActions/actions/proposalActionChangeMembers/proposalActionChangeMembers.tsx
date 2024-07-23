import { DataList, DefinitionList, Heading } from '../../../../../../core';
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
                <DataList.Container>
                    {action.members.map((member) => (
                        <MemberDataListItem.Structure
                            key={member.address}
                            address={member.address}
                            ensName={member.name}
                        />
                    ))}
                </DataList.Container>
            </DataList.Root>
            <div>
                <Heading size="h3">{copy.proposalActionsAction.proposalActionChangeMembers.summary}</Heading>
                <DefinitionList.Container>
                    <DefinitionList.Item
                        term={
                            action.type === ProposalActionType.ADD_MEMBERS
                                ? copy.proposalActionsAction.proposalActionChangeMembers.added
                                : copy.proposalActionsAction.proposalActionChangeMembers.removed
                        }
                    >
                        <p className="text-neutral-500">
                            {action.type === ProposalActionType.ADD_MEMBERS ? `+` : `-`}
                            {action.members.length} {copy.proposalActionsAction.proposalActionChangeMembers.members}
                        </p>
                    </DefinitionList.Item>
                    <DefinitionList.Item term={copy.proposalActionsAction.proposalActionChangeMembers.existingMembers}>
                        <p className="text-neutral-500">
                            {action.currentMembers} {copy.proposalActionsAction.proposalActionChangeMembers.members}
                        </p>
                    </DefinitionList.Item>
                </DefinitionList.Container>
                <p className="text-sm text-neutral-500">
                    {copy.proposalActionsAction.proposalActionChangeMembers.blockNote}
                </p>
            </div>
        </div>
    );
};
