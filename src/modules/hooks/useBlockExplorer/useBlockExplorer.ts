import { useCallback } from 'react';
import { useChains, type Config } from 'wagmi';

export enum ChainEntityType {
    ADDRESS = 'address',
    TRANSACTION = 'tx',
    TOKEN = 'token'
} 

interface IChainEntity {
    /**
     * The type of the chain entity (address, tx, token)
     */
    type: ChainEntityType;
    /**
     * The ID of the chain (optional), if not provided, the first chain is used
     */
    chainId?: number;
    /**
     * The ID of the entity (e.g. tx hash for a tx)
     */
    id?: string;
}

export const useBlockExplorer = (wagmiConfig?: Pick<Config, 'chains'>) => {
    const globalChains = useChains();
    const chains = wagmiConfig?.chains ?? globalChains;

    const getChainEntityUrl = useCallback(
        ({ type, chainId, id }: IChainEntity) => {
            const chain = chainId ? chains.find((chain) => chain.id === chainId) : chains[0];
            const baseUrl = chain?.blockExplorers?.default?.url;
            if (!baseUrl) {
                throw new Error(`useBlockExplorer: Block explorer URL not found for chain with id ${chainId}`);
            }

            return `${baseUrl}/${type}/${id}`;
        },
        [chains],
    );

    return { getChainEntityUrl };
};
