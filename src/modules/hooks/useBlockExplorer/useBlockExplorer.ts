import { useCallback } from 'react';
import { useChains, type Config } from 'wagmi';

export enum ChainEntityType {
    ADDRESS = 'address',
    TRANSACTION = 'tx',
    TOKEN = 'token',
}

export interface IUseBlockExplorerParams {
    /**
     * Chains definitions to use for building the block explorer URLs. Defaults to the chains defined on the Wagmi
     * context provider.
     */
    chains?: Config['chains'];
    /**
     * Chain ID to build the URLs for. Defaults to the id of the first chain on the chains list.
     */
    chainId?: number;
}

export interface IBuildEntityUrlParams {
    /**
     * The type of the entity (e.g. address, transaction, token)
     */
    type: ChainEntityType;
    /**
     * The ID of the entity (e.g. transaction hash for a transaction)
     */
    id?: string;
}

export const useBlockExplorer = (params?: IUseBlockExplorerParams) => {
    const { chains, chainId } = params ?? {};

    const globalChains = useChains();
    const processedChains = chains ?? globalChains;

    const chainDefinitions = chainId ? processedChains.find((chain) => chain.id === chainId) : processedChains[0];
    const { default: blockExplorer } = chainDefinitions?.blockExplorers ?? {};

    const buildEntityUrl = useCallback(
        ({ type, id }: IBuildEntityUrlParams) => {
            const baseUrl = blockExplorer?.url;

            return baseUrl != null ? `${baseUrl}/${type}/${id}` : undefined;
        },
        [blockExplorer],
    );

    return { blockExplorer, buildEntityUrl };
};
