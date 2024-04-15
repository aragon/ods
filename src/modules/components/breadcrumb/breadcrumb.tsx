import { Icon, IconType, Link, Tag, type ILinkProps, type ITagProps } from '../../../core';

/**
 * Object representing a path in the breadcrumb.
 */
interface Path extends ILinkProps {
    label: string;
}

/**
 * List of Path objects with a min length of 1 and max length of 3.
 */
export type UpToThreePaths = Path[] & { length: 1 | 2 | 3 };

export interface IBreadcrumbProps {
    /**
     * Array of three Path objects indicating depth from the current position to be displayed in the breadcrumb.
     * Starting at index 0 you must define root, up to the current location as desired.
     */
    pathOrder: UpToThreePaths;
    /**
     * Text to be displayed at the end of the breadcrumb indicating current location in the sitemap.
     */
    currentPage: string;
    /**
     * Optional tag pill to be displayed at the end of the breadcrumb for extra info. @type ITagProps
     */
    tag?: ITagProps;
}

export const Breadcrumb: React.FC<IBreadcrumbProps> = (props) => {
    const { currentPage, pathOrder = [{ href: '/', label: 'Home' }], tag, ...otherProps } = props;

    return (
        <nav aria-label="Breadcrumb" className="flex items-center space-x-2" {...otherProps}>
            <ol className="flex items-center space-x-0.5">
                {pathOrder.map(
                    (path) =>
                        path && (
                            <li key={path.href} className="flex items-center space-x-0.5">
                                <Link href={path.href}>{path.label}</Link>
                                <Icon
                                    icon={IconType.SLASH}
                                    className="ml-0.5 text-neutral-200"
                                    responsiveSize={{ md: 'lg' }}
                                />
                            </li>
                        ),
                )}
                <li
                    aria-current="page"
                    className="whitespace-nowrap text-sm font-normal leading-tight text-neutral-500 md:text-base"
                >
                    {currentPage}
                </li>
            </ol>
            {tag && <Tag {...tag} />}
        </nav>
    );
};
