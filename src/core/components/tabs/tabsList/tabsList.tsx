import { TabsList as RadixTabsList } from '@radix-ui/react-tabs';
import classNames from 'classnames';
import { useContext, type ComponentProps } from 'react';
import { TabsContext } from '../tabsRoot/tabsRoot';

export interface ITabsListProps extends ComponentProps<'div'> {}

export const TabsList: React.FC<ITabsListProps> = (props) => {
    const { children, className, ...otherProps } = props;
    const { isUnderlined } = useContext(TabsContext);

    const tabsListClassNames = classNames('flex gap-x-6', { 'border-b border-neutral-100': isUnderlined }, className);

    return (
        <RadixTabsList className={tabsListClassNames} {...otherProps}>
            {children}
        </RadixTabsList>
    );
};
