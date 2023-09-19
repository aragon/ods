import resolveConfig from 'tailwindcss/resolveConfig';

import tailwindConfig from '../../../tailwind.config';

export function getSpacing() {
    return Object.entries(resolveConfig(tailwindConfig).theme?.spacing ?? {})
        .map(([key, value]) => {
            const parsedKey = parseFloat(key);
            const pxSize = Number.isNaN(parsedKey) ? 1 : 4 * parsedKey;
            const remSize = Number.isNaN(parsedKey) ? 1 : pxToRem(pxSize);
            return { key, px: pxSize, rem: remSize, value: value as string };
        })
        .sort((a, b) => a.px - b.px);
}

function pxToRem(px: number, baseSize = 16) {
    return px / baseSize;
}
