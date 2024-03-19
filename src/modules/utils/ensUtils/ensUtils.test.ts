import { ensUtils } from './ensUtils';

describe('ens utils', () => {
    describe('isEnsName', () => {
        it('returns false when value is undefined', () => {
            expect(ensUtils.isEnsName()).toBeFalsy();
        });

        it('returns false when value length is less than 6', () => {
            const value = 'tt.eth';
            expect(ensUtils.isEnsName(value)).toBeFalsy();
        });

        it('returns false when value does not end with .eth', () => {
            const value = 'test.et';
            expect(ensUtils.isEnsName(value)).toBeFalsy();
        });

        it('returns true on valid ens name', () => {
            const value = 'vitalik.eth';
            expect(ensUtils.isEnsName(value)).toBeTruthy();
        });
    });

    describe('truncateEnsName', () => {
        it('returns empty string when ens is not defined', () => {
            expect(ensUtils.truncateEns()).toEqual('');
        });

        it('returns input string when input is not a valid ens name', () => {
            const value = 'test';
            expect(ensUtils.truncateEns(value)).toEqual(value);
        });

        it('does not truncate the ens when its length is less than 9', () => {
            const value = 'dixon.eth';
            expect(ensUtils.truncateEns(value)).toEqual(value);
        });

        it('correctly truncates the ens name', () => {
            const value = 'verylongens.eth';
            const expectedValue = 'veryl…eth';
            expect(ensUtils.truncateEns(value)).toEqual(expectedValue);
        });
    });
});
