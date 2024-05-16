import { Children, type ComponentPropsWithoutRef } from 'react';
import { DefinitionListContext } from '../definitionListContext';

export interface IDefinitionListContainerProps extends ComponentPropsWithoutRef<'dl'> {}

export const DefinitionListContainer: React.FC<IDefinitionListContainerProps> = (props) => {
    const { className, children, ...otherProps } = props;
    const processedChildren = Children.toArray(children);

    return (
        <dl className="flex w-full flex-col" {...otherProps}>
            <DefinitionListContext.Provider value={true}>{processedChildren}</DefinitionListContext.Provider>
        </dl>
    );
};
