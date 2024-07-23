import { render, screen } from '@testing-library/react';
import { modulesCopy } from '../../../../../assets';
import { ProposalActionType } from '../../proposalActionsTypes';
import { generateProposalActionChangeMembers } from '../generators/proposalActionChangeMembers';
import { type IProposalActionChangeMembersProps, ProposalActionChangeMembers } from './proposalActionChangeMembers';

jest.mock('../../../../../../core', () => ({
    DataList: {
        Root: jest.fn(({ children }) => <div>{children}</div>),
        Container: jest.fn(({ children }) => <div>{children}</div>),
    },
    Heading: jest.fn(({ children }) => <h1>{children}</h1>),
    DefinitionList: {
        Container: ({ children }: { children: React.ReactNode }) => <dl>{children}</dl>,
        Item: ({ term, children }: { term: string; children: React.ReactNode }) => (
            <div>
                <dt>{term}</dt>
                <dd>{children}</dd>
            </div>
        ),
    },
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

describe('<ProposalActionChangeMembers /> component', () => {
    const createTestComponent = (props?: Partial<IProposalActionChangeMembersProps>) => {
        const completeProps: IProposalActionChangeMembersProps = {
            action: generateProposalActionChangeMembers(),
            ...props,
        };

        return <ProposalActionChangeMembers {...completeProps} />;
    };

    it('renders the existing members correctly', () => {
        const currentMembers = 5;
        const action = generateProposalActionChangeMembers({ currentMembers });
        render(
            createTestComponent({
                action,
            }),
        );

        expect(
            screen.getByText(
                `${currentMembers} ${modulesCopy.proposalActionsAction.proposalActionChangeMembers.members}`,
            ),
        ).toBeInTheDocument();
    });

    it('renders correctly for adding members', () => {
        const type = ProposalActionType.ADD_MEMBERS;
        const currentMembers = 5;
        const members = [{ address: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e' }];
        const action = generateProposalActionChangeMembers({ type, currentMembers, members });
        render(
            createTestComponent({
                action,
            }),
        );

        expect(
            screen.getByText(modulesCopy.proposalActionsAction.proposalActionChangeMembers.added),
        ).toBeInTheDocument();
        expect(
            screen.getByText(
                `+${members.length} ${modulesCopy.proposalActionsAction.proposalActionChangeMembers.members}`,
            ),
        ).toBeInTheDocument();
    });

    it('renders correctly for removing members', () => {
        const type = ProposalActionType.REMOVE_MEMBERS;
        const currentMembers = 7;
        const members = [{ address: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e' }];
        const action = generateProposalActionChangeMembers({ type, currentMembers, members });
        render(
            createTestComponent({
                action,
            }),
        );

        expect(
            screen.getByText(modulesCopy.proposalActionsAction.proposalActionChangeMembers.removed),
        ).toBeInTheDocument();
        expect(
            screen.getByText(
                `-${members.length} ${modulesCopy.proposalActionsAction.proposalActionChangeMembers.members}`,
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
