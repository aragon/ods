import { NumberFormat, numberFormats, type DynamicOption, type INumberFormat } from './formatterUtilsDefinitions';

export interface IFormatNumberOptions extends INumberFormat {
    /**
     * Number format to use.
     * @default GENERIC_LONG
     */
    format?: NumberFormat;
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

        const fixedFractionDigitsOption = this.getDynamicOption(parsedValue, fixedFractionDigits);
        const maxSignificantDigitsOption = this.getDynamicOption(parsedValue, maxSignificantDigits);

        const maxDigitsFallback = fixedFractionDigitsOption ?? maxFractionDigits;
        const maxDigits = maxSignificantDigitsOption
            ? this.significantDigitsToFractionDigits(parsedValue, maxSignificantDigitsOption, maxDigitsFallback)
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

        const baseRange = this.baseSymbolRanges.find((range) => Math.abs(parsedValue) >= range.value);
        const baseRangeDenominator =
            parsedValue > 1e15 ? 10 ** (this.getDecimalPlaces(parsedValue) - 1) : baseRange?.value ?? 1;

        let processedValue = isPercentage ? parsedValue * 100 : parsedValue;

        if (useBaseSymbol) {
            processedValue = parsedValue / baseRangeDenominator;
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

    private getDynamicOption = <TOptionValue extends string | number = number>(
        value: number,
        option?: DynamicOption<TOptionValue>,
    ): TOptionValue | undefined => (typeof option === 'function' ? option(value) : option);

    private getDecimalPlaces = (value: number) => value.toString().split('.')[0].length;

    private significantDigitsToFractionDigits = (value: number, digits: number, fallback?: number) =>
        value === 0 ? fallback : Math.floor(digits - Math.log10(Math.abs(value)));
}

export const formatterUtils = new FormatterUtils();
