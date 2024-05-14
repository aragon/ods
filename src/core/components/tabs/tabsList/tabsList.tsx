import { TabsList as RadixTabsList, type TabsListProps as RadixTabsListProps } from '@radix-ui/react-tabs';
import classNames from 'classnames';
import { useContext } from 'react';
import { TabsContext } from '../tabsRoot/tabsRoot';

export interface ITabsListProps extends RadixTabsListProps {}

export const TabsList: React.FC<ITabsListProps> = (props) => {
    const { children, className, ...otherProps } = props;
    const { isUnderlined } = useContext(TabsContext);

    const tabsListClassNames = classNames('flex gap-x-6', { 'border-b border-neutral-200': isUnderlined }, className);

    return (
        <RadixTabsList className={tabsListClassNames} {...otherProps}>
            {children}
        </RadixTabsList>
    );
};
