import type { SVGProps } from 'react';
import Action from '../../assets/illustrations/objects/action.svg';
import App from '../../assets/illustrations/objects/app.svg';
import Archive from '../../assets/illustrations/objects/archive.svg';
import Book from '../../assets/illustrations/objects/book.svg';
import Build from '../../assets/illustrations/objects/build.svg';
import Chain from '../../assets/illustrations/objects/chain.svg';
import Database from '../../assets/illustrations/objects/database.svg';
import Error from '../../assets/illustrations/objects/error.svg';
import Explore from '../../assets/illustrations/objects/explore.svg';
import Gas from '../../assets/illustrations/objects/gas.svg';
import Goal from '../../assets/illustrations/objects/goal.svg';
import Labels from '../../assets/illustrations/objects/labels.svg';
import Lightbulb from '../../assets/illustrations/objects/lightbulb.svg';
import MagnifyingGlass from '../../assets/illustrations/objects/magnifying-glass.svg';
import NotFound from '../../assets/illustrations/objects/not-found.svg';
import Security from '../../assets/illustrations/objects/security.svg';
import Settings from '../../assets/illustrations/objects/settings.svg';
import SmartContract from '../../assets/illustrations/objects/smart-contract.svg';
import Success from '../../assets/illustrations/objects/success.svg';
import Users from '../../assets/illustrations/objects/users.svg';
import Wagmi from '../../assets/illustrations/objects/wagmi.svg';
import Wallet from '../../assets/illustrations/objects/wallet.svg';
import Warning from '../../assets/illustrations/objects/warning.svg';
import { IllustrationObjectType } from './illustrationObjectType';

type IllustrationObjectComponent = React.FC<SVGProps<SVGSVGElement>>;

export const illustrationObjectList: Record<IllustrationObjectType, IllustrationObjectComponent> = {
    [IllustrationObjectType.ACTION]: Action,
    [IllustrationObjectType.APP]: App,
    [IllustrationObjectType.ARCHIVE]: Archive,
    [IllustrationObjectType.BOOK]: Book,
    [IllustrationObjectType.BUILD]: Build,
    [IllustrationObjectType.CHAIN]: Chain,
    [IllustrationObjectType.DATABASE]: Database,
    [IllustrationObjectType.ERROR]: Error,
    [IllustrationObjectType.EXPLORE]: Explore,
    [IllustrationObjectType.GAS]: Gas,
    [IllustrationObjectType.GOAL]: Goal,
    [IllustrationObjectType.LABELS]: Labels,
    [IllustrationObjectType.LIGHTBULB]: Lightbulb,
    [IllustrationObjectType.MAGNIFYING_GLASS]: MagnifyingGlass,
    [IllustrationObjectType.NOT_FOUND]: NotFound,
    [IllustrationObjectType.SECURITY]: Security,
    [IllustrationObjectType.SETTINGS]: Settings,
    [IllustrationObjectType.SMART_CONTRACT]: SmartContract,
    [IllustrationObjectType.SUCCESS]: Success,
    [IllustrationObjectType.USERS]: Users,
    [IllustrationObjectType.WAGMI]: Wagmi,
    [IllustrationObjectType.WALLET]: Wallet,
    [IllustrationObjectType.WARNING]: Warning,
};
