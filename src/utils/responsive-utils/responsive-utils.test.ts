import { type ResponsiveAttribute, type ResponsiveAttributeClassMap } from '../../types';
import { responsiveUtils } from './responsive-utils';

type MockAttribute = 'sm' | 'md' | 'lg';
type TestCase = {
    size: MockAttribute;
    responsiveSize: ResponsiveAttribute<MockAttribute>;
    expected: string;
};

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

describe('ResponsiveUtilities', () => {
    describe('generateClassNames', () => {
        const testCases: TestCase[] = [
            { size: 'sm', responsiveSize: {}, expected: 'w-3 h-3' },
            { size: 'sm', responsiveSize: { md: 'md' }, expected: 'w-3 h-3 md:w-4 md:h-4' },
            { size: 'sm', responsiveSize: { lg: 'lg' }, expected: 'w-3 h-3 lg:w-5 lg:h-5' },
            { size: 'sm', responsiveSize: { md: 'md', lg: 'lg' }, expected: 'w-3 h-3 md:w-4 md:h-4 lg:w-5 lg:h-5' },
            { size: 'md', responsiveSize: {}, expected: 'w-4 h-4' },
            { size: 'md', responsiveSize: { sm: 'sm' }, expected: 'w-3 h-3' },
            { size: 'md', responsiveSize: { lg: 'lg' }, expected: 'w-4 h-4 lg:w-5 lg:h-5' },
            { size: 'md', responsiveSize: { sm: 'sm', lg: 'lg' }, expected: 'w-3 h-3 lg:w-5 lg:h-5' },
            { size: 'lg', responsiveSize: {}, expected: 'w-5 h-5' },
            { size: 'lg', responsiveSize: { sm: 'sm' }, expected: 'w-3 h-3' },
            { size: 'lg', responsiveSize: { md: 'md' }, expected: 'w-5 h-5 md:w-4 md:h-4' },
            { size: 'lg', responsiveSize: { sm: 'sm', md: 'md' }, expected: 'w-3 h-3 md:w-4 md:h-4' },
        ];

        testCases.forEach((test) => {
            it(`should return "${test.expected}" for size "${test.size}" with responsiveSize ${JSON.stringify(
                test.responsiveSize,
            )}`, () => {
                const result = responsiveUtils.generateClassNames(
                    test.size as MockAttribute,
                    test.responsiveSize,
                    classes,
                );
                expect(result).toBe(test.expected);
            });
        });
    });
});
