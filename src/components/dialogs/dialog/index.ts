import { DialogContent } from './dialogContent';
import { DialogFooter } from './dialogFooter';
import { DialogHeader } from './dialogHeader';
import { DialogRoot } from './dialogRoot';

export const Dialog = {
    Content: DialogContent,
    Footer: DialogFooter,
    Header: DialogHeader,
    Root: DialogRoot,
};

export { type IDialogContentProps } from './dialogContent';
export { type IDialogFooterAction, type IDialogFooterProps } from './dialogFooter';
export { type IDialogHeaderProps } from './dialogHeader';
export { type IDialogRootProps } from './dialogRoot';
