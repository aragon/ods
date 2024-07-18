import { render, screen, within } from '@testing-library/react';
import { NumberFormat, Tabs, formatterUtils } from '../../../../../core';
import { testLogger } from '../../../../../core/test';
import { ProposalVotingTab } from '../proposalVotingDefinitions';
import { type IProposalVotingBreakdownTokenProps, ProposalVotingBreakdownToken } from './proposalVotingBreakdownToken';

describe('<ProposalVotingBreakdownToken /> component', () => {
    const createTestComponent = (props?: Partial<IProposalVotingBreakdownTokenProps>) => {
        const completeProps: IProposalVotingBreakdownTokenProps = {
            totalAbstain: 0,
            totalNo: 0,
            totalYes: 0,
            minParticipation: 1,
            supportThreshold: 0,
            tokenSymbol: '',
            tokenTotalSupply: 1,
            ...props,
        };

        return (
            <Tabs.Root defaultValue={ProposalVotingTab.BREAKDOWN}>
                <ProposalVotingBreakdownToken {...completeProps} />
            </Tabs.Root>
        );
    };

    it('renders a breakdown tab', () => {
        render(createTestComponent());
        const tabPabel = screen.getByRole('tabpanel');
        expect(tabPabel).toBeInTheDocument();
        expect(tabPabel.id).toContain(ProposalVotingTab.BREAKDOWN);
    });

    it('throws error when tokenTotalSupply is set to 0', () => {
        testLogger.suppressErrors();
        const tokenTotalSupply = 0;
        expect(() => render(createTestComponent({ tokenTotalSupply }))).toThrow();
    });

    it('throws error when minParticipation is set to 0', () => {
        testLogger.suppressErrors();
        const minParticipation = 0;
        expect(() => render(createTestComponent({ minParticipation }))).toThrow();
    });

    it('renders a progress and proper description for each option based on the current votes and total votes', () => {
        const totalYes = 7000;
        const totalNo = 2000;
        const totalAbstain = 1000;
        const totalVotes = totalYes + totalAbstain + totalNo;
        const supportThreshold = 45;
        render(createTestComponent({ totalYes, totalNo, totalAbstain, supportThreshold }));

        const options = [
            { label: 'Yes', value: totalYes },
            { label: 'Abstain', value: totalAbstain },
            { label: 'No', value: totalNo },
        ];

        options.forEach((option, index) => {
            // eslint-disable-next-line testing-library/no-node-access
            const progressbarContainer = within(screen.getAllByRole('progressbar')[index].parentElement!);
            const progressbarValue = ((option.value / totalVotes) * 100).toString();
            const progressbarText = formatterUtils.formatNumber(option.value, { format: NumberFormat.GENERIC_SHORT })!;

            expect(screen.getByText(option.label)).toBeInTheDocument();
            expect(progressbarContainer.getByRole('progressbar').dataset.value).toEqual(progressbarValue);
            expect(progressbarContainer.getByText(progressbarText)).toBeInTheDocument();
        });
    });
});
