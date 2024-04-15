import { Icon, IconType } from '../icon';
import { Link, type ILinkProps } from '../link';
import { Tag, type ITagProps } from '../tag';

/**
 * Object representing a sequential segment in the Breadcrumbs path.
 */
interface Breadcrumb extends ILinkProps {
    label: string;
}

/**
 * List sizing of Breadcrumb objects with a min length of 1 and max length of 3.
 */
export type UpToThreeCrumbs = Breadcrumb[] & { length: 1 | 2 | 3 };

export interface IBreadcrumbsProps {
    /**
     * Array of three Breadcrumb objects {href: string, label: string}
     * The array indicates depth from the current position to be displayed in the Breadcrumbs.
     * Starting at index 0 you must define the root, up to the current location as desired.
     */
    breadcrumbOrder: UpToThreeCrumbs;
    /**
     * Text to be displayed at the end of the Breadcrumbs indicating current location in the sitemap.
     */
    currentPage: string;
    /**
     * Optional tag pill to be displayed at the end of the Breadcrumbs for extra info. @type ITagProps
     */
    tag?: ITagProps;
}

export const Breadcrumbs: React.FC<IBreadcrumbsProps> = (props) => {
    const { currentPage, breadcrumbOrder, tag, ...otherProps } = props;

    return (
        <nav aria-label="Breadcrumb" className="flex items-center space-x-2" {...otherProps}>
            <ol className="flex items-center space-x-0.5">
                {breadcrumbOrder.map(
                    (breadcrumb) =>
                        breadcrumb && (
                            <li key={breadcrumb.href} className="flex items-center space-x-0.5 whitespace-nowrap">
                                <Link href={breadcrumb.href}>{breadcrumb.label}</Link>
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
