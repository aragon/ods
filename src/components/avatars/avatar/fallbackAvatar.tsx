import { type HTMLAttributes } from 'react';

interface IFallbackAvatarProps extends HTMLAttributes<HTMLDivElement> {}

export const FallbackAvatar: React.FC<IFallbackAvatarProps> = ({ children, ...props }) => {
    return (
        <div data-testid="fallbackAvatar" {...props}>
            {children}
        </div>
    );
};

FallbackAvatar.displayName = 'FallbackAvatar';
