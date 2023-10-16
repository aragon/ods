import { IconType } from '../icon';

export type AlertVariant = 'critical' | 'info' | 'success' | 'warning';

export const alertVariantToIconType: Record<AlertVariant, IconType> = {
    critical: IconType.WARNING,
    info: IconType.INFO,
    success: IconType.RADIO_CHECK,
    warning: IconType.WARNING,
};
