import { forwardRef, type ComponentPropsWithoutRef } from 'react';
import { useOdsCoreContext } from '../../odsCoreProvider';

export interface IAvatarBaseProps extends ComponentPropsWithoutRef<'img'> {}

export const AvatarBase = forwardRef<HTMLImageElement, IAvatarBaseProps>((props, ref) => {
    const { Img } = useOdsCoreContext();

    return <Img ref={ref} {...props} />;
});

AvatarBase.displayName = 'AvatarBase';
