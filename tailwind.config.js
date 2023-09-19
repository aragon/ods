/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{jsx,tsx,mdx}', './docs/**/*.{jsx,tsx,mdx}', '.storybook/*.{jsx,tsx}'],
    theme: {
        extend: {
            colors: {
                primary: {
                    50: 'var(--ods-color-primary-50)',
                    100: 'var(--ods-color-primary-100)',
                    200: 'var(--ods-color-primary-200)',
                    300: 'var(--ods-color-primary-300)',
                    400: 'var(--ods-color-primary-400)',
                    500: 'var(--ods-color-primary-500)',
                    600: 'var(--ods-color-primary-600)',
                    700: 'var(--ods-color-primary-700)',
                    800: 'var(--ods-color-primary-800)',
                    900: 'var(--ods-color-primary-900)',
                },
                neutral: {
                    0: 'var(--ods-color-neutral-0)',
                    50: 'var(--ods-color-neutral-50)',
                    100: 'var(--ods-color-neutral-100)',
                    200: 'var(--ods-color-neutral-200)',
                    300: 'var(--ods-color-neutral-300)',
                    400: 'var(--ods-color-neutral-400)',
                    500: 'var(--ods-color-neutral-500)',
                    600: 'var(--ods-color-neutral-600)',
                    700: 'var(--ods-color-neutral-700)',
                    800: 'var(--ods-color-neutral-800)',
                    900: 'var(--ods-color-neutral-900)',
                },
                info: {
                    100: 'var(--ods-color-info-100)',
                    200: 'var(--ods-color-info-200)',
                    300: 'var(--ods-color-info-300)',
                    400: 'var(--ods-color-info-400)',
                    500: 'var(--ods-color-info-500)',
                    600: 'var(--ods-color-info-600)',
                    700: 'var(--ods-color-info-700)',
                    800: 'var(--ods-color-info-800)',
                    900: 'var(--ods-color-info-900)',
                },
                success: {
                    100: 'var(--ods-color-success-100)',
                    200: 'var(--ods-color-success-200)',
                    300: 'var(--ods-color-success-300)',
                    400: 'var(--ods-color-success-400)',
                    500: 'var(--ods-color-success-500)',
                    600: 'var(--ods-color-success-600)',
                    700: 'var(--ods-color-success-700)',
                    800: 'var(--ods-color-success-800)',
                    900: 'var(--ods-color-success-900)',
                },
                warning: {
                    100: 'var(--ods-color-warning-100)',
                    200: 'var(--ods-color-warning-200)',
                    300: 'var(--ods-color-warning-300)',
                    400: 'var(--ods-color-warning-400)',
                    500: 'var(--ods-color-warning-500)',
                    600: 'var(--ods-color-warning-600)',
                    700: 'var(--ods-color-warning-700)',
                    800: 'var(--ods-color-warning-800)',
                    900: 'var(--ods-color-warning-900)',
                },
                critical: {
                    100: 'var(--ods-color-critical-100)',
                    200: 'var(--ods-color-critical-200)',
                    300: 'var(--ods-color-critical-300)',
                    400: 'var(--ods-color-critical-400)',
                    500: 'var(--ods-color-critical-500)',
                    600: 'var(--ods-color-critical-600)',
                    700: 'var(--ods-color-critical-700)',
                    800: 'var(--ods-color-critical-800)',
                    900: 'var(--ods-color-critical-900)',
                },
            },
            spacing: {
                0.5: 'var(--ods-space-0-5)', // 2px
                1: 'var(--ods-space-base)', // 4px
                1.5: 'var(--ods-space-1-5)', // 6px
                2: 'var(--ods-space-2)', // 8px
                2.5: 'var(--ods-space-2-5)', // 10px
                3: 'var(--ods-space-3)', // 12px
                3.5: 'var(--ods-space-3-5)', // 14px
                4: 'var(--ods-space-4)', // 16px
                5: 'var(--ods-space-5)', // 20px
                6: 'var(--ods-space-6)', // 24px
                7: 'var(--ods-space-7)', // 28px
                8: 'var(--ods-space-8)', // 32px
                9: 'var(--ods-space-9)', // 36px
                10: 'var(--ods-space-10)', // 40px
                11: 'var(--ods-space-11)', // 44px
                12: 'var(--ods-space-12)', // 48px
                14: 'var(--ods-space-14)', // 56px
                16: 'var(--ods-space-16)', // 64px
                20: 'var(--ods-space-20)', // 80px
                24: 'var(--ods-space-24)', // 96px
                28: 'var(--ods-space-28)', // 112px
                32: 'var(--ods-space-32)', // 128px
                36: 'var(--ods-space-36)', // 144px
                40: 'var(--ods-space-40)', // 160px
                44: 'var(--ods-space-44)', // 176px
                48: 'var(--ods-space-48)', // 192px
                52: 'var(--ods-space-52)', // 208px
                56: 'var(--ods-space-56)', // 224px
                60: 'var(--ods-space-60)', // 240px
                64: 'var(--ods-space-64)', // 256px
                72: 'var(--ods-space-72)', // 288px
                80: 'var(--ods-space-80)', // 320px
                96: 'var(--ods-space-96)', // 384px
            },

            boxShadow: {
                sm: 'var(--ods-shadow-sm)',
                DEFAULT: 'var(--ods-shadow)',
                md: 'var(--ods-shadow-md)',
                lg: 'var(--ods-shadow-lg)',
                xl: 'var(--ods-shadow-xl)',
                '2xl': 'var(--ods-shadow-2xl)',
            },
        },
        borderRadius: {
            DEFAULT: 4,
            lg: 8,
            xl: 12,
            '2xl': 16,
            '3xl': 24,
            full: 9999,
        },
        fontWeight: {
            normal: 500,
            semibold: 600,
            bold: 700,
        },
        screens: {
            sm: 'var(--ods-breakpoint-sm)',
            md: 'var(--ods-breakpoint-md)',
            lg: 'var(--ods-breakpoint-lg)',
            xl: 'var(--ods-breakpoint-xl)',
            '2xl': 'var(--ods-breakpoint-2xl)',
        },
        fontFamily: {
            sans: ['Manrope'],
        },

        fontSize: {
            xs: ['0.64rem', 1.5],
            sm: ['0.8rem', 1.5],
            base: ['1rem', 1.5],
            lg: ['1.25rem', 1.5],
            xl: ['1.563rem', 1.2],
            '2xl': ['1.953rem', 1.2],
            '3xl': ['2.441rem', 1.2],
            '4xl': ['3.052rem', 1.2],
            '5xl': ['3.185rem', 1.2],
        },
    },
};
