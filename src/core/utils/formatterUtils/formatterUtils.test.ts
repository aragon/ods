import { formatterUtils } from './formatterUtils';
import { DateFormat, NumberFormat } from './formatterUtilsDefinitions';

/* Using big values to fully test the formatter */
/* eslint-disable @typescript-eslint/no-loss-of-precision */

describe('formatter utils', () => {
    describe('number formatting', () => {
        describe('generic amounts', () => {
            test.each([
                { value: -1234, result: '-1,234' },
                { value: -123, result: '-123' },
                { value: 0, result: '0' },
                { value: 123, result: '123' },
                { value: 123, result: '+123', withSign: true },
                { value: 1234, result: '1,234' },
                { value: 1234, result: '+1,234', withSign: true },
                { value: 1234567, result: '1,234,567' },
                { value: 1234567890, result: '1,234,567,890' },
                { value: 1234567890123, result: '1,234,567,890,123' },
                { value: 1234567890123456, result: '1,234,567,890,123,456' },
            ])('formats $value as $result using long format', ({ value, result, ...options }) => {
                expect(formatterUtils.formatNumber(value, { format: NumberFormat.GENERIC_LONG, ...options })).toEqual(
                    result,
                );
            });

            test.each([
                { value: -1234, result: '-1.23K' },
                { value: -123, result: '-123' },
                { value: 0, result: '0' },
                { value: 123, result: '123' },
                { value: 123, result: '+123', withSign: true },
                { value: 1234, result: '1.23K' },
                { value: 1234, result: '+1.23K', withSign: true },
                { value: 1234567, result: '1.23M' },
                { value: 1234567890, result: '1.23B' },
                { value: 1234567890123, result: '1.23T' },
                { value: 1234567890123456, result: '1.23 x 10^15' },
            ])('formats $value as $result using short format', ({ value, result, ...options }) => {
                expect(formatterUtils.formatNumber(value, { format: NumberFormat.GENERIC_SHORT, ...options })).toEqual(
                    result,
                );
            });
        });

        describe('fiat total amounts', () => {
            test.each([
                { value: -1234.56789, result: '-$1,234.57' },
                { value: -0.012345678, result: '-$0.01' },
                { value: -0.0012345678, result: '-$0.001' },
                { value: 0, result: '$0.00' },
                { value: 0.0012345678, result: '$0.001' },
                { value: 0.0012345678, result: '+$0.001', withSign: true },
                { value: 0.012345678, result: '$0.01' },
                { value: 0.012345678, result: '+$0.01', withSign: true },
                { value: 0.12345678, result: '$0.12' },
                { value: 123.45678, result: '$123.46' },
                { value: 1234.56789, result: '$1,234.57' },
                { value: 1234.56789, result: '+$1,234.57', withSign: true },
                { value: 1234567.89012, result: '$1,234,567.89' },
                { value: 1234567890.12345, result: '$1,234,567,890.12' },
                { value: 1234567890123.45678, result: '$1,234,567,890,123.46' },
                { value: 1234567890123456.78901, result: '$1,234,567,890,123,456.80' },
            ])('formats $value as $result using long format', ({ value, result, ...options }) => {
                expect(
                    formatterUtils.formatNumber(value, { format: NumberFormat.FIAT_TOTAL_LONG, ...options }),
                ).toEqual(result);
            });

            test.each([
                { value: -1234.56789, result: '-$1.23K' },
                { value: -0.0012345678, result: '-$0.001' },
                { value: 0, result: '$0.00' },
                { value: 0.0012345678, result: '$0.001' },
                { value: 0.0012345678, result: '+$0.001', withSign: true },
                { value: 0.012345678, result: '$0.01' },
                { value: 0.12345678, result: '$0.12' },
                { value: 123.45678, result: '$123.46' },
                { value: 1234.56789, result: '$1.23K' },
                { value: 1234.56789, result: '+$1.23K', withSign: true },
                { value: 1234567.89012, result: '$1.23M' },
                { value: 1234567890.12345, result: '$1.23B' },
                { value: 1234567890123.45678, result: '$1.23T' },
                { value: 1234567890123456.78901, result: '$1.23 x 10^15' },
            ])('formats $value as $result using short format', ({ value, result, ...options }) => {
                expect(
                    formatterUtils.formatNumber(value, { format: NumberFormat.FIAT_TOTAL_SHORT, ...options }),
                ).toEqual(result);
            });
        });

        describe('token amounts', () => {
            test.each([
                { value: -1234.5678, result: '-1,234.5678' },
                { value: -0.0123456789012345678, result: '-0.012345678901234568' },
                { value: 0, result: '0' },
                { value: 0.0012, result: '0.0012' },
                { value: 0.0012, result: '+0.0012', withSign: true },
                { value: 0.0123456789012345678, result: '0.012345678901234568' },
                { value: 0.12345678901234567, result: '0.12345678901234566' },
                { value: 123.4567, result: '123.4567' },
                { value: 1234, result: '1,234' },
                { value: 1234, result: '+1,234', withSign: true },
                { value: 1234.5678, result: '1,234.5678' },
                { value: 1234567.8901, result: '1,234,567.8901' },
                { value: 1234567890.1234, result: '1,234,567,890.1234' },
                { value: 1234567890123.4567, result: '1,234,567,890,123.4568' },
                { value: 1234567890123456.789, result: '1,234,567,890,123,456.8' },
            ])('formats $value as $result using long format', ({ value, result, ...options }) => {
                expect(
                    formatterUtils.formatNumber(value, { format: NumberFormat.TOKEN_AMOUNT_LONG, ...options }),
                ).toEqual(result);
            });

            test.each([
                { value: -1234, result: '-1.23K' },
                { value: -0.0012, result: '-0.001' },
                { value: 0, result: '0' },
                { value: 0.0012, result: '0.001' },
                { value: 0.0123456789012345678, result: '0.01' },
                { value: 0.12345678901234567, result: '0.12' },
                { value: 123.4567, result: '123.46' },
                { value: 1234, result: '1.23K' },
                { value: 1234.5678, result: '1.23K' },
                { value: 1234567.8901, result: '1.23M' },
                { value: 1234567890.1234, result: '1.23B' },
                { value: 1234567890123.4567, result: '1.23T' },
                { value: 1234567890123456.789, result: '1.23 x 10^15' },
            ])('formats $value as $result using short format', ({ value, result }) => {
                expect(formatterUtils.formatNumber(value, { format: NumberFormat.TOKEN_AMOUNT_SHORT })).toEqual(result);
            });
        });

        describe('token prices', () => {
            test.each([
                { value: -1234.56789, result: '-$1,234.57' },
                { value: -0.0012345678, result: '-$0.001235' },
                { value: 0, result: 'Unknown' },
                { value: 0.0012345678, result: '$0.001235' },
                { value: 0.0012345678, result: '+$0.001235', withSign: true },
                { value: 0.012345678, result: '$0.01235' },
                { value: 0.12345678, result: '$0.1235' },
                { value: 123.45678, result: '$123.46' },
                { value: 1234.56789, result: '$1,234.57' },
                { value: 1234.56789, result: '+$1,234.57', withSign: true },
                { value: 1234567.89012, result: '$1,234,567.89' },
                { value: 1234567890.12345, result: '$1,234,567,890.12' },
                { value: 1234567890123.45678, result: '$1,234,567,890,123.46' },
                { value: 1234567890123456.78901, result: '$1,234,567,890,123,456.80' },
            ])('formats $value as $result using token format', ({ value, result, ...options }) => {
                expect(formatterUtils.formatNumber(value, { format: NumberFormat.TOKEN_PRICE, ...options })).toEqual(
                    result,
                );
            });
        });

        describe('percentages', () => {
            test.each([
                { value: -1, result: '-100.00%' },
                { value: -0.999001, result: '-99.90%' },
                { value: -0.00012345, result: '-0.01%' },
                { value: 0, result: '0.00%' },
                { value: 0, result: '0.00%', withSign: true },
                { value: 0.00012345, result: '0.01%' },
                { value: 0.0012345, result: '0.12%' },
                { value: 0.012345, result: '1.23%' },
                { value: 0.12345, result: '12.35%' },
                { value: 0.12345, result: '+12.35%', withSign: true },
                { value: 0.510001, result: '51.00%' },
                { value: 0.9985, result: '99.85%' },
                { value: 0.999001, result: '99.90%' },
                { value: 1, result: '100.00%' },
            ])('formats $value as $result using long format', ({ value, result, ...options }) => {
                expect(
                    formatterUtils.formatNumber(value, { format: NumberFormat.PERCENTAGE_LONG, ...options }),
                ).toEqual(result);
            });

            test.each([
                { value: -0.999001, result: '-99.9%' },
                { value: -0.12345, result: '-12.3%' },
                { value: -0.00012345, result: '-0.01%' },
                { value: 0, result: '0%' },
                { value: 0.00012345, result: '0.01%' },
                { value: 0.00012345, result: '+0.01%', withSign: true },
                { value: 0.0012345, result: '0.1%' },
                { value: 0.012345, result: '1.2%' },
                { value: 0.12345, result: '12.3%' },
                { value: 0.12345, result: '+12.3%', withSign: true },
                { value: 0.510001, result: '51%' },
                { value: 0.9985, result: '99.9%' },
                { value: 0.999001, result: '99.9%' },
                { value: 0.999001, result: '+99.9%', withSign: true },
                { value: 1, result: '100%' },
            ])('formats $value as $result using short format', ({ value, result, ...options }) => {
                expect(
                    formatterUtils.formatNumber(value, { format: NumberFormat.PERCENTAGE_SHORT, ...options }),
                ).toEqual(result);
            });
        });
    });

    describe.only('date formatting', () => {
        describe('YEAR_MONTH_DAY_TIME format', () => {
            // TODO
        });

        describe('YEAR_MONTH_DAY format', () => {
            test.each([
                { value: '2023-06-17T13:21:24', result: 'June 17, 2023' },
                { value: '2018-01-01T10:11:12', result: 'January 1, 2018' },
            ])('formats $value as $result using YEAR_MONTH_DAY format', ({ value, result }) => {
                expect(formatterUtils.formatDate(value, { format: DateFormat.YEAR_MONTH_DAY })).toEqual(result);
            });

            it('formats to relative calendar when date diff is less or equal than 1', () => {});
        });

        describe('YEAR_MONTH format', () => {
            // TODO
        });

        describe('DURATION format', () => {
            // TODO
        });

        describe('RELATIVE format', () => {
            // TODO
        });
    });
});
