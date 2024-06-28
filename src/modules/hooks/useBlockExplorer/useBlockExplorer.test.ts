import { renderHook } from '@testing-library/react';
import * as wagmi from 'wagmi';
import { mainnet, polygon } from 'wagmi/chains';
import { ChainEntityType, useBlockExplorer } from './useBlockExplorer';

describe('useBlockExplorer hook', () => {
    const useChainsSpy = jest.spyOn(wagmi, 'useChains');

    afterEach(() => {
        useChainsSpy.mockReset();
    });

    it('generates correct URL for different entity types and chain IDs', () => {
        useChainsSpy.mockReturnValue([mainnet, polygon]);

        const { result } = renderHook(() => useBlockExplorer());
        expect(result.current.getChainEntityUrl({ type: ChainEntityType.ADDRESS, chainId: 1, id: '0x123' })).toEqual(
            'https://etherscan.io/address/0x123',
        );
        expect(
            result.current.getChainEntityUrl({ type: ChainEntityType.TRANSACTION, id: '0xabc', chainId: 137 }),
        ).toEqual('https://polygonscan.com/tx/0xabc');
    });

    it('throws an error when block explorer URL is missing', () => {
        const { blockExplorers, ...chainWithoutBlockExplorer } = mainnet;
        useChainsSpy.mockReturnValue([chainWithoutBlockExplorer]);

        const { result } = renderHook(() => useBlockExplorer());
        expect(() =>
            result.current.getChainEntityUrl({ type: ChainEntityType.ADDRESS, chainId: 1, id: '0x123' }),
        ).toThrow('useBlockExplorer: Block explorer URL not found for chain with id 1');
    });

    it('uses the first chain set on the wagmi provider when chainId property is not set', () => {
        useChainsSpy.mockReturnValue([mainnet, polygon]);

        const { result } = renderHook(() => useBlockExplorer());
        expect(result.current.getChainEntityUrl({ type: ChainEntityType.ADDRESS, id: '0x123' })).toEqual(
            'https://etherscan.io/address/0x123',
        );
    });

    it('uses the first chain passed as parameters when chainId is not defined', () => {
        const { result } = renderHook(() => useBlockExplorer({ chains: [polygon, mainnet] }));
        expect(result.current.getChainEntityUrl({ type: ChainEntityType.ADDRESS, id: '0x123' })).toEqual(
            'https://polygonscan.com/address/0x123',
        );
    });
});
