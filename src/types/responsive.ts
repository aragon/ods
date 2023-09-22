export type Breakpoint = 'sm' | 'md' | 'lg' | 'xl' | '2xl';

export type ResponsiveAttribute<T> = Partial<Record<Breakpoint, T>>;

export type ClassMapKey = string | number | symbol;

export type ResponsiveAttributeClassMap<T extends ClassMapKey> = Record<T, ResponsiveAttribute<string>>;
