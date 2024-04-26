import { createContext, useContext, useMemo, type ReactNode } from 'react';

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

const odsCoreContextDefaults: IOdsCoreContext = { Img: 'img', Link: 'a' };

const odsCoreContext = createContext<IOdsCoreContext>(odsCoreContextDefaults);

export const OdsCoreProvider: React.FC<IOdsCoreProviderProps> = (props) => {
    const { values, children } = props;

    const contextValues = useMemo(
        () => ({
            Img: values?.Img ?? odsCoreContextDefaults.Img,
            Link: values?.Link ?? odsCoreContextDefaults.Link,
        }),
        [values],
    );

    return <odsCoreContext.Provider value={contextValues}>{children}</odsCoreContext.Provider>;
};

export const useOdsCoreContext = (): Required<IOdsCoreContext> => {
    const values = useContext(odsCoreContext);

    return values;
};
