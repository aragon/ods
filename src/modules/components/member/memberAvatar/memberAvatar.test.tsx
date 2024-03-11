import { render, screen, waitFor } from '@testing-library/react';
import { isAddress } from 'viem';
import { useEnsAddress, useEnsAvatar, useEnsName } from 'wagmi';
import { MemberAvatar, type IMemberAvatarProps } from './memberAvatar';

jest.mock('viem', () => ({
    isAddress: jest.fn(),
}));

jest.mock('wagmi', () => ({
    useEnsAddress: jest.fn(),
    useEnsName: jest.fn(),
    useEnsAvatar: jest.fn(),
}));

// Assuming blockies-ts provides a create function, you don't need to mock it if it doesn't call external APIs or perform complex operations.
// Otherwise, you might want to mock its output similarly to how you mocked `makeBlockiesUrl` before.

describe('<MemberAvatar /> component', () => {
    const createTestComponent = (props?: Partial<IMemberAvatarProps>) => {
        const completeProps: IMemberAvatarProps = { ...props };

        return <MemberAvatar {...completeProps} />;
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
        (isAddress as unknown as jest.Mock).mockReset();
        (useEnsAddress as jest.Mock).mockReset().mockReturnValue({
            data: null,
            error: null,
            isLoading: false,
        });
        (useEnsName as jest.Mock).mockReset().mockReturnValue({
            data: null,
            error: null,
            isLoading: false,
        });
        (useEnsAvatar as jest.Mock).mockReset().mockReturnValue({
            data: null,
            error: null,
            isLoading: false,
        });
    });

    it('renders loading spinner initially', async () => {
        (useEnsAddress as jest.Mock).mockReturnValue({
            data: 'homie.eth',
            isLoading: true,
        });

        render(createTestComponent());

        expect(screen.getByRole('progressbar')).toBeInTheDocument();
    });

    it('displays the avatar once loaded', async () => {
        (useEnsName as jest.Mock).mockReturnValue({
            data: '0x028F5Ca0b3A3A14e44AB8af660B53D1e428457e7',
            isLoading: false,
        });
        (useEnsAvatar as jest.Mock).mockReturnValue({ data: 'avatarUrl', isLoading: false });

        render(createTestComponent());

        await waitFor(() => expect(screen.getByRole('img')).toHaveAttribute('src', 'avatarUrl'));
    });
});
