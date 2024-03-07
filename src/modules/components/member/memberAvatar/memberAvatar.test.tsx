import { render, screen, waitFor } from '@testing-library/react';
//@ts-expect-error - untyped module
import makeBlockiesUrl from 'blockies-react-svg/dist/es/makeBlockiesUrl.mjs';
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

jest.mock('blockies-react-svg/dist/es/makeBlockiesUrl.mjs', () => jest.fn(() => 'mockedBlockiesUrl'));

describe('<MemberAvatar /> component', () => {
    const createTestComponent = (props?: Partial<IMemberAvatarProps>) => {
        const completeProps: IMemberAvatarProps = { ensNameOrAddress: '', ...props };

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
        (makeBlockiesUrl as jest.Mock).mockReset();
    });

    it('renders loading spinner initially', async () => {
        (useEnsAddress as jest.Mock).mockReturnValue({ data: '0x123', isLoading: true });
        const ensNameOrAddress = 'lalala.eth';
        render(createTestComponent({ ensNameOrAddress }));

        expect(screen.getByRole('progressbar')).toBeInTheDocument();
    });

    it('displays the avatar once loaded', async () => {
        (useEnsAddress as jest.Mock).mockReturnValue({ data: '0x123', isLoading: false });
        (useEnsAvatar as jest.Mock).mockReturnValue({ data: 'avatarUrl', isLoading: false });
        const ensNameOrAddress = 'lalala.eth';
        render(createTestComponent({ ensNameOrAddress }));

        await waitFor(() => expect(screen.getByRole('img')).toHaveAttribute('src', 'avatarUrl'));
    });
});
