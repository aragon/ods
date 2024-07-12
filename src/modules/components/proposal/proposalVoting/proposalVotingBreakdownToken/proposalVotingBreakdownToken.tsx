import { Tabs } from '../../../../../core';
import { ProposalVotingTab } from '../proposalVotingDefinitions';
import { ProposalVotingProgress } from '../proposalVotingProgress';

export interface IProposalVotingBreakdownTokenProps {}

export const ProposalVotingBreakdownToken: React.FC<IProposalVotingBreakdownTokenProps> = () => {
    return (
        <Tabs.Content value={ProposalVotingTab.BREAKDOWN}>
            <div className="flex flex-col gap-12 rounded-xl border border-neutral-100 px-4 py-3 shadow-neutral-sm md:flex-row md:p-6">
                <ProposalVotingProgress
                    name="Yes"
                    value={80}
                    description={{ value: '8k', text: 'DEGEN' }}
                    variant="success"
                />
                <ProposalVotingProgress
                    name="Abstain"
                    value={10}
                    description={{ value: '8k', text: 'DEGEN' }}
                    variant="neutral"
                />
                <ProposalVotingProgress
                    name="No"
                    value={10}
                    description={{ value: '8k', text: 'DEGEN' }}
                    variant="critical"
                />
            </div>
        </Tabs.Content>
    );
};
