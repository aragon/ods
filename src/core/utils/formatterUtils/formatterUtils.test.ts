import { Settings } from 'luxon';
import { formatterUtils } from './formatterUtils';
import { DateFormat, NumberFormat } from './formatterUtilsDefinitions';

/* Using big values to fully test the formatter */
/* eslint-disable @typescript-eslint/no-loss-of-precision */

describe('formatter utils', () => {
    const originalNow = Settings.now;

    afterEach(() => {
        Settings.now = originalNow;
        Settings.defaultZone = 'utc';
    });

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
        const setTime = (now?: string) => {
            Settings.now = () => (now != null ? new Date(now) : new Date()).valueOf();
        };

        describe('YEAR_MONTH_DAY_TIME format', () => {
            // TODO
        });

        describe.only('YEAR_MONTH_DAY format', () => {
            test.each([
                { value: '2023-06-17T13:21:24', result: 'June 17, 2023' },
                { value: '2018-01-01T10:11:12', result: 'January 1, 2018' },
                { value: '2001-05-21T20:10:52', result: 'tomorrow', now: '2001-05-20T05:05:00' },
                { value: '2001-05-20T23:55:59', result: 'today', now: '2001-05-20T05:05:00' },
                { value: '2001-05-21T00:00:05', result: 'tomorrow', now: '2001-05-20T05:05:00' },
                { value: '2001-05-19T22:05:01', result: 'yesterday', now: '2001-05-20T05:05:00' },
                { value: '2001-05-18T23:05:01', result: 'May 18, 2001', now: '2001-05-20T05:05:00' },
                { value: '2001-05-22T00:00:01', result: 'May 22, 2001', now: '2001-05-20T05:05:00' },
            ])('formats $value as $result using YEAR_MONTH_DAY format (now: $now)', ({ now, value, result }) => {
                setTime(now);
                expect(formatterUtils.formatDate(value, { format: DateFormat.YEAR_MONTH_DAY })).toEqual(result);
            });
        });

        describe('YEAR_MONTH format', () => {
            test.each([
                { value: '2024-08-11T11:11:00', result: 'August 2024' },
                { value: '2012-10-01T10:01:10', result: 'October 2012' },
                { value: '2027-01-01T09:05:10', result: 'January 2027', now: '2027-01-01T09:05:10' },
            ])('formats $value as $result using YEAR_MONTH format (now: $now)', ({ value, result, now }) => {
                setTime(now);
                expect(formatterUtils.formatDate(value, { format: DateFormat.YEAR_MONTH })).toEqual(result);
            });
        });

        describe('DURATION format', () => {
            test.each([
                { value: '2000-02-10T11:11:48', result: '7 second', now: '2000-02-10T11:11:55' },
                // { value: '2000-02-10T11:11:48', result: '1 second', now: '2000-02-10T11:11:48' },
            ])('formats $value as $result using DURATION format (now: $now)', ({ value, result, now }) => {
                setTime(now);
                expect(formatterUtils.formatDate(value, { format: DateFormat.DURATION })).toEqual(result);
            });
        });

        describe('RELATIVE format', () => {
            // TODO
        });
    });
});
