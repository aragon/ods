import { ResponsiveUtilities as utils } from '.';
import { type ResponsiveAttributeClassMap } from '../../types';

type MockAttribute = 'sm' | 'md' | 'lg';
const classes: ResponsiveAttributeClassMap<MockAttribute> = {
    sm: {
        sm: 'w-3 h-3',
        md: 'md:w-3 md:h-3',
        lg: 'lg:w-3 lg:h-3',
    },
    md: {
        sm: 'w-4 h-4',
        md: 'md:w-4 md:h-4',
        lg: 'lg:w-4 lg:h-4',
    },
    lg: {
        sm: 'w-5 h-5',
        md: 'md:w-5 md:h-5',
        lg: 'lg:w-5 lg:h-5',
    },
};

describe("'ResponsiveUtilities.generateClassNames'", () => {
    it('should return default size class when no responsiveSize is provided', () => {
        const result = utils.generateClassNames('sm', {}, classes);
        expect(result).toBe('w-3 h-3');
    });

    it('should override with sm size when provided in responsiveSize', () => {
        const result = utils.generateClassNames('md', { sm: 'sm' }, classes);
        expect(result).toBe('w-3 h-3 md:w-4 md:h-4');
    });

    it('should apply sm and md size when both are provided in responsiveSize', () => {
        const result = utils.generateClassNames('lg', { sm: 'sm', md: 'md' }, classes);
        expect(result).toBe('w-3 h-3 md:w-4 md:h-4 lg:w-5 lg:h-5');
    });

    it('should apply only md size when provided in responsiveSize', () => {
        const result = utils.generateClassNames('sm', { md: 'lg' }, classes);
        expect(result).toBe('w-3 h-3 md:w-5 md:h-5 lg:w-3 lg:h-3');
    });

    it('should apply only lg size when provided in responsiveSize', () => {
        const result = utils.generateClassNames('md', { lg: 'sm' }, classes);
        expect(result).toBe('w-4 h-4 lg:w-3 lg:h-3');
    });

    it('should apply all sizes when provided in responsiveSize', () => {
        const result = utils.generateClassNames('lg', { sm: 'md', md: 'sm', lg: 'lg' }, classes);
        expect(result).toBe('w-4 h-4 md:w-3 md:h-3 lg:w-5 lg:h-5');
    });
});
