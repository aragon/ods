import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { MemberDataListItem, type IMemberDataListProps } from './memberDataListItem';

describe('<MemberDataListItem /> component', () => {
    const createTestComponent = (props?: Partial<IMemberDataListProps>) => {
        const completeProps: IMemberDataListProps = {
            avatar: 'avatar-src',
            isDelegate: false,
            userHandle: 'Unknown',
            delegationCount: 0,
            votingPower: 0,
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

    it('renders the avatar with the provided src', async () => {
        const avatar = 'mock-ens-avatar.jpg';
        render(createTestComponent({ avatar }));

        const img = await screen.findByRole('img');
        expect(img).toHaveAttribute('src', avatar);
    });

    it('conditionally renders the "Your Delegate" tag', async () => {
        const { rerender } = render(createTestComponent({ isDelegate: false }));
        expect(screen.queryByText('Your Delegate')).not.toBeInTheDocument();

        rerender(createTestComponent({ isDelegate: true }));
        expect(screen.getByText('Your Delegate')).toBeInTheDocument();
    });

    it('renders the user handle, defaulting to "Unknown" if not provided', async () => {
        const userHandle = 'testUserHandle';
        const { rerender } = render(createTestComponent({ userHandle }));
        expect(screen.getByRole('heading', { name: userHandle })).toBeInTheDocument();

        rerender(createTestComponent({ userHandle: undefined }));
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
