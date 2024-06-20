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

    it('renders the avatar', async () => {
        render(createTestComponent());
        const avatar = screen.getByTestId('member-avatar-mock');

        expect(avatar).toBeInTheDocument();
    });

    it('conditionally renders the "Your Delegate" tag', async () => {
        const address = '0x0987654321098765432109876543210987654321';
        render(createTestComponent({ isDelegate: true, address }));

        expect(screen.getByText('Your Delegate')).toBeInTheDocument();
    });

    it('renders the ENS user handle instead of address if provided', async () => {
        const ensName = 'testUserHandle';
        const address = '0x000000633b68f5D8D3a86593ebB815b4663BCBe0';
        render(createTestComponent({ ensName }));

        expect(screen.getByRole('heading', { name: ensName })).toBeInTheDocument();
        expect(screen.queryByRole('heading', { name: address })).not.toBeInTheDocument();
    });

    it('conditionally renders the delegation count and formats it', async () => {
        const { rerender } = render(createTestComponent({ delegationCount: 340 }));
        const delegationText = await screen.findByText(/340/);
        // eslint-disable-next-line testing-library/no-node-access
        const parentElement = delegationText.closest('h2');

        expect(parentElement).toHaveTextContent('340 Delegation');

        rerender(createTestComponent({ delegationCount: 2959 }));
        const delegationsText = await screen.findByText(/2.96K/);
        // eslint-disable-next-line testing-library/no-node-access
        const parentElementForTwo = delegationsText.closest('h2');

        expect(parentElementForTwo).toHaveTextContent('2.96K Delegations');
    });

    it('renders the voting power, correctly formatting large numbers', async () => {
        const votingPower = 420689;
        render(createTestComponent({ votingPower }));
        const formattedNumberElement = await screen.findByText(/420\.69K/);
        // eslint-disable-next-line testing-library/no-node-access
        const parentElement = formattedNumberElement.closest('h2');

        expect(parentElement).toHaveTextContent('420.69K Voting Power');
    });

    it('renders the "You" tag when the user is the current account', async () => {
        const address = '0x50ce432B38eE98dE5Fa375D5125aA6d0d054E662';
        useAccountMock.mockReturnValue({ isConnected: true, address } as unknown as wagmi.UseAccountReturnType);
        render(createTestComponent({ address }));

        expect(screen.getByText('You')).toBeInTheDocument();
    });
});
