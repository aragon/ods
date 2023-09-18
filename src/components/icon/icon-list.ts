import { type SVGProps } from 'react';
import Add from '../../assets/icons/add.svg';
import Checkmark from '../../assets/icons/checkmark.svg';
import FavouriteDefault from '../../assets/icons/favourite-default.svg';
import FavouriteSelected from '../../assets/icons/favourite-selected.svg';
import Filter from '../../assets/icons/filter.svg';
import Remove from '../../assets/icons/remove.svg';
import { IconType } from './icon-type';

type IconComponent = React.FC<SVGProps<SVGSVGElement>>;

export const iconList: Record<IconType, IconComponent> = {
    [IconType.ADD]: Add,
    [IconType.CHECKMARK]: Checkmark,
    [IconType.FAVOURITE_DEFAULT]: FavouriteDefault,
    [IconType.FAVOURITE_SELECTED]: FavouriteSelected,
    [IconType.FILTER]: Filter,
    [IconType.REMOVE]: Remove,
};
