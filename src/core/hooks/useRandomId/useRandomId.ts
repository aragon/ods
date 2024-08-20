import { useId } from 'react';

export const useRandomId = (id?: string) => {
    const randomId = useId();

    return id ?? randomId;
};
