import { ensUtils } from './ensUtils';

describe('ens utils', () => {
    describe('isEnsName', () => {
        it('returns false when value is undefined', () => {
            expect(ensUtils.isEnsName(undefined)).toBeFalsy();
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
});
