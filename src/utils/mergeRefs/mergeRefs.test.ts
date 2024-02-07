import { mergeRefs } from './mergeRefs';

describe('mergeRefs util', () => {
    it('correctly set value for function refs', () => {
        const functionRef = jest.fn();
        const value = 'test';
        const refSetter = mergeRefs([functionRef]);
        refSetter(value);
        expect(functionRef).toHaveBeenCalledWith(value);
    });

    it('correctly set value for mutable ref object', () => {
        const mutableRef = { current: null };
        const value = 'new-value';
        const refSetter = mergeRefs<string | null>([mutableRef]);
        refSetter(value);
        expect(mutableRef.current).toEqual(value);
    });
});
