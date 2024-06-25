import { createContext, useContext, useMemo, type ReactNode } from 'react';
import { getCopyForLocale, odsDefaultLocale, type IOdsCoreCopy } from '../../copy';

export interface IOdsCoreContext {
    /**
     * Image component to be used for images.
     * @default 'img'
     */
    Img: React.FC | 'img';
    /**
     * Link component to be used for links.
     * @default 'a'
     */
    Link: React.FC | 'a';
    /**
     * Locale for the core components.
     */
    locale: string;
    /**
     * Text copy for the core components.
     */
    copy: IOdsCoreCopy;
}

export interface IOdsCoreProviderProps {
    /**
     * Context provider values.
     */
    values?: Partial<IOdsCoreContext>;
    /**
     * Children of the context provider.
     */
    children?: ReactNode;
}

const odsCoreContextDefaults: IOdsCoreContext = {
    Img: 'img',
    Link: 'a',
    locale: odsDefaultLocale,
    copy: getCopyForLocale(odsDefaultLocale),
};

const odsCoreContext = createContext<IOdsCoreContext>(odsCoreContextDefaults);

export const OdsCoreProvider: React.FC<IOdsCoreProviderProps> = (props) => {
    const { values, children } = props;

    const contextValues = useMemo(() => {
        const locale = values?.locale ?? odsCoreContextDefaults.locale;
        const copy = getCopyForLocale(locale);

        return {
            Img: values?.Img ?? odsCoreContextDefaults.Img,
            Link: values?.Link ?? odsCoreContextDefaults.Link,
            copy,
            locale,
        };
    }, [values]);

    return <odsCoreContext.Provider value={contextValues}>{children}</odsCoreContext.Provider>;
};

export const useOdsCoreContext = (): Required<IOdsCoreContext> => {
    const values = useContext(odsCoreContext);

    return values;
};
