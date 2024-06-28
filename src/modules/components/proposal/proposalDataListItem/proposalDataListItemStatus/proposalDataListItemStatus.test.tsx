import { render, screen } from '@testing-library/react';
import { IconType, formatterUtils } from '../../../../../core';
import { DateFormat } from '../../../../../core/utils/formatterUtils/formatterUtilsDefinitions';
import { type ProposalStatus } from '../proposalDataListItemStructure';
import { ProposalDataListItemStatus, type IProposalDataListItemStatusProps } from './proposalDataListItemStatus';

describe('<ProposalDataListItemStatus /> component', () => {
    const createTestComponent = (props?: Partial<IProposalDataListItemStatusProps>) => {
        const completeProps: IProposalDataListItemStatusProps = { date: 1719563030308, status: 'accepted', ...props };

        return <ProposalDataListItemStatus {...completeProps} />;
    };

    const ongoingStatuses = ['active', 'challenged', 'vetoed'];

    it('displays the date, calendar icon and status', () => {
        const date = 1719563030308;
        const status = 'accepted';

        render(createTestComponent({ date, status }));

        const formattedDate = formatterUtils.formatDate(date, { format: DateFormat.RELATIVE })!;
        expect(screen.getByText(formattedDate)).toBeInTheDocument();
        expect(screen.getByText(status)).toBeInTheDocument();
        expect(screen.getByTestId(IconType.CALENDAR)).toBeInTheDocument();
    });

    it('does not render the calendar icon when date property is not defined', () => {
        const status = 'accepted';

        render(createTestComponent({ status, date: undefined }));

        expect(screen.queryByTestId(IconType.CALENDAR)).not.toBeInTheDocument();
    });

    it("only displays the date for proposals with a status that is not 'draft'", () => {
        const date = 1719563030308;
        const status = 'draft';

        render(createTestComponent({ date, status }));

        expect(screen.getByText(status)).toBeInTheDocument();
        expect(screen.queryByText(date)).not.toBeInTheDocument();
        expect(screen.queryByTestId(IconType.CALENDAR)).not.toBeInTheDocument();
    });

    ongoingStatuses.forEach((status) => {
        it(`displays the date and a pinging indicator when the status is '${status}' and voted is false`, () => {
            const date = 1719563030308;
            render(createTestComponent({ date, status: status as ProposalStatus, voted: false }));

            const formattedDate = formatterUtils.formatDate(date, { format: DateFormat.RELATIVE })!;
            expect(screen.getByText(formattedDate)).toBeInTheDocument();
            expect(screen.getByTestId('statePingAnimation')).toBeInTheDocument();
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
