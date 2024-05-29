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

const setupMocks = () => {
    const useConnectMock = jest.spyOn(wagmi, 'useConnect');
    const useDisconnectMock = jest.spyOn(wagmi, 'useDisconnect');
    const useAccountMock = jest.spyOn(wagmi, 'useAccount');
    const useEnsNameMock = jest.spyOn(wagmi, 'useEnsName');

    const defaultConnect = {
        connect: jest.fn(),
        isIdle: true,
        isPending: false,
        isSuccess: false,
        status: 'idle',
    };

    const defaultDisconnect = {
        disconnect: jest.fn(),
        isIdle: true,
        isPending: false,
        isSuccess: false,
        status: 'idle',
    };

    const defaultAccount = {
        address: undefined as string | undefined,
        isConnected: false,
        isConnecting: false,
        isDisconnected: true,
        status: 'disconnected',
    };

    const defaultEnsName = {
        data: undefined as string | undefined,
        isLoading: false,
        isSuccess: false,
        isPending: true,
        status: 'pending',
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

    return {
        useConnectMock,
        useDisconnectMock,
        useAccountMock,
        useEnsNameMock,
        defaultConnect,
        defaultDisconnect,
        defaultAccount,
        defaultEnsName,
    };
};

describe('<Wallet /> component', () => {
    const {
        useConnectMock,
        useDisconnectMock,
        useAccountMock,
        useEnsNameMock,
        defaultConnect,
        defaultDisconnect,
        defaultAccount,
        defaultEnsName,
    } = setupMocks();

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
        });
        mockWagmiHook(useEnsNameMock, defaultEnsName, { data: 'vitalik.eth', isSuccess: true, status: 'success' });

        createTestComponent();

        expect(screen.getByText('vitalik.eth')).toBeInTheDocument();
    });

    it('renders address when connected and no ensName', () => {
        mockWagmiHook(useAccountMock, defaultAccount, {
            address: '0x123',
            isConnected: true,
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
                mockWagmiHook(useAccountMock, defaultAccount);
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
        });

        createTestComponent({ onDisconnect });

        fireEvent.click(screen.getByRole('button'));

        expect(onDisconnect).toHaveBeenCalled();
    });
});
