import React from 'react';
import { twMerge } from 'tailwind-merge';
import type { ITagProps, TagColorScheme } from './tag.api';

const colorSchemeClass: Record<TagColorScheme, string> = {
    neutral: 'bg-ui-100 text-ui-600',
    info: 'bg-info-200 text-info-800',
    warning: 'bg-warning-200 text-warning-800',
    critical: 'bg-critical-200 text-critical-800',
    success: 'bg-success-200 text-success-800',
    primary: 'bg-primary-100 text-primary-800',
};

export const Tag: React.FC<ITagProps> = (props) => {
    const { children, colorScheme = 'neutral', className } = props;

    const classes = twMerge(
        'flex py-0.1 px-0.5 font-bold text-center rounded ft-text-sm',
        colorSchemeClass[colorScheme],
        className,
    );

    return <div className={classes}>{children}</div>;
};
