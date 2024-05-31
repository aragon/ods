import { type QueryClient } from '@tanstack/react-query';
import { render, screen } from '@testing-library/react';
import { OdsModulesProvider } from '../odsModulesProvider';
import { Wallet, type IWalletProps } from './wallet';

jest.mock('../member', () => ({
    MemberAvatar: () => <div data-testid="member-avatar-mock" />,
}));

describe('<Wallet /> component', () => {
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
