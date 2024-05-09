/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{jsx,ts,tsx,mdx}', './docs/**/*.{jsx,tsx,mdx}', '.storybook/*.{jsx,tsx}'],
    theme: {
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
            transparent: 'var(--ods-color-transparent)',
        },
        spacing: {
            0: 'var(--ods-space-0)', // 0px
            0.25: 'var(--ods-space-0-25)', // 1px
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
        ringWidth: {
            DEFAULT: '3px',
        },
        ringColor: {
            primary: 'var(--ods-color-primary-200)',
            success: 'var(--ods-color-success-200)',
            warning: 'var(--ods-color-warning-200)',
            critical: 'var(--ods-color-critical-200)',
        },
        ringOffsetWidth: {
            DEFAULT: '2px',
        },
        borderRadius: {
            DEFAULT: 'var(--ods-border-rounded)',
            lg: 'var(--ods-border-rounded-lg)',
            xl: 'var(--ods-border-rounded-xl)',
            '2xl': 'var(--ods-border-rounded-2xl)',
            '3xl': 'var(--ods-border-rounded-3xl)',
            full: 'var(--ods-border-rounded-full)',
            none: 'var(--ods-border-rounded-none)',
        },
        boxShadow: {
            'neutral-sm': 'var(--ods-shadow-neutral-sm)',
            neutral: 'var(--ods-shadow-neutral)',
            'neutral-md': 'var(--ods-shadow-neutral-md)',
            'neutral-ld': 'var(--ods-shadow-neutral-lg)',
            'neutral-xl': 'var(--ods-shadow-neutral-xl)',
            'neutral-2xl': 'var(--ods-shadow-neutral-2xl)',

            'primary-sm': 'var(--ods-shadow-primary-sm)',
            primary: 'var(--ods-shadow-primary)',
            'primary-md': 'var(--ods-shadow-primary-md)',
            'primary-lg': 'var(--ods-shadow-primary-lg)',
            'primary-xl': 'var(--ods-shadow-primary-xl)',
            'primary-2xl': 'var(--ods-shadow-primary-2xl)',

            'success-sm': 'var(--ods-shadow-success-sm)',
            success: 'var(--ods-shadow-success)',
            'success-md': 'var(--ods-shadow-success-md)',
            'success-lg': 'var(--ods-shadow-success-lg)',
            'success-xl': 'var(--ods-shadow-success-xl)',
            'success-2xl': 'var(--ods-shadow-success-2xl)',

            'warning-sm': 'var(--ods-shadow-warning-sm)',
            warning: 'var(--ods-shadow-warning)',
            'warning-md': 'var(--ods-shadow-warning-md)',
            'warning-lg': 'var(--ods-shadow-warning-lg)',
            'warning-xl': 'var(--ods-shadow-warning-xl)',
            'warning-2xl': 'var(--ods-shadow-warning-2xl)',

            'critical-sm': 'var(--ods-shadow-critical-sm)',
            critical: 'var(--ods-shadow-critical)',
            'critical-md': 'var(--ods-shadow-critical-md)',
            'critical-lg': 'var(--ods-shadow-critical-lg)',
            'critical-xl': 'var(--ods-shadow-critical-xl)',
            'critical-2xl': 'var(--ods-shadow-critical-2xl)',

            'info-sm': 'var(--ods-shadow-info-sm)',
            info: 'var(--ods-shadow-info)',
            'info-md': 'var(--ods-shadow-info-md)',
            'info-lg': 'var(--ods-shadow-info-lg)',
            'info-xl': 'var(--ods-shadow-info-xl)',
            'info-2xl': 'var(--ods-shadow-info-2xl)',

            none: 'var(--ods-shadow-none)',
        },
        screens: {
            sm: '640px',
            md: '786px',
            lg: '1024px',
            xl: '1280px',
            '2xl': '1536px',
        },
        fontFamily: {
            sans: [`var(--ods-font-family)`],
        },
        fontSize: {
            xs: 'var(--ods-font-size-xs)',
            sm: 'var(--ods-font-size-sm)',
            base: 'var(--ods-font-size-base)',
            lg: 'var(--ods-font-size-lg)',
            xl: 'var(--ods-font-size-xl)',
            '2xl': 'var(--ods-font-size-2xl)',
            '3xl': 'var(--ods-font-size-3xl)',
            '4xl': 'var(--ods-font-size-4xl)',
            '5xl': 'var(--ods-font-size-5xl)',
        },
        fontWeight: {
            normal: 'var(--ods-font-weight-normal)',
            semibold: 'var(--ods-font-weight-semibold)',
        },
        lineHeight: {
            normal: 'var(--ods-line-height-normal)',
            tight: 'var(--ods-line-height-tight)',
            relaxed: 'var(--ods-line-height-relaxed)',
        },
        extend: {
            animation: {
                shake: 'shake 0.82s cubic-bezier(0.36,0.07,0.19,0.97) both',
            },
            keyframes: {
                shake: {
                    '10%, 90%': {
                        transform: 'translate3d(-1px, 0, 0)',
                    },
                    '20%, 80%': {
                        transform: 'translate3d(2px, 0, 0)',
                    },
                    '30%, 50%, 70%': {
                        transform: 'translate3d(-4px, 0, 0)',
                    },
                    '40%, 60%': {
                        transform: 'translate3d(4px, 0, 0)',
                    },
                },
            },
            backgroundImage: {
                'modal-overlay': 'linear-gradient(180deg, rgba(245, 247, 250, 0) 0%, #F5F7FA 100%)',
                'modal-header': 'linear-gradient(180deg, #F5F7FA 0%, rgba(245, 247, 250, 0) 100%)',
                'modal-footer': 'linear-gradient(180deg, rgba(245, 247, 250, 0) 0%, #F5F7FA 100%)',
            },
            typography: ({ theme }) => ({
                DEFAULT: {
                    css: {
                        '--tw-prose-body': theme('colors.neutral.500'),
                        '--tw-prose-headings': theme('colors.neutral.800'),
                        '--tw-prose-lead': theme('colors.neutral.600'),
                        '--tw-prose-links': theme('colors.primary.400'),

                        color: theme('colors.neutral.500'),
                        maxWidth: 'none',

                        h1: {
                            marginTop: theme('spacing.2'),
                            marginBottom: theme('spacing.10'),
                            fontSize: theme('fontSize.2xl'),
                            '@screen md': {
                                fontSize: theme('fontSize.3xl'),
                            },
                        },
                        h2: {
                            marginTop: theme('spacing.2'),
                            marginBottom: theme('spacing.8'),
                            fontSize: theme('fontSize.xl'),
                            '@screen md': {
                                fontSize: theme('fontSize.2xl'),
                            },
                        },
                        h3: {
                            marginTop: theme('spacing.2'),
                            marginBottom: theme('spacing.6'),
                            fontSize: theme('fontSize.lg'),
                            '@screen md': {
                                fontSize: theme('fontSize.xl'),
                            },
                        },
                        h4: {
                            marginBottom: theme('spacing.4'),
                            fontSize: theme('fontSize.base'),
                            '@screen md': {
                                fontSize: theme('fontSize.lg'),
                            },
                        },
                        h5: {
                            marginBottom: theme('spacing.2'),
                            fontSize: theme('fontSize.sm'),
                            '@screen md': {
                                fontSize: theme('fontSize.base'),
                            },
                        },
                        h6: {
                            marginBottom: theme('spacing.1'),
                            fontSize: theme('fontSize.xs'),
                            '@screen md': {
                                fontSize: theme('fontSize.sm'),
                            },
                        },
                        p: {
                            fontSize: theme('fontSize.base'),
                            '@screen md': {
                                fontSize: theme('fontSize.lg'),
                            },
                        },
                        a: {
                            color: theme('colors.primary.400'),
                            textDecoration: 'none',
                            '&:hover': {
                                color: theme('colors.primary.600'),
                            },
                            '&:active': {
                                color: theme('colors.primary.800'),
                            },
                        },
                        strong: {
                            fontSize: theme('fontSize.base'),
                            '@screen md': {
                                fontSize: theme('fontSize.lg'),
                            },
                            color: theme('colors.neutral.500'),
                        },
                        em: {
                            fontSize: theme('fontSize.base'),
                            '@screen md': {
                                fontSize: theme('fontSize.lg'),
                            },
                            color: theme('colors.neutral.500'),
                        },
                        blockquote: {
                            borderRadius: theme('borderRadius.lg'),
                            border: `1px solid ${theme('colors.neutral.200')}`,
                            backgroundColor: theme('colors.neutral.50'),
                            padding: theme('spacing.10'),
                            boxShadow: theme('boxShadow.md'),
                        },
                        pre: {
                            borderRadius: theme('borderRadius.lg'),
                            backgroundColor: theme('colors.neutral.900'),
                            color: theme('colors.neutral.50'),
                        },
                        code: {
                            backgroundColor: theme('colors.neutral.900'),
                            color: theme('colors.neutral.50'),
                            padding: theme('spacing.1'),
                            'border-radius': '0.25rem',
                        },
                        'code::before': {
                            content: '""',
                            'padding-left': '0.25rem',
                        },
                        'code::after': {
                            content: '""',
                            'padding-right': '0.25rem',
                        },
                        img: {
                            overflow: 'hidden',
                            borderRadius: theme('borderRadius.xl'),
                            boxShadow: theme('boxShadow.md'),
                        },
                        video: {
                            overflow: 'hidden',
                            borderRadius: theme('borderRadius.xl'),
                            boxShadow: theme('boxShadow.md'),
                        },
                        hr: {
                            marginTop: theme('spacing.10'),
                            borderColor: theme('colors.neutral.200'),
                        },
                    },
                },
            }),
        },
    },
    plugins: [
        require('@tailwindcss/typography'),
        require('tailwindcss/plugin')(({ addVariant }) => {
            addVariant('search-cancel', '&::-webkit-search-cancel-button');
            addVariant('calendar-icon', ['&::-webkit-calendar-picker-indicator', '&::-webkit-inner-spin-button']);
            addVariant('spin-buttons', ['&::-webkit-inner-spin-button', '&::-webkit-outer-spin-button']);
        }),
    ],
};
