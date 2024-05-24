import { forwardRef, type ComponentPropsWithoutRef } from 'react';
import { useOdsCoreContext } from '../../odsCoreProvider';

export interface ILinkBaseProps extends ComponentPropsWithoutRef<'a'> {}

export const LinkBase = forwardRef<HTMLAnchorElement, ILinkBaseProps>((props, ref) => {
    const { Link } = useOdsCoreContext();

    return <Link ref={ref} {...props} />;
});

LinkBase.displayName = 'LinkBase';
