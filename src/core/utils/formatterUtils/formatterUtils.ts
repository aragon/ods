import { NumberFormat, numberFormats, type DynamicOption } from './formatterUtilsDefinitions';

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
            maxSignificantDigits,
            useBaseSymbol,
            minDisplayValue,
            maxDisplayValue,
            isCurrency,
            isPercentage,
            fallback: fallbackFormat,
            displayFallback,
        } = numberFormats[format];

        const parsedValue = typeof value === 'number' ? value : parseFloat(value ?? '');

        if (Boolean(displayFallback?.(parsedValue)) || isNaN(parsedValue)) {
            return fallbackFormat ?? fallback;
        }

        const fixedFractionDigitsOption = this.getDynamicOption(parsedValue, fixedFractionDigits);
        const maxSignificantDigitsOption = this.getDynamicOption(parsedValue, maxSignificantDigits);

        const maxDigits = maxSignificantDigitsOption
            ? this.significantDigitsToFractionDigits(parsedValue, maxSignificantDigitsOption)
            : fixedFractionDigitsOption ?? maxFractionDigits;

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

        const baseRange = this.baseSymbolRanges.find((range) => Math.abs(parsedValue) >= range.value);
        const baseRangeDenominator =
            parsedValue > 1e15 ? 10 ** (this.getDecimalPlaces(parsedValue) - 1) : baseRange?.value ?? 1;

        let processedValue = isPercentage ? parsedValue * 100 : parsedValue;

        // Set the processedValue to the minDisplayValue (e.g. 0.0012 to 0.01) or maxDisplayValue (e.g. 99.99 to 99.9)
        // when the value is not zero / 100 and smaller / higher than the minDisplayValue / maxDisplayValue
        const useMinDisplayValue = minDisplayValue != null && processedValue > 0 && processedValue < minDisplayValue;
        const useMaxDisplayValue = maxDisplayValue != null && processedValue < 100 && processedValue > maxDisplayValue;

        if (useMinDisplayValue) {
            processedValue = minDisplayValue;
        } else if (useMaxDisplayValue) {
            processedValue = maxDisplayValue;
        } else if (useBaseSymbol) {
            processedValue = parsedValue / baseRangeDenominator;
        }

        let formattedValue = cache[cacheKey]!.format(processedValue);

        if (useBaseSymbol && baseRange != null) {
            formattedValue = `${formattedValue}${baseRange.symbol(parsedValue)}`;
        } else if (useMinDisplayValue) {
            formattedValue = `<${formattedValue}`;
        } else if (useMaxDisplayValue) {
            formattedValue = `>${formattedValue}`;
        }

        if (isPercentage) {
            return `${formattedValue}%`;
        }

        return formattedValue;
    };

    private getDynamicOption = <TOptionValue extends string | number = number>(
        value: number,
        option?: DynamicOption<TOptionValue>,
    ): TOptionValue | undefined => (typeof option === 'function' ? option(value) : option);

    private getDecimalPlaces = (value: number) => value.toString().split('.')[0].length;

    private significantDigitsToFractionDigits = (value: number, digits: number) =>
        value === 0 ? 0 : Math.floor(digits - Math.log10(value));
}

export const formatterUtils = new FormatterUtils();
