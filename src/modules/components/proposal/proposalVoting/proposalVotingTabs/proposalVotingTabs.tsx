import { type ITabsRootProps, Tabs } from '../../../../../core';
import { useOdsModulesContext } from '../../../odsModulesProvider';
import { ProposalVotingTab } from '../proposalVotingDefinitions';

export interface IProposalVotingTabsProps extends ITabsRootProps {
    /**
     * Default proposal voting tab selected.
     * @default ProposalVotingTab.BREAKDOWN
     */
    defaultValue?: ProposalVotingTab;
}

export const ProposalVotingTabs: React.FC<IProposalVotingTabsProps> = (props) => {
    const { defaultValue = ProposalVotingTab.BREAKDOWN, ...otherProps } = props;

    const { copy } = useOdsModulesContext();

    return (
        <Tabs.Root defaultValue={defaultValue} {...otherProps}>
            <Tabs.List>
                <Tabs.Trigger label={copy.proposalVotingTabs.breakdown} value={ProposalVotingTab.BREAKDOWN} />
                <Tabs.Trigger label={copy.proposalVotingTabs.votes} value={ProposalVotingTab.VOTES} />
                <Tabs.Trigger label={copy.proposalVotingTabs.details} value={ProposalVotingTab.DETAILS} />
            </Tabs.List>
        </Tabs.Root>
    );
};
