import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createContext, useContext, useMemo, type ReactNode } from 'react';
import { createClient, http } from 'viem';
import { WagmiProvider, createConfig, type Config, type State } from 'wagmi';
import { arbitrum, arbitrumSepolia, base, baseSepolia, mainnet, polygon, polygonAmoy, sepolia } from 'wagmi/chains';
import { OdsCoreProvider, type IOdsCoreProviderProps } from '../../../core';
import { modulesCopy, type ModulesCopy } from '../../assets';

export interface IOdsModulesContext {
    /**
     * Copy for the modules components.
     */
    copy: ModulesCopy;
}

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
     * Optional initial state for Wagmi provider.
     */
    wagmiInitialState?: State;
    /**
     * React-query configurations to be forwarded to the QueryClientProvider, uses the defaults configurations from
     * react-query when not specified (see https://tanstack.com/query/latest/docs/framework/react/guides/important-defaults).
     * @default defaultQueryClient
     */
    queryClient?: QueryClient;
    /**
     * Values for the OdsCoreProvider context.
     * @see IOdsCoreContext
     */
    coreProviderValues?: IOdsCoreProviderProps['values'];
    /**
     * Context provider values.
     */
    values?: Partial<IOdsModulesContext>;
    /**
     * Children of the provider.
     */
    children?: ReactNode;
}

const odsModulesContextDefaults: IOdsModulesContext = {
    copy: modulesCopy,
};

const odsModulesContext = createContext<IOdsModulesContext>(odsModulesContextDefaults);

export const OdsModulesProvider: React.FC<IOdsModulesProviderProps> = (props) => {
    const {
        queryClient = defaultQueryClient,
        wagmiConfig = defaultWagmiConfig,
        wagmiInitialState,
        coreProviderValues,
        children,
        values,
    } = props;

    const contextValues = useMemo(
        () => ({
            copy: values?.copy ?? odsModulesContextDefaults.copy,
        }),
        [values],
    );

    return (
        <odsModulesContext.Provider value={contextValues}>
            <WagmiProvider config={wagmiConfig} initialState={wagmiInitialState}>
                <QueryClientProvider client={queryClient}>
                    <OdsCoreProvider values={coreProviderValues}>{children}</OdsCoreProvider>
                </QueryClientProvider>
            </WagmiProvider>
        </odsModulesContext.Provider>
    );
};

export const useOdsModulesContext = (): IOdsModulesContext => {
    const values = useContext(odsModulesContext);

    return values;
};
