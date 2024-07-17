import { render, screen } from '@testing-library/react';
import { Tabs } from '../../../../../core';
import { testLogger } from '../../../../../core/test';
import { ProposalVotingTab } from '../proposalVotingDefinitions';
import {
    type IProposalVotingBreakdownMultisigProps,
    ProposalVotingBreakdownMultisig,
} from './proposalVotingBreakdownMultisig';

describe('<ProposalVotingBreakdownMultisig /> component', () => {
    const createTestComponent = (props?: Partial<IProposalVotingBreakdownMultisigProps>) => {
        const completeProps: IProposalVotingBreakdownMultisigProps = {
            approvalsAmount: 0,
            minApprovals: 0,
            membersCount: 1,
            ...props,
        };

        return (
            <Tabs.Root defaultValue={ProposalVotingTab.BREAKDOWN}>
                <ProposalVotingBreakdownMultisig {...completeProps} />
            </Tabs.Root>
        );
    };

    it('renders a breakdown tab', () => {
        render(createTestComponent());
        const tabPabel = screen.getByRole('tabpanel');
        expect(tabPabel).toBeInTheDocument();
        expect(tabPabel.id).toContain(ProposalVotingTab.BREAKDOWN);
    });

    it('throws invariant error when memberCount is set to 0', () => {
        testLogger.suppressErrors();
        const membersCount = 0;
        expect(() => render(createTestComponent({ membersCount }))).toThrow();
    });

    it('renders a progress based on the current approvals amount and the total number of members', () => {
        const approvalsAmount = 2;
        const membersCount = 10;
        const minApprovals = 5;
        render(createTestComponent({ approvalsAmount, membersCount, minApprovals }));

        const progressbar = screen.getByRole('progressbar');
        expect(progressbar).toBeInTheDocument();
        expect(progressbar.dataset.value).toEqual(((approvalsAmount / membersCount) * 100).toString());
        expect(screen.getByTestId('progress-indicator').dataset.value).toEqual(
            ((minApprovals / membersCount) * 100).toString(),
        );
    });

    it('renders the correct labels', () => {
        const approvalsAmount = 1000;
        const membersCount = 12345;
        render(createTestComponent({ approvalsAmount, membersCount }));
        expect(screen.getByText('Minimum Approval')).toBeInTheDocument();
        expect(screen.getByText('1K')).toBeInTheDocument();
        expect(screen.getByText('of 12.35K Members')).toBeInTheDocument();
    });
});
