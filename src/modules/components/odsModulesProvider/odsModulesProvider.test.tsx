import { render, screen } from '@testing-library/react';
import type { ReactNode } from 'react';
import { OdsModulesProvider, type IOdsModulesProviderProps } from './odsModulesProvider';

jest.mock('@tanstack/react-query', () => ({
    ...jest.requireActual('@tanstack/react-query'),
    QueryClientProvider: (props: { children: ReactNode }) => (
        <div data-testid="query-client-mock">{props.children}</div>
    ),
}));

jest.mock('wagmi', () => ({
    ...jest.requireActual('@tanstack/react-query'),
    createConfig: jest.fn(),
    WagmiProvider: (props: { children: ReactNode }) => <div data-testid="wagmi-mock">{props.children}</div>,
}));

jest.mock('viem', () => ({ createClient: jest.fn() }));
jest.mock('wagmi/chains', () => ({}));

describe('<OdsModulesProvider /> component', () => {
    const createTestComponent = (props?: Partial<IOdsModulesProviderProps>) => {
        const completeProps = {
            ...props,
        };

        return <OdsModulesProvider {...completeProps} />;
    };

    it('renders the wagmi and react-query providers with default configs', () => {
        const children = 'test-children';
        render(createTestComponent({ children }));
        expect(screen.getByTestId('query-client-mock')).toBeInTheDocument();
        expect(screen.getByTestId('wagmi-mock')).toBeInTheDocument();
        expect(screen.getByText(children)).toBeInTheDocument();
    });
});
