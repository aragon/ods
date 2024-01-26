import { type HTMLAttributes } from 'react';

export interface IProgressProps extends HTMLAttributes<HTMLDivElement> {
    /**
     * Size of progress component.
     * @default md
     */
    size?: 'md' | 'sm';
    /**
     * Current progress to be rendered.
     */
    value: number;
}
