import { ReactNode } from 'react';

export type TagColorScheme = 'neutral' | 'info' | 'warning' | 'critical' | 'success' | 'primary';

export type TagProps = {
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
};
