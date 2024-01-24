import type { AnchorHTMLAttributes } from 'react';
import { type IconType } from '../icon';

export type LinkVariant = 'primary' | 'neutral';

export interface ILinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
    /**
     * Variant of the link.
     */
    variant?: LinkVariant;
    /**
     * Icon displayed on the right side of the link. Accepts any icon from src/components/icon/iconList.ts.
     */
    iconRight?: IconType;
    /**
     * Whether the link is disabled.
     */

    disabled?: boolean;
    /**
     * Whether the link is external (opens in a new tab).
     */
    external?: boolean;
    /**
     * The label or text content of the link. The only required prop
     */
    label: string;
    /**
     * Optional description text.
     */
    description?: string;
}
