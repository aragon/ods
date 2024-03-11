import { addressUtils } from './addressUtils';

describe('address utils', () => {
    describe('truncateAddress', () => {
        it('returns empty string when address is not defined', () => {
            expect(addressUtils.truncateAddress()).toEqual('');
        });

        it('returns input string when input is not a valid address', () => {
            const value = '0x123';
            expect(addressUtils.truncateAddress(value)).toEqual(value);
        });

        it('correctly truncates the address', () => {
            const value = '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045';
            const expectedValue = '0xd8...6045';
            expect(addressUtils.truncateAddress(value)).toEqual(expectedValue);
        });

        it('truncates the address even when not in checksum format', () => {
            const value = '0xe11bfcbdd43745d4aa6f4f18e24ad24f4623af04';
            const expectedValue = '0xe1...af04';
            expect(addressUtils.truncateAddress(value)).toEqual(expectedValue);
        });
    });
});
