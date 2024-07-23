import { renderHook } from '@testing-library/react';
import * as wagmi from 'wagmi';
import { type Chain, mainnet, polygon, sepolia } from 'wagmi/chains';
import { ChainEntityType, useBlockExplorer } from './useBlockExplorer';

describe('useBlockExplorer hook', () => {
    const useChainsSpy = jest.spyOn(wagmi, 'useChains');

    beforeEach(() => {
        useChainsSpy.mockReturnValue([mainnet]);
    });

    afterEach(() => {
        useChainsSpy.mockReset();
    });

    describe('blockExplorer', () => {
        it('returns the block explorer definitions for the given chain id from the specified list of chains', () => {
            const chains: [Chain, ...Chain[]] = [mainnet, polygon, sepolia];
            const chainId = polygon.id;
            const { result } = renderHook(() => useBlockExplorer({ chains, chainId }));
            expect(result.current.blockExplorer).toEqual(polygon.blockExplorers.default);
        });

        it('returns the block explorer definitions for the given chain id from the chains defined on wagmi provider', () => {
            useChainsSpy.mockReturnValue([polygon, sepolia]);
            const chainId = sepolia.id;
            const { result } = renderHook(() => useBlockExplorer({ chainId }));
            expect(result.current.blockExplorer).toEqual(sepolia.blockExplorers.default);
        });

        it('returns the block explorer of the first chain in the chains prop when chainId is not defined', () => {
            const chains: [Chain, ...Chain[]] = [mainnet, sepolia, polygon];
            const { result } = renderHook(() => useBlockExplorer({ chains }));
            expect(result.current.blockExplorer).toEqual(chains[0].blockExplorers?.default);
        });

        it('returns the block explorer of the first chain in the wagmi config when chainId and chains are not defined', () => {
            useChainsSpy.mockReturnValue([sepolia, polygon]);
            const { result } = renderHook(() => useBlockExplorer());
            expect(result.current.blockExplorer).toEqual(sepolia.blockExplorers?.default);
        });

        it('returns the block explorer set to undefined when chain definitions cannot be found for the given chain id', () => {
            const chains: [Chain, ...Chain[]] = [mainnet, polygon];
            const { result } = renderHook(() => useBlockExplorer({ chains, chainId: sepolia.id }));
            expect(result.current.blockExplorer).toBeUndefined();
        });

        it('returns the block explorer set to undefined when related chain definitions does not include info about the block explorer', () => {
            const { blockExplorers, ...mainnetWithoutBlockExplorer } = mainnet;
            useChainsSpy.mockReturnValue([mainnetWithoutBlockExplorer]);
            const { result } = renderHook(() => useBlockExplorer({ chainId: mainnet.id }));
            expect(result.current.blockExplorer).toBeUndefined();
        });
    });

    describe('buildEntityUrl', () => {
        it('generates correct URL for different entity types', () => {
            useChainsSpy.mockReturnValue([mainnet, polygon]);

            const { result } = renderHook(() => useBlockExplorer({ chainId: mainnet.id }));
            const addressUrl = result.current.buildEntityUrl({ type: ChainEntityType.ADDRESS, id: '0x123' });
            expect(addressUrl).toMatch(/address\/0x123/);

            const transactionUrl = result.current.buildEntityUrl({ type: ChainEntityType.TRANSACTION, id: '0xabc' });
            expect(transactionUrl).toMatch(/tx\/0xabc/);
        });

        it('returns undefined when block explorer info is missing', () => {
            useChainsSpy.mockReturnValue([sepolia]);
            const { result } = renderHook(() => useBlockExplorer({ chainId: mainnet.id }));
            expect(result.current.buildEntityUrl({ type: ChainEntityType.ADDRESS, id: '0x123' })).toBeUndefined();
        });
    });
});
