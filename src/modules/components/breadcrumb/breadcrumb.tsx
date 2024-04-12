import { Icon, IconType, Link, Tag, type ILinkProps, type ITagProps } from '../../../core';

interface Path extends ILinkProps {
    label: string;
}

export type UpToThreePaths = Path[] & { length: 1 | 2 | 3 };

export interface IBreadcrumbProps {
    /**
     * Array of three Path objects indicating depth from the current position to be displayed in the breadcrumb.
     * Starting at index 0 you must define root, up to the current location.
     */
    pathOrder: UpToThreePaths;
    /**
     * Text to be displayed at the end of the breadcrumb indicating current location in the sitemap.
     */
    currentPage: string;
    /**
     * Optional tag pill to be displayed at the end of the breadcrumb. @type ITagProps
     */
    tag?: ITagProps;
}

export const Breadcrumb: React.FC<IBreadcrumbProps> = (props) => {
    const { currentPage, pathOrder = [{ href: '/', label: 'Home' }], tag, ...otherProps } = props;

    return (
        <nav aria-label="Breadcrumb" className="flex items-center space-x-2" {...otherProps}>
            <ol className="flex items-center">
                {pathOrder.map(
                    (path) =>
                        path && (
                            <li key={path.href} className="flex items-center space-x-0.5">
                                <Link href={path.href}>{path.label}</Link>
                                <Icon
                                    icon={IconType.SLASH}
                                    className="text-neutral-200"
                                    responsiveSize={{ md: 'md' }}
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
