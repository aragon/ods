import { type HTMLAttributes } from 'react';
import { type ResponsiveAttribute } from '../../types';

export type ProgressSize = 'sm' | 'md';

export interface IProgressProps extends HTMLAttributes<HTMLDivElement> {
    /**
     * Size of progress component.
     * @default md
     */
    size?: ProgressSize;
    /**
     * Size of the progress depending on the current breakpoint.
     */
    responsiveSize?: ResponsiveAttribute<ProgressSize>;
    /**
     * Current progress to be rendered.
     */
    value: number;
}
