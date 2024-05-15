import { Children, type ComponentPropsWithoutRef, type ReactElement } from 'react';
import { DefinitionListContext } from '../definitionListContext';

export interface IDefinitionListContainerProps extends ComponentPropsWithoutRef<'dl'> {}

export const DefinitionListContainer: React.FC<IDefinitionListContainerProps> = (props) => {
    const { className, children, ...otherProps } = props;
    const processedChildren = Children.toArray(children) as ReactElement[];

    return (
        <DefinitionListContext.Provider value={true}>
            <dl className="flex w-full flex-col" {...otherProps}>
                {processedChildren}
            </dl>
        </DefinitionListContext.Provider>
    );
};
