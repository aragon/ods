import { DataList, DefinitionList } from '../../../../../../core';
import { MemberDataListItem } from '../../../../member';
import type { IProposalActionComponentProps } from '../../proposalActionsTypes';
import { type IProposalActionChangeSettings } from '../../proposalActionsTypes/proposalActionChangeSettings';

export interface IProposalActionChangeSettingsProps
    extends IProposalActionComponentProps<IProposalActionChangeSettings> {
    /**
     * Multisig current member count.
     */
    currentMembers: number;
}

export const ProposalActionUpdateSettings: React.FC<IProposalActionChangeSettingsProps> = (props) => {
    const { currentMembers, action } = props;

    return (
        <section className="p-4 md:p-6">
            <DefinitionList.Container>
                <DefinitionList.Item term="Threshold">{action.threshold}</DefinitionList.Item>
                <DefinitionList.Item term="Proposers">
                    {action.proposers.length === currentMembers ? (
                        'Any wallet'
                    ) : (
                        <DataList.Root entityLabel="Members">
                            <DataList.Container>
                                {action.proposers.map((member) => (
                                    <MemberDataListItem.Structure
                                        key={member.address}
                                        address={member.address}
                                        ensName={member.name}
                                    />
                                ))}
                            </DataList.Container>
                        </DataList.Root>
                    )}
                </DefinitionList.Item>
            </DefinitionList.Container>
        </section>
    );
};
