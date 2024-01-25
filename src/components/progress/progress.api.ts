import { type HTMLAttributes } from 'react';

export interface IProgressProps extends HTMLAttributes<HTMLDivElement> {
    /**
     * Visual variant.
     * @default md
     */
    variant?: 'md' | 'sm';
    /**
     * Current progress to be rendered.
     */
    value: number;
}
