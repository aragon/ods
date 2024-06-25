import { type IOdsCoreCopy } from './IOdsCoreCopy';

export const odsLocales = ['en', 'zh', 'hi', 'es', 'ar', 'bn', 'fr', 'ru', 'pt', 'ur'] as const;

export const odsDefaultLocale = 'en';

export const odsLocalizedCopy: Record<(typeof odsLocales)[number], IOdsCoreCopy> = {
    en: {
        inputOptionalLabel: 'Optional',
    },
    zh: {
        inputOptionalLabel: '可选的',
    },
    hi: {
        inputOptionalLabel: 'वैकल्पिक',
    },
    es: {
        inputOptionalLabel: 'Opcional',
    },
    ar: {
        inputOptionalLabel: 'اختياري',
    },
    bn: {
        inputOptionalLabel: 'ঐচ্ছিক',
    },
    fr: {
        inputOptionalLabel: 'Optionnel',
    },
    ru: {
        inputOptionalLabel: 'Необязательно',
    },
    pt: {
        inputOptionalLabel: 'Opcional',
    },
    ur: {
        inputOptionalLabel: 'اختیاری',
    },
};

export const getCopyForLocale = (locale: string): IOdsCoreCopy => {
    return odsLocalizedCopy[locale as (typeof odsLocales)[number]] || odsLocalizedCopy[odsDefaultLocale];
};
