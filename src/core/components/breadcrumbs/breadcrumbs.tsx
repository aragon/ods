import { Icon, IconType } from '../icon';
import { Link } from '../link';
import { Tag, type ITagProps } from '../tag';

/**
 * Object representing a sequential segment in the Breadcrumbs path.
 */
interface IBreadcrumbsLink {
    label: string;
    href?: string;
}

export interface IBreadcrumbsProps {
    /**
     * Array of BreadcrumbsLink objects {label: string, href?: string}
     * The array indicates depth from the current position to be displayed in the Breadcrumbs.
     * Starting at index 0 you must define the root up to the current location.
     * The final index which will render as non-active and without separator.
     */
    breadcrumbsOrder: IBreadcrumbsLink[];
    /**
     * Optional tag pill to be displayed at the end of the Breadcrumbs for extra info. @type ITagProps
     */
    tag?: ITagProps;
}

export const Breadcrumbs: React.FC<IBreadcrumbsProps> = ({ breadcrumbsOrder, tag, ...otherProps }) => {
    const currentPage = breadcrumbsOrder[breadcrumbsOrder.length - 1];
    const pathLinks = breadcrumbsOrder.slice(0, -1);

    return (
        <nav aria-label="Breadcrumbs" className="flex items-center gap-x-2" {...otherProps}>
            <ol className="flex items-center gap-x-0.5">
                {pathLinks.map((breadcrumb) => (
                    <li key={breadcrumb.href} className="flex items-center gap-x-1 whitespace-nowrap">
                        <Link href={breadcrumb.href}>{breadcrumb.label}</Link>
                        <Icon icon={IconType.SLASH} className="text-neutral-200" responsiveSize={{ md: 'lg' }} />
                    </li>
                ))}
                <li aria-current="page" className="text-sm font-normal leading-tight text-neutral-500 md:text-base">
                    {currentPage.label}
                </li>
            </ol>
            {tag && <Tag {...tag} />}
        </nav>
    );
};
