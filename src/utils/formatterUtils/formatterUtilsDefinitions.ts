export interface INumberFormat {
    /**
     * Fixed fraction digits to use to format the number.
     */
    fixedFractionDigits?: number;
    /**
     * Maximum fraction digits to use to format the number.
     */
    maxFractionDigits?: number;
    /**
     * Minumum fraction digits to use to format the number.
     */
    minFractionDigits?: number;
    /**
     * Uses the base symbol (K, M, B, T) when set to true.
     */
    useBaseSymbol?: boolean;
    /**
     * Add the sign (-, +) of the number when set to true.
     */
    withSign?: boolean;
}

export enum NumberFormat {
    GENERIC_SHORT = 'GENERIC_SHORT',
    GENERIC_LONG = 'GENERIC_LONG',
    // FIAT_TOTAL_SHORT = 'FIAT_TOTAL_SHORT',
    // FIAT_TOTAL_LONG = 'FIAT_TOTAL_LONG',
    // TOKEN_AMOUNT_SHORT = 'TOKEN_AMOUNT_SHORT',
    // TOKEN_AMOUNT_LONG = 'TOKEN_AMOUNT_LONG',
    // TOKEN_PRICE_SHORT = 'TOKEN_PRICE_SHORT',
    // TOKEN_PRICE_LONG = 'TOKEN_PRICE_LONG',
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
};
