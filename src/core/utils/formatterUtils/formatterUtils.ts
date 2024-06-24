import { DateTime, type DurationUnit } from 'luxon';
import {
    DateFormat,
    NumberFormat,
    dateFormats,
    numberFormats,
    type DynamicOption,
    type INumberFormat,
} from './formatterUtilsDefinitions';

export interface IFormatNumberOptions extends INumberFormat {
    /**
     * Number format to use.
     * @default GENERIC_LONG
     */
    format?: NumberFormat;
}

export interface IFormatDateOptions {
    /**
     * Date format to use.
     * @default YEAR_MONTH_DAY_TIME
     */
    format?: DateFormat;
}

const cache: Record<string, Intl.NumberFormat> = {};

class FormatterUtils {
    numberLocale = 'en';
    dateLocale = 'en';
    currencyLocale = 'USD';

    private baseSymbolRanges = [
        { value: 1e15, symbol: (value: number) => ` x 10^${this.getDecimalPlaces(value) - 1}` },
        { value: 1e12, symbol: () => 'T' },
        { value: 1e9, symbol: () => 'B' },
        { value: 1e6, symbol: () => 'M' },
        { value: 1e3, symbol: () => 'K' },
    ];

    private relativeDateOrder: DurationUnit[] = ['years', 'months', 'days', 'hours', 'minutes', 'seconds'];

    formatNumber = (value: number | string | null | undefined, options: IFormatNumberOptions = {}): string | null => {
        const { format = NumberFormat.GENERIC_LONG, ...otherOptions } = options;
        const mergedOptions = { ...numberFormats[format], ...otherOptions };
        const {
            fixedFractionDigits,
            maxFractionDigits,
            minFractionDigits,
            maxSignificantDigits,
            useBaseSymbol,
            isCurrency,
            isPercentage,
            withSign,
            fallback = null,
            displayFallback,
        } = mergedOptions;

        const parsedValue = typeof value === 'number' ? value : parseFloat(value ?? '');

        if (Boolean(displayFallback?.(parsedValue)) || isNaN(parsedValue)) {
            return fallback;
        }

        let processedValue = isPercentage ? parsedValue * 100 : parsedValue;

        const fixedFractionDigitsOption = this.getDynamicOption(processedValue, fixedFractionDigits);
        const maxSignificantDigitsOption = this.getDynamicOption(processedValue, maxSignificantDigits);

        const maxDigitsFallback = fixedFractionDigitsOption ?? maxFractionDigits;
        const maxDigits = maxSignificantDigitsOption
            ? this.significantDigitsToFractionDigits(processedValue, maxSignificantDigitsOption, maxDigitsFallback)
            : maxDigitsFallback;

        const minDigits = fixedFractionDigitsOption ?? minFractionDigits;

        const cacheKey = `number/${this.numberLocale}/${this.currencyLocale}/${isCurrency ?? '-'}/${maxDigits ?? '-'}/${
            minDigits ?? '-'
        }`;

        if (!cache[cacheKey]) {
            cache[cacheKey] = new Intl.NumberFormat(this.numberLocale, {
                style: isCurrency ? 'currency' : undefined,
                currency: isCurrency ? this.currencyLocale : undefined,
                maximumFractionDigits: maxDigits,
                minimumFractionDigits: minDigits,
            });
        }

        const baseRange = this.baseSymbolRanges.find((range) => Math.abs(processedValue) >= range.value);
        const baseRangeDenominator =
            processedValue > 1e15 ? 10 ** (this.getDecimalPlaces(processedValue) - 1) : baseRange?.value ?? 1;

        if (useBaseSymbol) {
            processedValue = processedValue / baseRangeDenominator;
        }

        let formattedValue = cache[cacheKey]!.format(processedValue);

        if (withSign && processedValue > 0) {
            formattedValue = `+${formattedValue}`;
        }

        if (useBaseSymbol && baseRange != null) {
            formattedValue = `${formattedValue}${baseRange.symbol(parsedValue)}`;
        }

        if (isPercentage) {
            return `${formattedValue}%`;
        }

        return formattedValue;
    };

    formatDate = (value: DateTime | number | string | undefined, options: IFormatDateOptions = {}) => {
        const { format = DateFormat.YEAR_MONTH_DAY_TIME } = options;
        const dateFormat = dateFormats[format];

        if (value == null) {
            return null;
        }

        const dateObject =
            typeof value === 'string'
                ? DateTime.fromISO(value)
                : typeof value === 'number'
                  ? DateTime.fromMillis(this.isMillisTimestamp(value) ? value : value * 1000)
                  : value;

        // Use relative calendar date if date to format is yesterday, today or tomorrow
        const useRelativeCalendar = Math.abs(dateObject.diffNow('days').days) <= 1;

        if (format === DateFormat.DURATION) {
            const fullDateDiff = dateObject.diffNow(this.relativeDateOrder);
            const dateUnit = this.relativeDateOrder.find((unit) => Math.abs(fullDateDiff.get(unit)) > 0);

            return dateObject.diffNow(dateUnit).toHuman();
        }

        if (useRelativeCalendar) {
            // TODO: add time for YEAR_MONTH_DAY_TIME format
            return dateObject.toRelativeCalendar({ locale: this.dateLocale });
        }

        if (format === DateFormat.RELATIVE) {
            return dateObject.toRelative({ locale: this.dateLocale });
        }

        return dateObject.toLocaleString({ ...dateFormat, hourCycle: 'h23' }, { locale: this.dateLocale });
    };

    private isMillisTimestamp = (value?: number | string): boolean =>
        typeof value === 'number' && value.toString().length > 32;

    private getDynamicOption = <TOptionValue extends string | number = number>(
        value: number,
        option?: DynamicOption<TOptionValue>,
    ): TOptionValue | undefined => (typeof option === 'function' ? option(value) : option);

    private getDecimalPlaces = (value: number) => value.toString().split('.')[0].length;

    private significantDigitsToFractionDigits = (value: number, digits: number, fallback?: number) =>
        value === 0 ? fallback : Math.floor(digits - Math.log10(Math.abs(value)));
}

export const formatterUtils = new FormatterUtils();
