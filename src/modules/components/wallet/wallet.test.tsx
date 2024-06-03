import { type QueryClient } from '@tanstack/react-query';
import { render, screen } from '@testing-library/react';
import * as wagmi from 'wagmi';
import { OdsModulesProvider } from '../odsModulesProvider';
import { Wallet, type IWalletProps } from './wallet';

jest.mock('../member', () => ({
    MemberAvatar: () => <div data-testid="member-avatar-mock" />,
}));

jest.mock('../../utils/addressUtils', () => ({
    addressUtils: {
        getChecksum: jest.fn((address) => address),
        truncateAddress: jest.fn((address) => `${address.slice(0, 4)}…${address.slice(-4)}`),
    },
}));

describe('<Wallet /> component', () => {
    const useEnsNameMock = jest.spyOn(wagmi, 'useEnsName');

    const createTestComponent = (props?: Partial<IWalletProps>, queryClient?: QueryClient) => {
        const defaultProps = {
            user: {
                address: '0x1234567890123456789012345678901234567890',
            },
            isConnected: false,
            ...props,
        };

        return render(
            <OdsModulesProvider queryClient={queryClient}>
                <Wallet {...defaultProps} />
            </OdsModulesProvider>,
        );
    };

    beforeEach(() => {
        useEnsNameMock.mockReturnValue({ data: null, isLoading: false } as wagmi.UseEnsNameReturnType);
    });

    afterEach(() => {
        useEnsNameMock.mockReset();
    });

    it('renders connect button when disconnected', () => {
        createTestComponent();
        const button = screen.getByRole('button');
        expect(button).toHaveTextContent('Connect');
    });

    it('renders member avatar when connected', () => {
        const isConnected = true;
        createTestComponent({ isConnected });
        expect(screen.getByTestId('member-avatar-mock')).toBeInTheDocument();
    });

    it('renders user address when connected', () => {
        const isConnected = true;
        const user = {
            address: '0x0987654321098765432109876543210987654321',
        };
        jest.spyOn(wagmi, 'useEnsName').mockReturnValue({
            data: null,
            isLoading: false,
        } as wagmi.UseEnsNameReturnType);

        createTestComponent({ user, isConnected });
        expect(screen.getByText('0x09…4321')).toBeInTheDocument();
    });

    it('renders user name when provided and connected', () => {
        const isConnected = true;
        const user = {
            address: '0x0987654321098765432109876543210987654321',
            name: 'aragon.eth',
        };
        createTestComponent({ user, isConnected });
        expect(screen.getByText('aragon.eth')).toBeInTheDocument();
        expect(screen.queryByText('0x09…4321')).not.toBeInTheDocument();
    });
});
