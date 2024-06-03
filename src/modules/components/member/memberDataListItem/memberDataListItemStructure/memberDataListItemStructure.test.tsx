import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { getAddress, isAddress } from 'viem';
import { useAccount } from 'wagmi';
import { DataList } from '../../../../../core';
import { MemberDataListItemStructure, type IMemberDataListItemProps } from './memberDataListItemStructure';

jest.mock('viem', () => ({
    isAddress: jest.fn(),
    getAddress: jest.fn(),
}));

jest.mock('viem/ens', () => ({
    normalize: jest.fn(),
}));

jest.mock('wagmi', () => ({
    useAccount: jest.fn(),
}));

jest.mock('../../memberAvatar', () => ({ MemberAvatar: () => <div data-testid="member-avatar-mock" /> }));

describe('<MemberDataListItem /> component', () => {
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

    beforeEach(() => {
        (isAddress as unknown as jest.Mock).mockImplementation(() => true);
        (getAddress as jest.Mock).mockImplementation((address: string) => address);

        (useAccount as jest.Mock).mockReturnValue({
            address: '0x1234567890123456789012345678901234567890',
            isConnected: true,
        });
    });

    it('renders the avatar', async () => {
        render(createTestComponent());
        const avatar = screen.getByTestId('member-avatar-mock');

        expect(avatar).toBeInTheDocument();
    });

    it('conditionally renders the "Your delegate" tag', async () => {
        const address = '0x0987654321098765432109876543210987654321';
        render(createTestComponent({ isDelegate: true, address }));

        expect(screen.getByText('Your delegate')).toBeInTheDocument();
    });

    it('renders the ENS user handle instead of address if provided', async () => {
        const ensName = 'testUserHandle';
        render(createTestComponent({ ensName }));

        expect(screen.getByRole('heading', { name: ensName })).toBeInTheDocument();
        expect(
            screen.queryByRole('heading', { name: '0x1234567890123456789012345678901234567890' }),
        ).not.toBeInTheDocument();
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
        const address = '0x1234567890123456789012345678901234567890';
        render(createTestComponent({ address }));

        expect(screen.getByText('You')).toBeInTheDocument();
    });
});
