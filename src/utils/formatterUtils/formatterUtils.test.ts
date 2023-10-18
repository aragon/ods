import { formatterUtils } from './formatterUtils';
import { NumberFormat } from './formatterUtilsDefinitions';

/* Using big values to fully test the formatter */
/* eslint-disable @typescript-eslint/no-loss-of-precision */

describe('formatter utils', () => {
    describe('number formatting', () => {
        test.each([
            { value: 0, result: '0' },
            { value: 123, result: '123' },
            { value: 1234, result: '1,234' },
            { value: 1234567, result: '1,234,567' },
            { value: 1234567890, result: '1,234,567,890' },
            { value: 1234567890123, result: '1,234,567,890,123' },
            { value: 1234567890123456, result: '1,234,567,890,123,456' },
        ])('correctly apply the long generic formatting for value $value', ({ value, result }) => {
            expect(formatterUtils.formatNumber(value, { format: NumberFormat.GENERIC_LONG })).toEqual(result);
        });

        test.each([
            { value: 0, result: '0' },
            { value: 123, result: '123' },
            { value: 1234, result: '1.23K' },
            { value: 1234567, result: '1.23M' },
            { value: 1234567890, result: '1.23B' },
            { value: 1234567890123, result: '1.23T' },
            { value: 1234567890123456, result: '1.23 x 10^15' },
        ])('correctly apply the short generic formatting for value $value', ({ value, result }) => {
            expect(formatterUtils.formatNumber(value, { format: NumberFormat.GENERIC_SHORT })).toEqual(result);
        });

        test.each([
            { value: 0, result: '$0.00' },
            { value: 0.0012345678, result: '<$0.01' },
            { value: 0.012345678, result: '$0.01' },
            { value: 0.12345678, result: '$0.12' },
            { value: 123.45678, result: '$123.46' },
            { value: 1234.56789, result: '$1,234.57' },
            { value: 1234567.89012, result: '$1,234,567.89' },
            { value: 1234567890.12345, result: '$1,234,567,890.12' },
            { value: 1234567890123.45678, result: '$1,234,567,890,123.46' },
            { value: 1234567890123456.78901, result: '$1,234,567,890,123,456.80' },
        ])('correctly apply the long fiat-total formatting for value $value', ({ value, result }) => {
            expect(formatterUtils.formatNumber(value, { format: NumberFormat.FIAT_TOTAL_LONG })).toEqual(result);
        });

        test.each([
            { value: 0, result: '$0.00' },
            { value: 0.0012345678, result: '<$0.01' },
            { value: 0.012345678, result: '$0.01' },
            { value: 0.12345678, result: '$0.12' },
            { value: 123.45678, result: '$123.46' },
            { value: 1234.56789, result: '$1.23K' },
            { value: 1234567.89012, result: '$1.23M' },
            { value: 1234567890.12345, result: '$1.23B' },
            { value: 1234567890123.45678, result: '$1.23T' },
            { value: 1234567890123456.78901, result: '$1.23 x 10^15' },
        ])('correctly apply the short fiat-total formatting for value $value', ({ value, result }) => {
            expect(formatterUtils.formatNumber(value, { format: NumberFormat.FIAT_TOTAL_SHORT })).toEqual(result);
        });
    });
});
