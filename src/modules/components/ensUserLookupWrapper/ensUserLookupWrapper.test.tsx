// ENSUserLookupWrapper.test.tsx
import { render, screen, waitFor } from '@testing-library/react';
//@ts-expect-error - untyped module
import makeBlockiesUrl from 'blockies-react-svg/dist/es/makeBlockiesUrl.mjs';
import { isAddress } from 'viem';
import { useEnsAddress, useEnsAvatar, useEnsName } from 'wagmi';
import { ENSUserLookupWrapper, type IENSLookupProps } from './ensUserLookupWrapper'; // Adjust the import path as necessary

// Mocking the external dependencies
jest.mock('viem', () => ({
    isAddress: jest.fn(),
}));

jest.mock('wagmi', () => ({
    useEnsAddress: jest.fn(),
    useEnsName: jest.fn(),
    useEnsAvatar: jest.fn(),
}));

jest.mock('blockies-react-svg/dist/es/makeBlockiesUrl.mjs', () => jest.fn(() => 'mockedBlockiesUrl'));

describe('ENSUserLookupWrapper', () => {
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

    const createTestComponent = (props?: Partial<IENSLookupProps>) => {
        const completeProps: IENSLookupProps = {
            ensNameOrAddress: '',
            children: () => null,
            ...props,
        };

        return <ENSUserLookupWrapper {...completeProps} />;
    };

    test('displays loading state', async () => {
        (useEnsAddress as jest.Mock).mockReturnValue({
            data: null,
            error: null,
            isLoading: true,
        });
        (useEnsName as jest.Mock).mockReturnValue({
            data: null,
            error: null,
            isLoading: true,
        });
        (useEnsAvatar as jest.Mock).mockReturnValue({
            data: null,
            error: null,
            isLoading: true,
        });
        const address = 'heykd.eth';
        render(
            createTestComponent({
                ensNameOrAddress: address,
                children: ({ isLoading }) => <div>{isLoading ? 'Loading...' : 'Loaded'}</div>,
            }),
        );

        await waitFor(() => {
            expect(screen.getByText('Loading...')).toBeInTheDocument();
        });

        expect(screen.queryByText('Loaded')).not.toBeInTheDocument();
    });

    test('handles error state', async () => {
        render(
            createTestComponent({
                ensNameOrAddress: '0x123',
                children: ({ error }) => <div>{error?.message}</div>,
            }),
        );

        expect(screen.getByText('Invalid input')).toBeInTheDocument();
    });

    test('renders user data successfully', async () => {
        (useEnsAddress as jest.Mock).mockReturnValue({
            data: '0x123',
            error: null,
            isLoading: false,
        });
        (useEnsName as jest.Mock).mockReturnValue({
            data: 'sio.eth',
            error: null,
            isLoading: false,
        });
        (useEnsAvatar as jest.Mock).mockReturnValue({
            data: 'avatarUrl',
            error: null,
            isLoading: false,
        });

        render(
            createTestComponent({
                ensNameOrAddress: 'sio.eth',
                children: ({ user }) => <div>{user ? user.name : 'No user found'}</div>,
            }),
        );

        await waitFor(() => {
            expect(screen.getByText('sio.eth')).toBeInTheDocument();
        });

        expect(screen.queryByText('No user found')).not.toBeInTheDocument();
    });
});
