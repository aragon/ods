import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import * as wagmi from 'wagmi';
import { DataList } from '../../../../../core';
import { MemberDataListItemStructure, type IMemberDataListItemProps } from './memberDataListItemStructure';

jest.mock('../../memberAvatar', () => ({ MemberAvatar: () => <div data-testid="member-avatar-mock" /> }));

describe('<MemberDataListItem /> component', () => {
    const useAccountMock = jest.spyOn(wagmi, 'useAccount');

    beforeEach(() => {
        useAccountMock.mockReturnValue({} as wagmi.UseAccountReturnType);
    });

    afterEach(() => {
        useAccountMock.mockReset();
    });

    const createTestComponent = (props?: Partial<IMemberDataListItemProps>) => {
        const completeProps: IMemberDataListItemProps = {
            address: '0x1234567890123456789012345678901234567890',
            ...props,
        };

        return (
            <DataList.Root entityLabel="Members">
                <DataList.Container>
                    <MemberDataListItemStructure {...completeProps} />
                </DataList.Container>
            </DataList.Root>
        );
    };

    it('renders the member avatar', () => {
        render(createTestComponent());
        const avatar = screen.getByTestId('member-avatar-mock');
        expect(avatar).toBeInTheDocument();
    });

    it('renders a delegate tag when isDelegate property is set to true', () => {
        const address = '0x0987654321098765432109876543210987654321';
        render(createTestComponent({ isDelegate: true, address }));
        expect(screen.getByText('Your Delegate')).toBeInTheDocument();
    });

    it('renders the member ENS user handle instead of address if provided', () => {
        const ensName = 'testUserHandle';
        const address = '0x000000633b68f5D8D3a86593ebB815b4663BCBe0';
        render(createTestComponent({ ensName }));
        expect(screen.getByRole('heading', { name: ensName })).toBeInTheDocument();
        expect(screen.queryByRole('heading', { name: address })).not.toBeInTheDocument();
    });

    it('renders and formats the delegation count of the member when defined', () => {
        const { rerender } = render(createTestComponent({ delegationCount: 340 }));
        expect(screen.getByRole('heading', { level: 2, name: '340 Delegations' })).toBeInTheDocument();

        rerender(createTestComponent({ delegationCount: 2959 }));
        expect(screen.getByRole('heading', { level: 2, name: '2.96K Delegations' })).toBeInTheDocument();
    });

    it('renders the voting power of the member when not null', () => {
        const votingPower = 0;
        render(createTestComponent({ votingPower }));
        expect(screen.getByRole('heading', { level: 2, name: '0 Voting Power' })).toBeInTheDocument();
    });

    it('renders and formats the voting power of the member', () => {
        const votingPower = 420689;
        render(createTestComponent({ votingPower }));
        expect(screen.getByRole('heading', { level: 2, name: '420.69K Voting Power' })).toBeInTheDocument();
    });

    it('renders a you tag when the user is the current connected account', () => {
        const address = '0x50ce432B38eE98dE5Fa375D5125aA6d0d054E662';
        useAccountMock.mockReturnValue({ isConnected: true, address } as unknown as wagmi.UseAccountReturnType);
        render(createTestComponent({ address }));
        expect(screen.getByText('You')).toBeInTheDocument();
    });
});
