import classNames from 'classnames';
import type { ClassMapKey, ResponsiveAttribute, ResponsiveAttributeClassMap } from '../../types';

class ResponsiveUtils {
    generateClassNames<T extends ClassMapKey>(
        size: T,
        responsiveSize: ResponsiveAttribute<T>,
        classes: ResponsiveAttributeClassMap<T>,
    ): string {
        const defaultSize = classes[size].sm;

        // Override with responsive size if specified.
        const smClass = responsiveSize.sm ? classes[responsiveSize.sm].sm : defaultSize;
        const mdClass = responsiveSize.md ? classes[responsiveSize.md].md : '';
        const lgClass = responsiveSize.lg ? classes[responsiveSize.lg].lg : '';

        return classNames(smClass, mdClass, lgClass);
    }
}

export const responsiveUtils = new ResponsiveUtils();
