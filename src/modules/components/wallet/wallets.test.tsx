import { type QueryClient } from '@tanstack/react-query';
import { act, fireEvent, render, screen } from '@testing-library/react';
import * as wagmi from 'wagmi';
import { OdsModulesProvider } from '../odsModulesProvider';
import { Wallet, type IWalletProps } from './wallet';

jest.mock('../member', () => ({
    MemberAvatar: () => <div data-testid="member-avatar-mock" />,
}));

jest.mock('wagmi/connectors', () => ({
    injected: jest.fn(() => ({})),
    walletConnect: jest.fn(({ projectId }: { projectId: string }) => ({ projectId })),
}));

const mockWagmiHook = <T,>(hook: jest.SpyInstance, defaultValue: T, overrides?: Partial<T>) => {
    hook.mockReturnValue({ ...defaultValue, ...overrides });
};

describe('<Wallet /> component', () => {
    const useConnectMock = jest.spyOn(wagmi, 'useConnect');
    const useDisconnectMock = jest.spyOn(wagmi, 'useDisconnect');
    const useAccountMock = jest.spyOn(wagmi, 'useAccount');
    const useEnsNameMock = jest.spyOn(wagmi, 'useEnsName');

    const defaultConnect = {
        connect: jest.fn(),
        connectors: [],
        data: undefined,
        error: null,
        isError: false,
        isIdle: true,
        isPending: false,
        isSuccess: false,
        reset: jest.fn(),
        status: 'idle',
        variables: undefined,
    };

    const defaultDisconnect = {
        disconnect: jest.fn(),
        data: undefined,
        error: null,
        isError: false,
        isIdle: true,
        isPending: false,
        isSuccess: false,
        reset: jest.fn(),
        status: 'idle',
        variables: undefined,
    };

    const defaultAccount = {
        address: undefined as string | undefined,
        connector: undefined,
        isConnected: false,
        isConnecting: false,
        isDisconnected: true,
        isReconnecting: false,
        status: 'disconnected',
        addresses: undefined,
        chain: undefined,
        chainId: undefined,
    };

    const defaultEnsName = {
        data: undefined as string | undefined,
        isError: false,
        isFetching: false,
        isLoading: false,
        isSuccess: false,
        refetch: jest.fn(),
        error: null,
        isPending: true,
        isLoadingError: false,
        isRefetchError: false,
        status: 'pending',
        dataUpdatedAt: 0,
        errorUpdatedAt: 0,
        failureCount: 0,
        failureReason: null,
        errorUpdateCount: 0,
        isFetched: false,
        isFetchedAfterMount: false,
        isInitialLoading: false,
        isPaused: false,
        isPlaceholderData: false,
        isRefetching: false,
        isStale: false,
        fetchStatus: 'idle',
        queryKey: [],
    };

    beforeEach(() => {
        mockWagmiHook(useConnectMock, defaultConnect);
        mockWagmiHook(useDisconnectMock, defaultDisconnect);
        mockWagmiHook(useAccountMock, defaultAccount);
        mockWagmiHook(useEnsNameMock, defaultEnsName);
    });

    afterEach(() => {
        jest.resetAllMocks();
    });

    const createTestComponent = (props?: Partial<IWalletProps>, queryClient?: QueryClient) => {
        return render(
            <OdsModulesProvider queryClient={queryClient}>
                <Wallet {...props} />
            </OdsModulesProvider>,
        );
    };

    it('renders connect button when disconnected', () => {
        createTestComponent();
        expect(screen.getByText('Connect')).toBeInTheDocument();
    });

    it('calls connect function on button click when disconnected', () => {
        const connectMock = jest.fn();
        mockWagmiHook(useConnectMock, defaultConnect, { connect: connectMock });

        createTestComponent();

        fireEvent.click(screen.getByRole('button'));

        expect(connectMock).toHaveBeenCalled();
    });

    it('calls disconnect function on button click when connected', () => {
        const disconnectMock = jest.fn();
        mockWagmiHook(useAccountMock, defaultAccount, {
            address: '0x123',
            isConnected: true,
            isReconnecting: true,
            status: 'reconnecting',
        });
        mockWagmiHook(useDisconnectMock, defaultDisconnect, { disconnect: disconnectMock });

        createTestComponent();

        fireEvent.click(screen.getByRole('button'));

        expect(disconnectMock).toHaveBeenCalled();
    });

    it('disables button when isPending is true', () => {
        mockWagmiHook(useConnectMock, defaultConnect, { isPending: true });

        createTestComponent();

        expect(screen.getByRole('button')).toBeDisabled();
    });

    it('renders ensName when connected', () => {
        mockWagmiHook(useAccountMock, defaultAccount, {
            address: '0x123',
            isConnected: true,
            isReconnecting: true,
            status: 'reconnecting',
        });
        mockWagmiHook(useEnsNameMock, defaultEnsName, { data: 'vitalik.eth', isSuccess: true, status: 'success' });

        createTestComponent();

        expect(screen.getByText('vitalik.eth')).toBeInTheDocument();
    });

    it('renders address when connected and no ensName', () => {
        mockWagmiHook(useAccountMock, defaultAccount, {
            address: '0x123',
            isConnected: true,
            isReconnecting: true,
            status: 'reconnecting',
        });

        createTestComponent();

        expect(screen.getByText('0x123')).toBeInTheDocument();
    });

    it('renders loading state when connect is pending', () => {
        mockWagmiHook(useConnectMock, defaultConnect, { isPending: true });

        createTestComponent();

        expect(screen.getByTestId('stateSkeletonBar')).toBeInTheDocument();
        expect(screen.getByTestId('stateSkeletonCircular')).toBeInTheDocument();
    });

    it('calls onConnect callback when connect is successful', async () => {
        const onConnect = jest.fn();
        const connectMock = jest.fn(() => {
            act(() => {
                mockWagmiHook(useAccountMock, defaultAccount, {
                    address: '0x123',
                    isConnected: true,
                    isReconnecting: true,
                    status: 'reconnecting',
                });
            });
        });
        mockWagmiHook(useConnectMock, defaultConnect, { connect: connectMock });

        createTestComponent({ onConnect });

        fireEvent.click(screen.getByRole('button'));

        expect(onConnect).toHaveBeenCalled();
    });

    it('calls onDisconnect callback when disconnect is successful', async () => {
        const onDisconnect = jest.fn();
        const disconnectMock = jest.fn(() => {
            act(() => {
                mockWagmiHook(useAccountMock, defaultAccount, {
                    address: undefined,
                    isConnected: false,
                    status: 'disconnected',
                });
            });
        });
        mockWagmiHook(useDisconnectMock, defaultDisconnect, { disconnect: disconnectMock });

        mockWagmiHook(useAccountMock, defaultAccount, {
            address: '0x123',
            isConnected: true,
            isReconnecting: true,
            status: 'reconnecting',
        });

        createTestComponent({ onDisconnect });

        fireEvent.click(screen.getByRole('button'));

        expect(onDisconnect).toHaveBeenCalled();
    });
});
