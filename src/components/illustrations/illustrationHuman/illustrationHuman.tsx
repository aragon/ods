import classNames from 'classnames';
import type { HTMLAttributes } from 'react';
import {
    illustrationHumanAccessoryList,
    illustrationHumanBodyList,
    illustrationHumanExpressionList,
    illustrationHumanHairsList,
    illustrationHumanSunglassesList,
} from './illustrationHumanList';
import type {
    IllustrationHumanAccessory,
    IllustrationHumanBody,
    IllustrationHumanExpression,
    IllustrationHumanHairs,
    IllustrationHumanSunglasses,
} from './illustrationHumanType';

export interface IIllustrationHumanProps extends HTMLAttributes<HTMLDivElement> {
    /**
     * Body of the illustration human.
     */
    body: IllustrationHumanBody;
    /**
     * Expression of the illustration human.
     */
    expression: IllustrationHumanExpression;
    /**
     * Hairs of the illustration human.
     */
    hairs?: IllustrationHumanHairs;
    /**
     * Sunglasses of the illustration human.
     */
    sunglasses?: IllustrationHumanSunglasses;
    /**
     * Accessory of the illustration human.
     */
    accessory?: IllustrationHumanAccessory;
}

export const IllustrationHuman: React.FC<IIllustrationHumanProps> = (props) => {
    const { body, expression, hairs, sunglasses, accessory, className, style, ...otherProps } = props;

    const Body = illustrationHumanBodyList[body];
    const Expression = illustrationHumanExpressionList[expression];

    const Hairs = hairs ? illustrationHumanHairsList[hairs] : undefined;
    const Sunglasses = sunglasses ? illustrationHumanSunglassesList[sunglasses] : undefined;
    const Accessory = accessory ? illustrationHumanAccessoryList[accessory] : undefined;

    const computedStyle = { width: '100%', height: '100%', ...style };
    const commonProps = { className: 'absolute top-0 right-0' };

    return (
        <div className={classNames('relative', className)} style={computedStyle} {...otherProps}>
            <Body />
            <Expression {...commonProps} />
            {Hairs && <Hairs {...commonProps} />}
            {Sunglasses && <Sunglasses {...commonProps} />}
            {Accessory && <Accessory {...commonProps} />}
        </div>
    );
};
