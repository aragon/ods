import { render, screen } from '@testing-library/react';
import { IconType, type TagVariant } from '../../../../../core';
import { type ProposalDataListItemStatusType } from '../proposalDataListItemApi';
import { ProposalDataListItemStatus, type IProposalDataListItemStatusProps } from './proposalDataListItemStatus';

describe('<ProposalDataListItemStatus/> component', () => {
    const createTestComponent = (props?: Partial<IProposalDataListItemStatusProps>) => {
        const completeProps: IProposalDataListItemStatusProps = { date: 'test date', status: 'accepted', ...props };

        return <ProposalDataListItemStatus {...completeProps} />;
    };

    const ongoingStatuses = ['active', 'challenged', 'vetoed'];

    const statusToTagVariant: Record<ProposalDataListItemStatusType, TagVariant> = {
        accepted: 'success',
        active: 'info',
        challenged: 'warning',
        draft: 'neutral',
        executed: 'success',
        expired: 'critical',
        failed: 'critical',
        partiallyExecuted: 'warning',
        pending: 'neutral',
        queued: 'success',
        rejected: 'critical',
        vetoed: 'warning',
    };

    it('displays the date, calendar icon and status', () => {
        const date = 'test date';
        const status = 'accepted';

        render(createTestComponent({ date, status }));

        expect(screen.getByText(date)).toBeInTheDocument();
        expect(screen.getByText(status)).toBeInTheDocument();
        expect(screen.getByTestId(IconType.CALENDAR)).toBeInTheDocument();
    });

    it("only displays the date for proposals with 'draft' status", () => {
        const date = 'test date';
        const status = 'draft';

        render(createTestComponent({ date, status }));

        expect(screen.getByText(status)).toBeInTheDocument();
        expect(screen.queryByText(date)).not.toBeInTheDocument();
        expect(screen.queryByTestId(IconType.CALENDAR)).not.toBeInTheDocument();
    });

    Object.entries(statusToTagVariant).forEach(([status, expectedVariant]) => {
        it(`renders the ${expectedVariant} variant of the Tag component when the when the status is '${status}'`, () => {
            render(createTestComponent({ status: status as ProposalDataListItemStatusType }));

            // eslint-disable-next-line testing-library/no-node-access
            const tag = screen.getByText(status).parentElement;

            expect(tag?.className.includes(`bg-${expectedVariant}`)).toBeTruthy();
        });
    });

    ongoingStatuses.forEach((status) => {
        it(`displays the date and a pulse component when the status is '${status}' and voted is false`, () => {
            const date = 'test date';
            render(createTestComponent({ date, status: status as ProposalDataListItemStatusType, voted: false }));

            expect(screen.getByText(date)).toBeInTheDocument();
            expect(screen.getByTestId('pulse')).toBeInTheDocument();
        });
    });

    ongoingStatuses.forEach((status) => {
        it(`displays 'You've voted' with an icon checkmark when the status is '${status}' and voted is true`, () => {
            render(createTestComponent({ status: status as ProposalDataListItemStatusType, voted: true }));

            expect(screen.getByText(/You've voted/i)).toBeInTheDocument();
            expect(screen.getByTestId(IconType.CHECKMARK)).toBeInTheDocument();
        });
    });

    it("does not display 'You've voted' when the status is not an ongoing one and the voted is true", () => {
        render(createTestComponent({ status: 'executed', voted: true }));

        expect(screen.queryByText(/You've voted/i)).not.toBeInTheDocument();
        expect(screen.queryByTestId(IconType.CHECKMARK)).not.toBeInTheDocument();
    });
});
