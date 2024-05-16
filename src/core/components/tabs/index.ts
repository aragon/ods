import { TabsContent } from './tabsContent';
import { TabsList } from './tabsList';
import { TabsRoot } from './tabsRoot';
import { TabsTrigger } from './tabsTrigger';

export const Tabs = {
    Root: TabsRoot,
    List: TabsList,
    Trigger: TabsTrigger,
    Content: TabsContent,
};

export * from './tabsContent';
export * from './tabsList';
export * from './tabsRoot';
export * from './tabsTrigger';
