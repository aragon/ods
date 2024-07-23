import { render, screen } from '@testing-library/react';
import { modulesCopy } from '../../../../../assets';
import { ProposalActionType, type IProposalActionChangeMembers } from '../../proposalActionsTypes';
import { generateProposalActionChangeMembers } from '../generators/proposalActionChangeMembers';
import { ProposalActionChangeMembers } from './proposalActionChangeMembers';

jest.mock('../../../../../../core', () => ({
    DataList: {
        Root: jest.fn(({ children }) => <div>{children}</div>),
        Container: jest.fn(({ children }) => <div>{children}</div>),
    },
    Heading: jest.fn(({ children }) => <h1>{children}</h1>),
}));

jest.mock('../../../../member', () => ({
    MemberDataListItem: {
        Structure: jest.fn(({ address, ensName }) => (
            <div>
                <span>{address}</span>
                <span>{ensName}</span>
            </div>
        )),
        Skeleton: jest.fn(() => <div>Loading...</div>),
    },
}));

describe('<ProposalActionAdjustMemberCount /> component', () => {
    const createTestComponent = (props?: Partial<IProposalActionChangeMembers>) => {
        const defaultProps = {
            action: generateProposalActionChangeMembers(props),
        };

        return <ProposalActionChangeMembers {...defaultProps} />;
    };

    it('renders without crashing', () => {
        render(createTestComponent());
        expect(
            screen.getByText(modulesCopy.proposalActionsAction.proposalActionChangeMembers.summary),
        ).toBeInTheDocument();
    });

    it('renders correctly for adding members', () => {
        const currentMemberCount = 5;
        const changingMembers = [{ address: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e' }];
        render(
            createTestComponent({
                type: ProposalActionType.ADD_MEMBERS,
                currentMemberCount,
                changingMembers,
            }),
        );

        expect(
            screen.getByText(modulesCopy.proposalActionsAction.proposalActionChangeMembers.added),
        ).toBeInTheDocument();
        expect(
            screen.getByText(
                `+${changingMembers.length} ${modulesCopy.proposalActionsAction.proposalActionChangeMembers.members}`,
            ),
        ).toBeInTheDocument();
        expect(
            screen.getByText(
                `${currentMemberCount + changingMembers.length} ${modulesCopy.proposalActionsAction.proposalActionChangeMembers.members}`,
            ),
        ).toBeInTheDocument();
    });

    it('renders correctly for removing members', () => {
        const currentMemberCount = 7;
        const changingMembers = [{ address: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e' }];
        render(
            createTestComponent({
                type: ProposalActionType.REMOVE_MEMBERS,
                currentMemberCount,
                changingMembers,
            }),
        );

        expect(
            screen.getByText(modulesCopy.proposalActionsAction.proposalActionChangeMembers.removed),
        ).toBeInTheDocument();
        expect(
            screen.getByText(
                `-${changingMembers.length} ${modulesCopy.proposalActionsAction.proposalActionChangeMembers.members}`,
            ),
        ).toBeInTheDocument();
        expect(
            screen.getByText(
                `${currentMemberCount - changingMembers.length} ${modulesCopy.proposalActionsAction.proposalActionChangeMembers.members}`,
            ),
        ).toBeInTheDocument();
    });

    it('renders additional summary information', () => {
        render(createTestComponent());

        expect(
            screen.getByText(modulesCopy.proposalActionsAction.proposalActionChangeMembers.blockNote),
        ).toBeInTheDocument();
    });
});
