import { useCallback } from 'react';
import { useChains } from 'wagmi';

type ChainEntityType = 'address' | 'tx' | 'token';

interface IChainEntity {
    type: ChainEntityType;
    chainId?: number;
    id: string;
}

export const useBlockExplorer = () => {
    const chains = useChains();

    const getChainEntityUrl = useCallback(
        ({ type, chainId, id }: IChainEntity) => {
            const chain = chainId ? chains.find((chain) => chain.id === chainId) : chains[0];
            if (!chain) {
                throw new Error(`useBlockExplorer: Chain with id ${chainId} not found`);
            }
            const baseUrl = chain.blockExplorers?.default?.url;
            if (!baseUrl) {
                throw new Error(`useBlockExplorer: Block explorer URL not found for network: ${chain.name}`);
            }

            return `${baseUrl}/${type}/${id}`;
        },
        [chains],
    );

    return { getChainEntityUrl };
};
