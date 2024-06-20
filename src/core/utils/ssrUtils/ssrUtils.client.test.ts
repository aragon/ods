import { ssrUtils } from './ssrUtils';

describe('ssr utilities (client)', () => {
    describe('isServer', () => {
        it('returns false when running on client environment', () => {
            expect(ssrUtils.isServer()).toBeFalsy();
        });
    });
});
