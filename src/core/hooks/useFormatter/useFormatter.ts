import { useMemo } from 'react';
import { useOdsCoreContext } from '../../components';
import { FormatterUtils } from '../../utils/formatterUtils/formatterUtils';

export const useFormatter = () => {
    const { locale } = useOdsCoreContext();

    return useMemo(() => {
        return new FormatterUtils(locale);
    }, [locale]);
};
