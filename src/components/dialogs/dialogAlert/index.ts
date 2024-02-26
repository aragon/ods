import { DialogAlertContent } from './dialogAlertContent';
import { DialogAlertFooter } from './dialogAlertFooter';
import { DialogAlertHeader } from './dialogAlertHeader';
import { DialogAlertRoot } from './dialogAlertRoot';

export const DialogAlert = {
    Content: DialogAlertContent,
    Footer: DialogAlertFooter,
    Header: DialogAlertHeader,
    Root: DialogAlertRoot,
};

export { type IDialogAlertContentProps } from './dialogAlertContent';
export { type IDialogAlertFooterAction, type IDialogAlertFooterProps } from './dialogAlertFooter';
export { type IDialogAlertHeaderProps } from './dialogAlertHeader';
export { type DialogAlertVariant, type IDialogAlertRootProps } from './dialogAlertRoot';
