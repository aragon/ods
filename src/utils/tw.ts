import resolveConfig from 'tailwindcss/resolveConfig';

import tailwindConfig from '../../tailwind.config';

type Color = { shade: number; value: string };

export class TailwindUtilities {
    /**
     * Retrieves and processes spacing values from the provided Tailwind CSS configuration.
     * The function computes the pixel (px) and relative (rem) sizes based on the given configuration.
     * It then returns a sorted list of these computed values.
     */
    public static getSpacingConfig() {
        return Object.entries(resolveConfig(tailwindConfig).theme?.spacing ?? {})
            .map(([key, value]) => {
                const parsedKey = parseFloat(key);
                const pxSize = Number.isNaN(parsedKey) ? 1 : 4 * parsedKey;
                const remSize = Number.isNaN(parsedKey) ? 1 : this.pxToRem(pxSize);
                return { key, px: pxSize, rem: remSize, value: value as string };
            })
            .sort((a, b) => a.px - b.px);
    }

    /**
     * Converts a pixel value to its equivalent in rem units.
     *
     * @param {number} px - The size in pixels to convert.
     * @param {number} [baseSize=16] - The base size for conversion.
     * @returns {number} - The converted value in rem units.
     */
    public static pxToRem(px: number, baseSize = 16) {
        return px / baseSize;
    }

    /**
     * Fetches the available colors from the DOM for the provided color group.
     *
     * @param {string} colorGroupName - Name of the color group.
     * @returns {Color[]} Array of available colors.
     */
    public static getColorConfig(colorGroupName: string): Color[] {
        const shades = [0, 50, 100, 200, 300, 400, 500, 600, 700, 800, 900];
        const rootStyles = getComputedStyle(document.documentElement);

        return shades
            .map((shade) => ({ shade, value: rootStyles.getPropertyValue(`--ods-color-${colorGroupName}-${shade}`) }))
            .filter((shade) => shade.value.trim() !== '');
    }
}
