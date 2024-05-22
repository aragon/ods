import { type ComponentPropsWithoutRef } from 'react';

export interface IDefinitionListContainerProps extends ComponentPropsWithoutRef<'dl'> {}

export const DefinitionListContainer: React.FC<IDefinitionListContainerProps> = (props) => {
    const { className, children, ...otherProps } = props;

    return (
        <dl className="flex w-full flex-col" {...otherProps}>
            {children}
        </dl>
    );
};
