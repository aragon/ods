import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { type RefObject } from 'react';
import { ProposalVotingTab } from '../proposalVotingDefinitions';
import { type IProposalVotingTabsProps, ProposalVotingTabs } from './proposalVotingTabs';

describe('<ProposalVotingTabs /> component', () => {
    const createTestComponent = (props?: Partial<IProposalVotingTabsProps>) => {
        const completeProps: IProposalVotingTabsProps = { ...props };

        return <ProposalVotingTabs {...completeProps} />;
    };

    it('renders the tabs of the proposal voting component and sets the breakdown as default active tab', () => {
        render(createTestComponent());
        const breakdownTab = screen.getByRole('tab', { name: 'Breakdown' });
        expect(breakdownTab).toBeInTheDocument();
        expect(breakdownTab).toHaveAttribute('aria-selected', 'true');
        expect(screen.getByRole('tab', { name: 'Votes' })).toBeInTheDocument();
        expect(screen.getByRole('tab', { name: 'Details' })).toBeInTheDocument();
    });

    it('supports customisation of initial active tab', () => {
        const defaultValue = ProposalVotingTab.DETAILS;
        render(createTestComponent({ defaultValue }));
        const detailsTab = screen.getByRole('tab', { name: 'Details' });
        expect(detailsTab).toHaveAttribute('aria-selected', 'true');
    });

    it('updates radix collapsible height depending on new content height on tab change', async () => {
        const accordionRef = {
            current: { style: { setProperty: jest.fn() } },
        } as unknown as RefObject<HTMLDivElement>;
        render(createTestComponent({ accordionRef }));

        await userEvent.click(screen.getByRole('tab', { name: 'Details' }));
        expect(accordionRef.current?.style.setProperty).toHaveBeenCalledWith(
            '--radix-collapsible-content-height',
            expect.any(String),
        );
    });

    it('does not fail when accordionRef is not defined on tab change', async () => {
        const accordionRef = undefined;
        render(createTestComponent({ accordionRef }));

        await userEvent.click(screen.getByRole('tab', { name: 'Details' }));
        expect(screen.getByRole('tab', { name: 'Breakdown' })).toBeInTheDocument();
    });
});
