import { invariant, invariantError } from './invariant';

describe('invariant utils', () => {
    it('does not throw error on condition success', () => {
        expect(() => invariant(5 < 10, 'error')).not.toThrow();
    });

    it('throws invariant error on condition error', () => {
        const error = 'oops';
        const expectedError = new Error(error);
        expectedError.name = invariantError;
        expect(() => invariant(5 > 10, error)).toThrow(new Error(error));
    });
});
