export type DynamicOptionFunction<TOptionValue> = (value: number) => TOptionValue | undefined;
export type DynamicOption<TOptionValue extends string | number = number> =
    | TOptionValue
    | DynamicOptionFunction<TOptionValue>;

export interface INumberFormat {
    /**
     * Fixed fraction digits to use to format the number.
     */
    fixedFractionDigits?: DynamicOption;
    /**
     * Maximum fraction digits to use to format the number.
     */
    maxFractionDigits?: number;
    /**
     * Maximum number of significant digits displayed.
     */
    maxSignificantDigits?: DynamicOption;
    /**
     * Minumum fraction digits to use to format the number.
     */
    minFractionDigits?: number;
    /**
     * Uses the base symbol (K, M, B, T) when set to true.
     */
    useBaseSymbol?: boolean;
    /**
     * Formats the number as "< $value" when set.
     */
    minDisplayValue?: number;
    /**
     * Format the number with the default currency when set to true.
     */
    isCurrency?: boolean;
    /**
     * Add the sign (-, +) of the number when set to true.
     */
    withSign?: boolean;
    /**
     * Fallback to display in case the value is null.
     */
    fallback?: string;
    /**
     * Displayes the specified fallback when this function returns true, by default the formatter will display
     * the fallback when the value is NaN.
     */
    displayFallback?: (value: number) => boolean;
}

export enum NumberFormat {
    GENERIC_SHORT = 'GENERIC_SHORT',
    GENERIC_LONG = 'GENERIC_LONG',
    FIAT_TOTAL_SHORT = 'FIAT_TOTAL_SHORT',
    FIAT_TOTAL_LONG = 'FIAT_TOTAL_LONG',
    TOKEN_AMOUNT_SHORT = 'TOKEN_AMOUNT_SHORT',
    TOKEN_AMOUNT_LONG = 'TOKEN_AMOUNT_LONG',
    TOKEN_PRICE = 'TOKEN_PRICE',
    // PERCENTAGE_SHORT = 'PERCENTAGE_SHORT',
    // PERCENTAGE_LONG = 'PERCENTAGE_LONG',
}

export const numberFormats: Record<NumberFormat, INumberFormat> = {
    [NumberFormat.GENERIC_SHORT]: {
        maxFractionDigits: 2,
        useBaseSymbol: true,
    },
    [NumberFormat.GENERIC_LONG]: {
        fixedFractionDigits: 0,
    },
    [NumberFormat.FIAT_TOTAL_SHORT]: {
        fixedFractionDigits: 2,
        minDisplayValue: 0.01,
        useBaseSymbol: true,
        isCurrency: true,
    },
    [NumberFormat.FIAT_TOTAL_LONG]: {
        fixedFractionDigits: 2,
        minDisplayValue: 0.01,
        isCurrency: true,
    },
    [NumberFormat.TOKEN_AMOUNT_SHORT]: {
        maxFractionDigits: 2,
        useBaseSymbol: true,
        minDisplayValue: 0.01,
    },
    [NumberFormat.TOKEN_AMOUNT_LONG]: {
        maxFractionDigits: 18,
    },
    [NumberFormat.TOKEN_PRICE]: {
        fixedFractionDigits: (value) => (value >= 1 ? 2 : undefined),
        maxSignificantDigits: (value) => (value < 1 ? 4 : undefined),
        isCurrency: true,
        fallback: 'Unknown',
        displayFallback: (value) => isNaN(value) || value === 0,
    },
};
