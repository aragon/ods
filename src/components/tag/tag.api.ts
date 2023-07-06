import { type ReactNode } from 'react';

export type TagColorScheme = 'neutral' | 'info' | 'warning' | 'critical' | 'success' | 'primary';

export interface ITagProps {
    /**
     * Defines the color scheme of the tag.
     * @default neutral
     */
    colorScheme?: TagColorScheme;
    /**
     * Children of the component.
     */
    children: ReactNode;
    /**
     * Classes for the component.
     */
    className?: string;
}
