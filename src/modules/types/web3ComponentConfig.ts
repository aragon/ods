import type { Config } from 'wagmi';

/**
 * Properties for components making RPC requests.
 */
export interface IWeb3ComponentProps {
    /**
     * ID of the chain to use when making RPC requests. Defaults to the first chain set on the Wagmi config.
     * (@see https://github.com/wevm/wagmi/blob/main/packages/core/src/createConfig.ts#L193C23-L193C31)
     */
    chainId?: number;
    /**
     * Custom Wagmi configurations to use instead of retrieving it from the closest WagmiProvider.
     */
    wagmiConfig?: Config;
}
