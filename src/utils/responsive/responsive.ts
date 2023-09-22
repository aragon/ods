import classNames from 'classnames';
import { type ClassMapKey, type ResponsiveAttribute, type ResponsiveAttributeClassMap } from '../../types';

export class ResponsiveUtilities {
    static generateClassNames<T extends ClassMapKey>(
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
