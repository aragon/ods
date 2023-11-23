import { type HTMLAttributes } from 'react';

interface IFallbackAvatarProps extends HTMLAttributes<HTMLDivElement> {}

export const FallbackAvatar: React.FC<IFallbackAvatarProps> = ({ children, ...props }) => {
    return <div {...props}>{children}</div>;
};
