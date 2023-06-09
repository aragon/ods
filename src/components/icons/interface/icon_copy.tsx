import React from 'react';
import { type IconType } from '..';

export const IconCopy: IconType = ({ height = 16, width = 16, ...props }) => {
    return (
        <svg width={width} height={height} fill="none" viewBox="0 0 16 16" {...props}>
            <path
                opacity="0.3"
                d="M6.49996 12.9999C4.93796 12.9999 3.66663 11.7286 3.66663 10.1666V3.33328H2.49996C1.48863 3.33328 0.666626 4.15528 0.666626 5.16661V14.1666C0.666626 15.1779 1.48863 15.9999 2.49996 15.9999H10.8333C11.8446 15.9999 12.6666 15.1779 12.6666 14.1666V12.9999H6.49996Z"
                fill="currentColor"
            />
            <path
                d="M15.3333 1.83333C15.3333 0.820667 14.5126 0 13.5 0H6.49996C5.48729 0 4.66663 0.820667 4.66663 1.83333V10.1667C4.66663 11.1793 5.48729 12 6.49996 12H13.5C14.5126 12 15.3333 11.1793 15.3333 10.1667V1.83333Z"
                fill="currentColor"
            />
        </svg>
    );
};
