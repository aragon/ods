import { render, screen } from '@testing-library/react';
import { IconType } from '../../../../../core';
import { type ProposalStatus } from '../proposalDataListItemStructure';
import { ProposalDataListItemStatus, type IProposalDataListItemStatusProps } from './proposalDataListItemStatus';

describe('<ProposalDataListItemStatus /> component', () => {
    const createTestComponent = (props?: Partial<IProposalDataListItemStatusProps>) => {
        const completeProps: IProposalDataListItemStatusProps = { date: 'test date', status: 'accepted', ...props };

        return <ProposalDataListItemStatus {...completeProps} />;
    };

    const ongoingStatuses = ['active', 'challenged', 'vetoed'];

    it('displays the date, calendar icon and status', () => {
        const date = 'test date';
        const status = 'accepted';

        render(createTestComponent({ date, status }));

        expect(screen.getByText(date)).toBeInTheDocument();
        expect(screen.getByText(status)).toBeInTheDocument();
        expect(screen.getByTestId(IconType.CALENDAR)).toBeInTheDocument();
    });

    it("only displays the date for proposals with a status that is not 'draft'", () => {
        const date = 'test date';
        const status = 'draft';

        render(createTestComponent({ date, status }));

        expect(screen.getByText(status)).toBeInTheDocument();
        expect(screen.queryByText(date)).not.toBeInTheDocument();
        expect(screen.queryByTestId(IconType.CALENDAR)).not.toBeInTheDocument();
    });

    ongoingStatuses.forEach((status) => {
        it(`displays the date and a pulse component when the status is '${status}' and voted is false`, () => {
            const date = 'test date';
            render(createTestComponent({ date, status: status as ProposalStatus, voted: false }));

            expect(screen.getByText(date)).toBeInTheDocument();
            expect(screen.getByTestId('pulse')).toBeInTheDocument();
        });
    });

    ongoingStatuses.forEach((status) => {
        it(`displays 'You've voted' with an icon checkmark when the status is '${status}' and voted is true`, () => {
            render(createTestComponent({ status: status as ProposalStatus, voted: true }));

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
