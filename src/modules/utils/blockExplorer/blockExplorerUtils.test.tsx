import { type Chain } from 'viem/chains';
import { blockExplorerUtils } from './blockExplorerUtils';

describe('BlockExplorerUtils', () => {
    let network: Chain;

    beforeEach(() => {
        network = {
            name: 'test',
            blockExplorers: {
                default: {
                    url: 'http://test.com',
                },
            },
        } as Chain;
    });

    describe('getAddressUrl', () => {
        it('returns the correct URL', () => {
            const address = '0x123';
            expect(blockExplorerUtils.getAddressUrl(address, network)).toEqual('http://test.com/address/0x123');
        });

        it('throws an error when the network does not have a block explorer URL', () => {
            delete network.blockExplorers;
            const address = '0x123';
            expect(() => blockExplorerUtils.getAddressUrl(address, network)).toThrowError(
                'Block explorer URL not found for network: test',
            );
        });
    });

    describe('getTransactionUrl', () => {
        it('returns the correct URL', () => {
            const transaction = '0x123';
            expect(blockExplorerUtils.getTransactionUrl(transaction, network)).toEqual('http://test.com/tx/0x123');
        });

        it('throws an error when the network does not have a block explorer URL', () => {
            delete network.blockExplorers;
            const transaction = '0x123';
            expect(() => blockExplorerUtils.getTransactionUrl(transaction, network)).toThrowError(
                'Block explorer URL not found for network: test',
            );
        });
    });

    describe('getTokenUrl', () => {
        it('returns the correct URL', () => {
            const token = '0x123';
            expect(blockExplorerUtils.getTokenUrl(token, network)).toEqual('http://test.com/token/0x123');
        });

        it('throws an error when the network does not have a block explorer URL', () => {
            delete network.blockExplorers;
            const token = '0x123';
            expect(() => blockExplorerUtils.getTokenUrl(token, network)).toThrowError(
                'Block explorer URL not found for network: test',
            );
        });
    });
});
