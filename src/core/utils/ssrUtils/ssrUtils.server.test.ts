/**
 * @jest-environment node
 */

import { ssrUtils } from './ssrUtils';

describe('ssr utilities (server)', () => {
    describe('isServer', () => {
        it('returns true when running on server environment', () => {
            expect(ssrUtils.isServer()).toBeTruthy();
        });
    });
});
