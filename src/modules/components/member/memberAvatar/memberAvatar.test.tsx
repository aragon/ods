import { render, screen, waitFor } from '@testing-library/react';
import * as blockies from 'blockies-ts';
import * as viem from 'viem';
import { normalize } from 'viem/ens';
import * as wagmi from 'wagmi';
import { MemberAvatar, type IMemberAvatarProps } from './memberAvatar';

describe('<MemberAvatar /> component', () => {
    const originalGlobalImage = global.Image;

    const useEnsAddressMock = jest.spyOn(wagmi, 'useEnsAddress');
    const useEnsNameMock = jest.spyOn(wagmi, 'useEnsName');
    const useEnsAvatarMock = jest.spyOn(wagmi, 'useEnsAvatar');
    const getAddressMock = jest.spyOn(viem, 'getAddress');
    const blockiesCreateMock = jest.spyOn(blockies, 'create');

    const createTestComponent = (props?: Partial<IMemberAvatarProps>) => {
        const completeProps: IMemberAvatarProps = { ...props };

        return <MemberAvatar {...completeProps} />;
    };

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
        useEnsAddressMock.mockReturnValue({ data: null, isLoading: false } as wagmi.UseEnsAddressReturnType);
        useEnsNameMock.mockReturnValue({ data: null, isLoading: false } as wagmi.UseEnsNameReturnType);
        useEnsAvatarMock.mockReturnValue({ data: null, isLoading: false } as wagmi.UseEnsAvatarReturnType);
        getAddressMock.mockImplementation((value) => value as viem.Address);
        blockiesCreateMock.mockReturnValue({ toDataURL: () => '' } as HTMLCanvasElement);
    });

    it('displays the avatar directly from avatarSrc prop and ensure no data fetching is attempted', async () => {
        const avatarSrc = 'directAvatarUrl';

        render(createTestComponent({ avatarSrc }));

        await waitFor(() => expect(screen.getByRole('img')).toHaveAttribute('src', avatarSrc));
    });

    it('displays avatar for a valid ENS name and call related hooks with correct parameters', async () => {
        const ensName = 'vitalik.eth';
        const expectedAvatarUrl = 'ensAvatarUrl';

        useEnsAvatarMock.mockReturnValue({ data: expectedAvatarUrl, isLoading: false } as wagmi.UseEnsAvatarReturnType);

        render(createTestComponent({ ensName }));

        await waitFor(() => expect(screen.getByRole('img')).toHaveAttribute('src', expectedAvatarUrl));

        expect(useEnsAvatarMock).toHaveBeenCalledWith(expect.objectContaining({ name: normalize(ensName) }));
    });

    it('displays avatar for a valid address and call related hooks with correct parameters', async () => {
        const address = '0x028F5Ca0b3A3A14e44AB8af660B53D1e428457e7';
        const expectedAvatarUrl = 'addressAvatarUrl';

        useEnsAvatarMock.mockReturnValue({ data: expectedAvatarUrl, isLoading: false } as wagmi.UseEnsAvatarReturnType);

        render(createTestComponent({ address }));

        await waitFor(() => expect(screen.getByRole('img')).toHaveAttribute('src', expectedAvatarUrl));

        expect(useEnsNameMock).toHaveBeenCalledWith(expect.objectContaining({ address }));
    });
});
