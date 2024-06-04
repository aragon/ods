export type Breakpoint = 'default' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';

/**
 * Size key of a component that is responsive.
 */
export type ResponsiveSizeKey = string | symbol | number;

/**
 * Defines the component property which is responsive.
 */
export type ResponsiveAttribute<TSize> = Partial<Record<Breakpoint, TSize>>;

/**
 * Defines the structure to build the responsive classes for each breakpoint.
 *
 * Example:
 *
 * type ButtonSize = 'big' | 'small';
 * type Breakpoint = 'default' | 'sm' | 'md' | 'lg';
 *
 * const responsiveButtonSizeClassNames: ResponsiveAttributeClassMap<ButtonSize> = {
 *      'big': {
 *          'default': 'w-40',
 *          'sm': 'sm:w-40',
 *          'md': 'md:w-40',
 *          'lg': 'lg:w-40',
 *      },
 *      'small': {
 *          'default': 'w-20',
 *          'sm': 'sm:w-20',
 *          'md': 'md:w-20',
 *          'lg': 'lg-w-20',
 *      }
 * }
 */
export type ResponsiveAttributeClassMap<TSize extends ResponsiveSizeKey> = Record<TSize, Record<Breakpoint, string>>;
