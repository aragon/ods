import classNames from 'classnames';
import { type ClassMapKey, type ResponsiveAttribute, type ResponsiveAttributeClassMap } from '../types';

export class ResponsiveUtilities {
    static generateClassNames<T extends ClassMapKey>(
        size: T,
        responsiveSize: ResponsiveAttribute<T>,
        classes: ResponsiveAttributeClassMap<T>,
    ): string {
        // Default to the specified size.
        const smClassDefault = classes[size].sm;
        const mdClassDefault = classes[size].md;
        const lgClassDefault = classes[size].lg;

        // Override with responsive size if specified.
        const smClass = responsiveSize.sm ? classes[responsiveSize.sm].sm : smClassDefault;
        const mdClass = responsiveSize.md ? classes[responsiveSize.md].md : responsiveSize.sm ? mdClassDefault : '';
        const lgClass = responsiveSize.lg ? classes[responsiveSize.lg].lg : responsiveSize.md ? lgClassDefault : '';

        return classNames(smClass, mdClass, lgClass);
    }
}
