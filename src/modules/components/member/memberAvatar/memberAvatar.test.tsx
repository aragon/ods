import { render, screen, waitFor } from '@testing-library/react';
import { getAddress, isAddress } from 'viem';
import { normalize } from 'viem/ens';
import { useEnsAddress, useEnsAvatar, useEnsName } from 'wagmi';
import { MemberAvatar, type IMemberAvatarProps } from './memberAvatar';

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

describe('<MemberAvatar /> component with props', () => {
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
        jest.clearAllMocks();

        (isAddress as unknown as jest.Mock).mockImplementation(() => true);
        (getAddress as unknown as jest.Mock).mockImplementation(() => '0x028F5Ca0b3A3A14e44AB8af660B53D1e428457e7');
        (useEnsAddress as jest.Mock).mockReturnValue({ data: null, isLoading: false });
        (useEnsName as jest.Mock).mockReturnValue({ data: null, isLoading: false });
        (useEnsAvatar as jest.Mock).mockReturnValue({ data: null, isLoading: false });
    });

    it('should display the avatar directly from avatarSrc prop and ensure no data fetching is attempted', async () => {
        const avatarSrc = 'directAvatarUrl';

        render(createTestComponent({ avatarSrc }));

        await waitFor(() => expect(screen.getByRole('img')).toHaveAttribute('src', avatarSrc));
    });

    it('should display avatar for a valid ENS name and call related hooks with correct parameters', async () => {
        const ensName = 'vitalik.eth';
        const expectedAvatarUrl = 'ensAvatarUrl';

        (useEnsAvatar as jest.Mock).mockReturnValue({ data: expectedAvatarUrl, isLoading: false });

        render(createTestComponent({ ensName }));

        await waitFor(() => expect(screen.getByRole('img')).toHaveAttribute('src', expectedAvatarUrl));

        expect(useEnsAvatar).toHaveBeenCalledWith(expect.objectContaining({ name: normalize(ensName) }));
    });

    it('should display avatar for a valid address and call related hooks with correct parameters', async () => {
        const address = '0x028F5Ca0b3A3A14e44AB8af660B53D1e428457e7';
        const expectedAvatarUrl = 'addressAvatarUrl';

        (useEnsAvatar as jest.Mock).mockReturnValue({ data: expectedAvatarUrl, isLoading: false });

        render(createTestComponent({ address }));

        await waitFor(() => expect(screen.getByRole('img')).toHaveAttribute('src', expectedAvatarUrl));

        expect(isAddress).toHaveBeenCalledWith(address);
        expect(useEnsName).toHaveBeenCalledWith(expect.objectContaining({ address }));
    });
});
