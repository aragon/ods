import { type SVGProps } from 'react';
import AppCommunity from '../../assets/icons/app-community.svg';
import AppDashboard from '../../assets/icons/app-dashboard.svg';
import AppFinance from '../../assets/icons/app-finance.svg';
import AppGovernance from '../../assets/icons/app-governance.svg';
import Blockchain from '../../assets/icons/blockchain.svg';
import Calendar from '../../assets/icons/calendar.svg';
import CheckboxIndeterminate from '../../assets/icons/checkbox-indeterminate.svg';
import CheckboxSelected from '../../assets/icons/checkbox-selected.svg';
import Checkbox from '../../assets/icons/checkbox.svg';
import Checkmark from '../../assets/icons/checkmark.svg';
import ChevronDown from '../../assets/icons/chevron-down.svg';
import ChevronLeft from '../../assets/icons/chevron-left.svg';
import ChevronRight from '../../assets/icons/chevron-right.svg';
import ChevronUp from '../../assets/icons/chevron-up.svg';
import Clock from '../../assets/icons/clock.svg';
import Close from '../../assets/icons/close.svg';
import Copy from '../../assets/icons/copy.svg';
import Deposit from '../../assets/icons/deposit.svg';
import DotsHorizontal from '../../assets/icons/dots-horizontal.svg';
import DotsVertical from '../../assets/icons/dots-vertical.svg';
import Expand from '../../assets/icons/expand.svg';
import Explore from '../../assets/icons/explore.svg';
import FavoriteSelected from '../../assets/icons/favorite-selected.svg';
import Favorite from '../../assets/icons/favorite.svg';
import Feedback from '../../assets/icons/feedback.svg';
import Filter from '../../assets/icons/filter.svg';
import Flag from '../../assets/icons/flag.svg';
import GasFee from '../../assets/icons/gas-fee.svg';
import Help from '../../assets/icons/help.svg';
import Home from '../../assets/icons/home.svg';
import Info from '../../assets/icons/info.svg';
import LinkExternal from '../../assets/icons/link-external.svg';
import Logout from '../../assets/icons/logout.svg';
import Menu from '../../assets/icons/menu.svg';
import Minus from '../../assets/icons/minus.svg';
import Person from '../../assets/icons/person.svg';
import Plus from '../../assets/icons/plus.svg';
import RadioSelected from '../../assets/icons/radio-selected.svg';
import Radio from '../../assets/icons/radio.svg';
import Reload from '../../assets/icons/reload.svg';
import Remove from '../../assets/icons/remove.svg';
import Search from '../../assets/icons/search.svg';
import Settings from '../../assets/icons/settings.svg';
import Shrink from '../../assets/icons/shrink.svg';
import SortAsc from '../../assets/icons/sort-asc.svg';
import SortDesc from '../../assets/icons/sort-desc.svg';
import Success from '../../assets/icons/success.svg';
import Switch from '../../assets/icons/switch.svg';
import TxSmartContract from '../../assets/icons/tx-smart-contract.svg';
import Update from '../../assets/icons/update.svg';
import Warning from '../../assets/icons/warning.svg';
import Withdraw from '../../assets/icons/withdraw.svg';
import WysiwygBold from '../../assets/icons/wysiwyg-bold.svg';
import WysiwygItalic from '../../assets/icons/wysiwyg-italic.svg';
import WysiwygLinkSet from '../../assets/icons/wysiwyg-link-set.svg';
import WysiwygLinkUnset from '../../assets/icons/wysiwyg-link-unset.svg';
import WysiwygListOrdered from '../../assets/icons/wysiwyg-list-ordered.svg';
import WysiwygListUnordered from '../../assets/icons/wysiwyg-list-unordered.svg';
import { IconType } from './iconType';

type IconComponent = React.FC<SVGProps<SVGSVGElement>>;

export const iconList: Record<IconType, IconComponent> = {
    [IconType.APP_COMMUNITY]: AppCommunity,
    [IconType.APP_DASHBOARD]: AppDashboard,
    [IconType.APP_FINANCE]: AppFinance,
    [IconType.APP_GOVERNANCE]: AppGovernance,
    [IconType.BLOCKCHAIN]: Blockchain,
    [IconType.CALENDAR]: Calendar,
    [IconType.CHECKBOX]: Checkbox,
    [IconType.CHECKBOX_INDETERMINATE]: CheckboxIndeterminate,
    [IconType.CHECKBOX_SELECTED]: CheckboxSelected,
    [IconType.CHECKMARK]: Checkmark,
    [IconType.CHEVRON_DOWN]: ChevronDown,
    [IconType.CHEVRON_LEFT]: ChevronLeft,
    [IconType.CHEVRON_RIGHT]: ChevronRight,
    [IconType.CHEVRON_UP]: ChevronUp,
    [IconType.CLOCK]: Clock,
    [IconType.CLOSE]: Close,
    [IconType.COPY]: Copy,
    [IconType.DEPOSIT]: Deposit,
    [IconType.DOTS_HORIZONTAL]: DotsHorizontal,
    [IconType.DOTS_VERTICAL]: DotsVertical,
    [IconType.EXPAND]: Expand,
    [IconType.EXPLORE]: Explore,
    [IconType.FAVORITE]: Favorite,
    [IconType.FAVORITE_SELECTED]: FavoriteSelected,
    [IconType.FEEDBACK]: Feedback,
    [IconType.FILTER]: Filter,
    [IconType.FLAG]: Flag,
    [IconType.GAS_FEE]: GasFee,
    [IconType.HELP]: Help,
    [IconType.HOME]: Home,
    [IconType.INFO]: Info,
    [IconType.LINK_EXTERNAL]: LinkExternal,
    [IconType.LOGOUT]: Logout,
    [IconType.MENU]: Menu,
    [IconType.MINUS]: Minus,
    [IconType.PERSON]: Person,
    [IconType.PLUS]: Plus,
    [IconType.RADIO]: Radio,
    [IconType.RADIO_SELECTED]: RadioSelected,
    [IconType.RELOAD]: Reload,
    [IconType.REMOVE]: Remove,
    [IconType.SEARCH]: Search,
    [IconType.SETTINGS]: Settings,
    [IconType.SHRINK]: Shrink,
    [IconType.SORT_ASC]: SortAsc,
    [IconType.SORT_DESC]: SortDesc,
    [IconType.SUCCESS]: Success,
    [IconType.SWITCH]: Switch,
    [IconType.TX_SMART_CONTRACT]: TxSmartContract,
    [IconType.UPDATE]: Update,
    [IconType.WARNING]: Warning,
    [IconType.WITHDRAW]: Withdraw,
    [IconType.WYSIWYG_BOLD]: WysiwygBold,
    [IconType.WYSIWYG_ITALIC]: WysiwygItalic,
    [IconType.WYSIWYG_LINK_SET]: WysiwygLinkSet,
    [IconType.WYSIWYG_LINK_UNSET]: WysiwygLinkUnset,
    [IconType.WYSIWYG_LIST_ORDERED]: WysiwygListOrdered,
    [IconType.WYSIWYG_LIST_UNORDERED]: WysiwygListUnordered,
};
