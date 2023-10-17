import { formatterUtils } from './formatterUtils';
import { NumberFormat } from './formatterUtilsDefinitions';

describe('formatter utils', () => {
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
});
