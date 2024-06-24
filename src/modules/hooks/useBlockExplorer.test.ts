import { renderHook } from '@testing-library/react';
import { useChains } from 'wagmi';
import { useBlockExplorer } from './useBlockExplorer';

jest.mock('wagmi', () => ({
    useChains: jest.fn(),
}));

describe('useBlockExplorer', () => {
    const mockChains = [
        {
            id: 1,
            name: 'Ethereum',
            blockExplorers: { default: { url: 'https://etherscan.io' } },
        },
        {
            id: 137,
            name: 'Polygon',
            blockExplorers: { default: { url: 'https://polygonscan.com' } },
        },
    ];

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('generates correct URL for different entity types and chain IDs', () => {
        (useChains as jest.Mock).mockReturnValue(mockChains);
        const { result } = renderHook(() => useBlockExplorer());
        expect(result.current.getChainEntityUrl({ type: 'address', chainId: 1, id: '0x123' })).toEqual(
            'https://etherscan.io/address/0x123',
        );
        expect(result.current.getChainEntityUrl({ type: 'tx', id: '0xabc', chainId: 137 })).toEqual(
            'https://polygonscan.com/tx/0xabc',
        );
    });

    it('throws an error when chain ID is not found', () => {
        (useChains as jest.Mock).mockReturnValue([]);
        const { result } = renderHook(() => useBlockExplorer());
        expect(() => result.current.getChainEntityUrl({ type: 'address', chainId: 999, id: '0x123' })).toThrow(
            'useBlockExplorer: Chain with id 999 not found',
        );
    });

    it('throws an error when block explorer URL is missing', () => {
        (useChains as jest.Mock).mockReturnValue([{ id: 1, name: 'Ethereum' }]);
        const { result } = renderHook(() => useBlockExplorer());
        expect(() => result.current.getChainEntityUrl({ type: 'address', chainId: 1, id: '0x123' })).toThrow(
            'useBlockExplorer: Block explorer URL not found for network: Ethereum',
        );
    });
});
