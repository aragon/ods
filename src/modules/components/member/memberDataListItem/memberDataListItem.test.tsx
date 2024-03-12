import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { getAddress, isAddress } from 'viem';
import { useEnsAddress, useEnsAvatar, useEnsName } from 'wagmi';
import { MemberDataListItem, type IMemberDataListProps } from './memberDataListItem';

jest.mock('viem', () => ({
    isAddress: jest.fn(),
    getAddress: jest.fn(),
}));

jest.mock('viem/ens', () => ({
    normalize: jest.fn(),
}));

jest.mock('wagmi', () => ({
    useEnsAddress: jest.fn(),
    useEnsName: jest.fn(),
    useEnsAvatar: jest.fn(),
}));

describe('<MemberDataListItem /> component', () => {
    const createTestComponent = (props?: Partial<IMemberDataListProps>) => {
        const completeProps: IMemberDataListProps = {
            ...props,
        };

        return <MemberDataListItem {...completeProps} />;
    };

    const originalGlobalImage = global.Image;

    beforeAll(() => {
        (window.Image as unknown) = class MockImage {
            onload: () => void = () => {};
            src: string = '';
            constructor() {
                setTimeout(() => {
                    this.onload();
                }, 100);
            }
        };
    });

    afterAll(() => {
        global.Image = originalGlobalImage;
    });

    beforeEach(() => {
        (isAddress as unknown as jest.Mock).mockImplementation(() => true);
        (getAddress as jest.Mock).mockImplementation((address: string) => address);
        (useEnsAddress as jest.Mock).mockReturnValue({ data: null, isLoading: false });
        (useEnsName as jest.Mock).mockReturnValue({ data: null, isLoading: false });
        (useEnsAvatar as jest.Mock).mockReturnValue({ data: 'mock-avatar-url', isLoading: false });
    });

    it('renders the avatar with the provided src', async () => {
        const avatarSrc = 'mock-ens-avatar.jpg';
        const ensName = 'vitalik.eth';
        const address = '0x5f4eC3Df9cbd43714FE2740f5E3616155c5b8419';
        const { rerender } = render(createTestComponent({ avatarSrc }));

        const img = await screen.findByRole('img');
        expect(img).toHaveAttribute('src', avatarSrc);

        rerender(createTestComponent({ ensName }));
        expect(img).toHaveAttribute('src', 'mock-avatar-url');

        rerender(createTestComponent({ address }));
        expect(img).toHaveAttribute('src', 'mock-avatar-url');
    });

    it('conditionally renders the "Your Delegate" tag', async () => {
        const { rerender } = render(createTestComponent({ isDelegate: false }));
        expect(screen.queryByText('Your Delegate')).not.toBeInTheDocument();

        rerender(createTestComponent({ isDelegate: true }));
        expect(screen.getByText('Your Delegate')).toBeInTheDocument();
    });

    it('renders the user handle, defaulting to "Unknown" if not provided', async () => {
        const ensName = 'testUserHandle';
        const { rerender } = render(createTestComponent({ ensName }));
        expect(screen.getByRole('heading', { name: ensName })).toBeInTheDocument();

        rerender(createTestComponent({ ensName: undefined }));
        rerender(createTestComponent());
        expect(screen.getByRole('heading', { name: 'Unknown' })).toBeInTheDocument();
    });

    it('conditionally renders the delegation count and formats it', async () => {
        const { rerender } = render(createTestComponent({ delegationCount: 1 }));

        const delegationText = await screen.findByText(/1/);
        // eslint-disable-next-line testing-library/no-node-access
        const parentElement = delegationText.closest('h2');

        expect(parentElement).toHaveTextContent('1 Delegation');

        rerender(createTestComponent({ delegationCount: 2 }));
        const delegationsText = await screen.findByText(/2/);
        // eslint-disable-next-line testing-library/no-node-access
        const parentElementForTwo = delegationsText.closest('h2');

        expect(parentElementForTwo).toHaveTextContent('2 Delegations');
    });

    it('renders the voting power, correctly formatting large numbers', async () => {
        const votingPower = 420689;
        render(createTestComponent({ votingPower }));
        const formattedNumberElement = await screen.findByText(/420\.69K/);
        // eslint-disable-next-line testing-library/no-node-access
        const parentElement = formattedNumberElement.closest('h2');

        expect(parentElement).toHaveTextContent('420.69K Voting Power');
    });
});
