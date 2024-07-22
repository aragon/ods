import { render, screen } from '@testing-library/react';
import { modulesCopy } from '../../../../../assets';
import type { IProposalActionAdjustMemberCount } from '../../proposalActionsTypes';
import { generateProposalActionAdjustMemberCount } from '../generators/proposalActionAdjustMemberCount';
import { ProposalActionAdjustMemberCount } from './proposalActionAdjustMemberCount';

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
    const createTestComponent = (props?: Partial<IProposalActionAdjustMemberCount>) => {
        const defaultProps = {
            action: generateProposalActionAdjustMemberCount(props),
        };

        return <ProposalActionAdjustMemberCount {...defaultProps} />;
    };

    it('renders without crashing', () => {
        render(createTestComponent());
        expect(screen.getByText(modulesCopy.proposalActionAdjustMemberCount.summary)).toBeInTheDocument();
    });

    it('renders correctly for adding members', () => {
        const addOrRemove = 'add';
        const currentMemberCount = 5;
        const changingMembers = [{ address: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e' }];
        render(
            createTestComponent({
                addOrRemove,
                currentMemberCount,
                changingMembers,
            }),
        );

        expect(screen.getByText(modulesCopy.proposalActionAdjustMemberCount.added)).toBeInTheDocument();
        expect(
            screen.getByText(`+${changingMembers.length} ${modulesCopy.proposalActionAdjustMemberCount.members}`),
        ).toBeInTheDocument();
        expect(
            screen.getByText(
                `${currentMemberCount + changingMembers.length} ${modulesCopy.proposalActionAdjustMemberCount.members}`,
            ),
        ).toBeInTheDocument();
    });

    it('renders correctly for removing members', () => {
        const addOrRemove = 'remove';
        const currentMemberCount = 7;
        const changingMembers = [{ address: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e' }];
        render(
            createTestComponent({
                addOrRemove,
                currentMemberCount,
                changingMembers,
            }),
        );

        expect(screen.getByText(modulesCopy.proposalActionAdjustMemberCount.removed)).toBeInTheDocument();
        expect(
            screen.getByText(`-${changingMembers.length} ${modulesCopy.proposalActionAdjustMemberCount.members}`),
        ).toBeInTheDocument();
        expect(
            screen.getByText(
                `${currentMemberCount - changingMembers.length} ${modulesCopy.proposalActionAdjustMemberCount.members}`,
            ),
        ).toBeInTheDocument();
    });

    it('renders additional summary information', () => {
        render(createTestComponent());

        expect(screen.getByText(modulesCopy.proposalActionAdjustMemberCount.blockNote)).toBeInTheDocument();
    });
});
