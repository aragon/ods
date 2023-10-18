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
        const {
            fixedFractionDigits,
            maxFractionDigits,
            minFractionDigits,
            useBaseSymbol,
            minDisplayValue,
            isCurrency,
            withSign,
        } = numberFormats[format];

        const parsedValue = typeof value === 'number' ? value : parseFloat(value ?? '');

        if (isNaN(parsedValue)) {
            return fallback;
        }

        const cacheKey = `number/${this.numberLocale}/${format}`;

        if (!cache[cacheKey]) {
            cache[cacheKey] = new Intl.NumberFormat(this.numberLocale, {
                style: isCurrency ? 'currency' : undefined,
                currency: isCurrency ? this.currencyLocale : undefined,
                maximumFractionDigits: fixedFractionDigits ?? maxFractionDigits,
                minimumFractionDigits: fixedFractionDigits ?? minFractionDigits,
            });
        }

        const baseRange = this.baseSymbolRanges.find((range) => Math.abs(parsedValue) >= range.value);
        const baseRangeDenominator =
            parsedValue > 1e15 ? 10 ** (this.getDecimalPlaces(parsedValue) - 1) : baseRange?.value ?? 1;

        let processedValue = parsedValue;

        // Set the processedValue to the minDisplayValue (e.g. 0.0012 to 0.01) when the value is not zero and
        // smaller than the minDisplayValue
        const useMinDisplayValue = minDisplayValue != null && parsedValue > 0 && parsedValue < minDisplayValue;

        if (useMinDisplayValue) {
            processedValue = minDisplayValue;
        } else if (useBaseSymbol) {
            processedValue = parsedValue / baseRangeDenominator;
        }

        let formattedValue = cache[cacheKey]!.format(processedValue);

        if (useBaseSymbol && baseRange != null) {
            formattedValue = `${formattedValue}${baseRange.symbol(parsedValue)}`;
        } else if (useMinDisplayValue) {
            formattedValue = `<${formattedValue}`;
        }

        if (!withSign || processedValue < 0) {
            return formattedValue;
        }

        return `+${formattedValue}`;
    };

    private getDecimalPlaces = (value: number) => value.toString().split('.')[0].length;
}

export const formatterUtils = new FormatterUtils();
