import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type { ReactNode } from 'react';
import { createClient, http } from 'viem';
import { WagmiProvider, createConfig, type Config } from 'wagmi';
import { arbitrum, arbitrumSepolia, base, baseSepolia, mainnet, polygon, polygonAmoy, sepolia } from 'wagmi/chains';

const defaultWagmiConfig = createConfig({
    chains: [mainnet, sepolia, base, baseSepolia, polygon, polygonAmoy, arbitrum, arbitrumSepolia],
    client: ({ chain }) => createClient({ chain, transport: http() }),
});

const defaultQueryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 2 * 60 * 1000, // 2 minutes
            gcTime: 5 * 60 * 1000, // 5 minutes
        },
    },
});

export interface IOdsModulesProviderProps {
    /**
     * Wagmi configurations to be forwarded to the WagmiProvider. The default configurations support some basic chains
     * (ethereum, base, polygon, arbitrum) and their related testnets and uses open RPC endpoints, @see defaultWagmiConfig
     * @default defaultWagmiConfig
     */
    wagmiConfig?: Config;
    /**
     * React-query configurations to be forwarded to the QueryClientProvider, uses the defaults configurations from
     * react-query when not specified (see https://tanstack.com/query/latest/docs/framework/react/guides/important-defaults).
     * @default defaultQueryClient
     */
    queryClient?: QueryClient;
    /**
     * Children of the provider.
     */
    children?: ReactNode;
}

export const OdsModulesProvider: React.FC<IOdsModulesProviderProps> = (props) => {
    const { children, queryClient = defaultQueryClient, wagmiConfig = defaultWagmiConfig } = props;

    return (
        <WagmiProvider config={wagmiConfig}>
            <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
        </WagmiProvider>
    );
};
