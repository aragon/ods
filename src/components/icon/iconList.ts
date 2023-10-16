import { type SVGProps } from 'react';
import Add from '../../assets/icons/add.svg';
import AppCommunity from '../../assets/icons/app-community.svg';
import AppDashboard from '../../assets/icons/app-dashboard.svg';
import AppFinance from '../../assets/icons/app-finance.svg';
import AppGovernance from '../../assets/icons/app-governance.svg';
import Blockchain from '../../assets/icons/blockchain.svg';
import Calendar from '../../assets/icons/calendar.svg';
import CheckboxDefault from '../../assets/icons/checkbox-default.svg';
import CheckboxMulti from '../../assets/icons/checkbox-multi.svg';
import CheckboxSelected from '../../assets/icons/checkbox-selected.svg';
import Checkmark from '../../assets/icons/checkmark.svg';
import ChevronDown from '../../assets/icons/chevron-down.svg';
import ChevronLeft from '../../assets/icons/chevron-left.svg';
import ChevronRight from '../../assets/icons/chevron-right.svg';
import ChevronUp from '../../assets/icons/chevron-up.svg';
import Clock from '../../assets/icons/clock.svg';
import Close from '../../assets/icons/close.svg';
import Copy from '../../assets/icons/copy.svg';
import Expand from '../../assets/icons/expand.svg';
import Explore from '../../assets/icons/explore.svg';
import FavouriteDefault from '../../assets/icons/favourite-default.svg';
import FavouriteSelected from '../../assets/icons/favourite-selected.svg';
import Feedback from '../../assets/icons/feedback.svg';
import Filter from '../../assets/icons/filter.svg';
import Flag from '../../assets/icons/flag.svg';
import GasFee from '../../assets/icons/gas-fee.svg';
import Home from '../../assets/icons/home.svg';
import Info from '../../assets/icons/info.svg';
import LinkExternal from '../../assets/icons/link-external.svg';
import MenuDefault from '../../assets/icons/menu-default.svg';
import MenuHorizontal from '../../assets/icons/menu-horizontal.svg';
import MenuVertical from '../../assets/icons/menu-vertical.svg';
import Person from '../../assets/icons/person.svg';
import Question from '../../assets/icons/question.svg';
import RadioCancel from '../../assets/icons/radio-cancel.svg';
import RadioCheck from '../../assets/icons/radio-check.svg';
import RadioDefault from '../../assets/icons/radio-default.svg';
import RadioPause from '../../assets/icons/radio-pause.svg';
import RadioSelected from '../../assets/icons/radio-selected.svg';
import Reload from '../../assets/icons/reload.svg';
import Remove from '../../assets/icons/remove.svg';
import Search from '../../assets/icons/search.svg';
import Settings from '../../assets/icons/settings.svg';
import Shrink from '../../assets/icons/shrink.svg';
import Sort from '../../assets/icons/sort.svg';
import Switch from '../../assets/icons/switch.svg';
import TurnOff from '../../assets/icons/turn-off.svg';
import TxDeposit from '../../assets/icons/tx-deposit.svg';
import TxFailure from '../../assets/icons/tx-failure.svg';
import TxSmartContract from '../../assets/icons/tx-smart-contract.svg';
import TxWithdraw from '../../assets/icons/tx-withdraw.svg';
import Update from '../../assets/icons/update.svg';
import Warning from '../../assets/icons/warning.svg';
import WysiwygBold from '../../assets/icons/wysiwyg-bold.svg';
import WysiwygItalic from '../../assets/icons/wysiwyg-italic.svg';
import WysiwygLinkSet from '../../assets/icons/wysiwyg-link-set.svg';
import WysiwygLinkUnset from '../../assets/icons/wysiwyg-link-unset.svg';
import WysiwygListOrdered from '../../assets/icons/wysiwyg-list-ordered.svg';
import WysiwygListUnordered from '../../assets/icons/wysiwyg-list-unordered.svg';
import { IconType } from './iconType';

type IconComponent = React.FC<SVGProps<SVGSVGElement>>;

export const iconList: Record<IconType, IconComponent> = {
    [IconType.ADD]: Add,
    [IconType.APP_COMMUNITY]: AppCommunity,
    [IconType.APP_DASHBOARD]: AppDashboard,
    [IconType.APP_FINANCE]: AppFinance,
    [IconType.APP_GOVERNANCE]: AppGovernance,
    [IconType.BLOCKCHAIN]: Blockchain,
    [IconType.CALENDAR]: Calendar,
    [IconType.CHECKBOX_DEFAULT]: CheckboxDefault,
    [IconType.CHECKBOX_MULTI]: CheckboxMulti,
    [IconType.CHECKBOX_SELECTED]: CheckboxSelected,
    [IconType.CHECKMARK]: Checkmark,
    [IconType.CHEVRON_DOWN]: ChevronDown,
    [IconType.CHEVRON_LEFT]: ChevronLeft,
    [IconType.CHEVRON_RIGHT]: ChevronRight,
    [IconType.CHEVRON_UP]: ChevronUp,
    [IconType.CLOCK]: Clock,
    [IconType.CLOSE]: Close,
    [IconType.COPY]: Copy,
    [IconType.EXPAND]: Expand,
    [IconType.EXPLORE]: Explore,
    [IconType.FAVOURITE_DEFAULT]: FavouriteDefault,
    [IconType.FAVOURITE_SELECTED]: FavouriteSelected,
    [IconType.FEEDBACK]: Feedback,
    [IconType.FILTER]: Filter,
    [IconType.FLAG]: Flag,
    [IconType.GAS_FEE]: GasFee,
    [IconType.HOME]: Home,
    [IconType.INFO]: Info,
    [IconType.LINK_EXTERNAL]: LinkExternal,
    [IconType.MENU_DEFAULT]: MenuDefault,
    [IconType.MENU_HORIZONTAL]: MenuHorizontal,
    [IconType.MENU_VERTICAL]: MenuVertical,
    [IconType.PERSON]: Person,
    [IconType.QUESTION]: Question,
    [IconType.RADIO_CANCEL]: RadioCancel,
    [IconType.RADIO_CHECK]: RadioCheck,
    [IconType.RADIO_DEFAULT]: RadioDefault,
    [IconType.RADIO_PAUSE]: RadioPause,
    [IconType.RADIO_SELECTED]: RadioSelected,
    [IconType.RELOAD]: Reload,
    [IconType.SEARCH]: Search,
    [IconType.SETTINGS]: Settings,
    [IconType.SHRINK]: Shrink,
    [IconType.SORT]: Sort,
    [IconType.SWITCH]: Switch,
    [IconType.TURN_OFF]: TurnOff,
    [IconType.TX_DEPOSIT]: TxDeposit,
    [IconType.TX_FAILURE]: TxFailure,
    [IconType.TX_SMART_CONTRACT]: TxSmartContract,
    [IconType.TX_WITHDRAW]: TxWithdraw,
    [IconType.UPDATE]: Update,
    [IconType.WARNING]: Warning,
    [IconType.REMOVE]: Remove,
    [IconType.WYSIWYG_BOLD]: WysiwygBold,
    [IconType.WYSIWYG_ITALIC]: WysiwygItalic,
    [IconType.WYSIWYG_LINK_SET]: WysiwygLinkSet,
    [IconType.WYSIWYG_LINK_UNSET]: WysiwygLinkUnset,
    [IconType.WYSIWYG_LIST_ORDERED]: WysiwygListOrdered,
    [IconType.WYSIWYG_LIST_UNORDERED]: WysiwygListUnordered,
};
