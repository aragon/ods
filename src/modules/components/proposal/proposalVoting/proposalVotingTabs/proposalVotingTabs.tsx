import { useRef, type RefObject } from 'react';
import { Tabs, type ITabsRootProps } from '../../../../../core';
import { useOdsModulesContext } from '../../../odsModulesProvider';
import { ProposalVotingTab } from '../proposalVotingDefinitions';

export interface IProposalVotingTabsProps extends ITabsRootProps {
    /**
     * Default proposal voting tab selected.
     * @default ProposalVotingTab.BREAKDOWN
     */
    defaultValue?: ProposalVotingTab;
    /**
     * Reference object of the parent accordion component (on multi-stage proposals) to update its height on tab change.
     */
    accordionRef?: RefObject<HTMLDivElement>;
}

export const ProposalVotingTabs: React.FC<IProposalVotingTabsProps> = (props) => {
    const { defaultValue = ProposalVotingTab.BREAKDOWN, accordionRef, children, ...otherProps } = props;

    const { copy } = useOdsModulesContext();

    const contentRef = useRef<HTMLDivElement>(null);

    const handleTabClick = () => {
        if (accordionRef?.current == null || contentRef?.current == null) {
            return;
        }

        const { clientHeight } = contentRef.current;
        const { style } = accordionRef.current;

        style.setProperty('--radix-collapsible-content-height', clientHeight.toString());
    };

    return (
        <Tabs.Root defaultValue={defaultValue} className="flex flex-col gap-4 md:gap-6" {...otherProps}>
            <Tabs.List>
                <Tabs.Trigger
                    label={copy.proposalVotingTabs.breakdown}
                    value={ProposalVotingTab.BREAKDOWN}
                    onClick={handleTabClick}
                />
                <Tabs.Trigger
                    label={copy.proposalVotingTabs.votes}
                    value={ProposalVotingTab.VOTES}
                    onClick={handleTabClick}
                />
                <Tabs.Trigger
                    label={copy.proposalVotingTabs.details}
                    value={ProposalVotingTab.DETAILS}
                    onClick={handleTabClick}
                />
            </Tabs.List>
            <div className="flex grow flex-col" ref={contentRef}>
                {children}
            </div>
        </Tabs.Root>
    );
};
