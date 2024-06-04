import type { SVGProps } from 'react';
import { illustrationObjectList } from './illustrationObjectList';
import type { IllustrationObjectType } from './illustrationObjectType';

export interface IIllustrationObjectProps extends SVGProps<SVGSVGElement> {
    /**
     * Illustration object to render.
     */
    object: IllustrationObjectType;
}

export const IllustrationObject: React.FC<IIllustrationObjectProps> = (props) => {
    const { object, ...otherProps } = props;
    const IllustrationObject = illustrationObjectList[object];

    return <IllustrationObject data-testid={object} {...otherProps} />;
};
