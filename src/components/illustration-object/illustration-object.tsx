import type { SVGProps } from 'react';
import { illustrationObjectList } from './illustration-object-list';
import type { IllustrationObjectType } from './illustration-object-type';

export interface IIllustrationObjectProps extends SVGProps<SVGSVGElement> {
    /**
     * Illustration object to render.
     */
    object: IllustrationObjectType;
}

const illustrationObjectSize = 160;

export const IllustrationObject: React.FC<IIllustrationObjectProps> = (props) => {
    const { object, ...otherProps } = props;
    const IllustrationObject = illustrationObjectList[object];

    return <IllustrationObject width={illustrationObjectSize} height={illustrationObjectSize} {...otherProps} />;
};
