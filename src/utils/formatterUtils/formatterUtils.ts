import { NumberFormat, numberFormats } from './formatterUtilsDefinitions';

export interface IFormatNumberOptions {
    /**
     * Number format to use.
     * @default GENERIC_LONG
     */
    format?: NumberFormat;
    /**
     * Fallback value returned when input value is not set or not valid.
     * @default null
     */
    fallback?: string;
}

const cache: Record<string, Intl.NumberFormat> = {};

class FormatterUtils {
    numberLocale = 'en';
    currencyLocale = 'USD';

    private baseSymbolRanges = [
        { value: 1e15, symbol: (value: number) => ` x 10^${this.getDecimalPlaces(value) - 1}` },
        { value: 1e12, symbol: () => 'T' },
        { value: 1e9, symbol: () => 'B' },
        { value: 1e6, symbol: () => 'M' },
        { value: 1e3, symbol: () => 'K' },
    ];

    formatNumber = (value: number | string | null | undefined, options: IFormatNumberOptions = {}): string | null => {
        const { format = NumberFormat.GENERIC_LONG, fallback = null } = options;
        const { fixedFractionDigits, maxFractionDigits, minFractionDigits, useBaseSymbol, withSign } =
            numberFormats[format];

        const parsedValue = typeof value === 'number' ? value : parseFloat(value ?? '');

        if (isNaN(parsedValue)) {
            return fallback;
        }

        const cacheKey = `number/${this.numberLocale}/${format}`;

        if (!cache[cacheKey]) {
            cache[cacheKey] = new Intl.NumberFormat(this.numberLocale, {
                maximumFractionDigits: fixedFractionDigits ?? maxFractionDigits,
                minimumFractionDigits: fixedFractionDigits ?? minFractionDigits,
            });
        }

        const baseRange = this.baseSymbolRanges.find((range) => Math.abs(parsedValue) >= range.value);
        const baseRangeDenominator =
            parsedValue > 1e15 ? 10 ** (this.getDecimalPlaces(parsedValue) - 1) : baseRange?.value ?? 1;

        const processedValue = useBaseSymbol ? parsedValue / baseRangeDenominator : parsedValue;

        const formattedValue = cache[cacheKey]!.format(processedValue);
        const processedFormattedValue =
            useBaseSymbol && baseRange != null ? `${formattedValue}${baseRange.symbol(parsedValue)}` : formattedValue;

        if (!withSign || parsedValue < 0) {
            return processedFormattedValue;
        }

        return `+${processedFormattedValue}`;
    };

    private getDecimalPlaces = (value: number) => value.toString().split('.')[0].length;
}

export const formatterUtils = new FormatterUtils();
