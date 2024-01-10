import { render, screen } from '@testing-library/react';
import { Toggle } from '../toggle';
import { ToggleGroup, type IToggleGroupBaseProps, type IToggleGroupProps } from './toggleGroup';

describe('<ToggleGroup /> component', () => {
    const createTestComponent = (props: Partial<IToggleGroupProps> = {}) => {
        if (props?.isMultiSelect) {
            return <ToggleGroup isMultiSelect={true} {...props} />;
        }

        const { isMultiSelect, ...otherProps } = props as IToggleGroupBaseProps<false>;

        return <ToggleGroup isMultiSelect={false} {...otherProps} />;
    };

    it('renders the children components', () => {
        const children = [
            <Toggle key="first" value="first" label="First" />,
            <Toggle key="second" value="second" label="Second" />,
        ];
        render(createTestComponent({ children }));
        expect(screen.getAllByRole('button')).toHaveLength(children.length);
    });
});
