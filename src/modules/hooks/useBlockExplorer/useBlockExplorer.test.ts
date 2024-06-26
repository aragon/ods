import { renderHook } from '@testing-library/react';
import * as wagmi from 'wagmi';
import { mainnet, polygon } from 'wagmi/chains';
import { useBlockExplorer } from './useBlockExplorer';

describe('useBlockExplorer hook', () => {
    it('generates correct URL for different entity types and chain IDs', () => {
        jest.spyOn(wagmi, 'useChains').mockReturnValue([mainnet, polygon]);

        const { result } = renderHook(() => useBlockExplorer());
        expect(result.current.getChainEntityUrl({ type: 'address', chainId: 1, id: '0x123' })).toEqual(
            'https://etherscan.io/address/0x123',
        );
        expect(result.current.getChainEntityUrl({ type: 'tx', id: '0xabc', chainId: 137 })).toEqual(
            'https://polygonscan.com/tx/0xabc',
        );
    });

    it('throws an error when block explorer URL is missing', () => {
        const { blockExplorers, ...chainWithoutBlockExplorer } = mainnet;
        jest.spyOn(wagmi, 'useChains').mockReturnValue([chainWithoutBlockExplorer]);

        const { result } = renderHook(() => useBlockExplorer());
        expect(() => result.current.getChainEntityUrl({ type: 'address', chainId: 1, id: '0x123' })).toThrow(
            'useBlockExplorer: Block explorer URL not found for chain with id 1',
        );
    });
});
