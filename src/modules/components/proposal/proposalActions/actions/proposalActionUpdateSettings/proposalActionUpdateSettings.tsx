import { DataList, DefinitionList } from '../../../../../../core';
import { MemberDataListItem } from '../../../../member';
import type { IProposalActionComponentProps } from '../../proposalActionsTypes';

export interface IProposalActionUpdateSettingMultisigProps
    extends IProposalActionComponentProps<IProposalActionUpdateSettingsMultisig> {
    /**
     * Heading of the proposal action.
     */
    heading: string;
    /**
     * Description of the proposal action.
     */
    description: string;
    /**
     * Multisig current member count.
     */
    currentMembers: number;
}

export const ProposalActionUpdateSettings: React.FC<IProposalActionUpdateSettingMultisigProps> = (props) => {
    const { heading, description, currentMembers, action } = props;

    return (
        <section className="p-4 md:p-6">
            <DefinitionList.Container>
                <DefinitionList.Item term="Multisig Address">{action.multisigAddress}</DefinitionList.Item>
                <DefinitionList.Item term="Threshold">{action.threshold}</DefinitionList.Item>
                <DefinitionList.Item term="Proposers">
                    {action.proposers.length === currentMembers ? (
                        'Any wallet'
                    ) : (
                        <DataList.Root entityLabel="Members">
                            <DataList.Container>
                                {action.proposers.map((proposer) => (
                                    <MemberDataListItem.Structure
                                        key={proposer.address}
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
