import { render, screen } from '@testing-library/react';
import { IconType } from '../../icon';
import { CheckboxCard, type ICheckboxCardProps } from './checkboxCard';

jest.mock('../../avatars', () => ({
    Avatar: () => <div data-testid="avatar-mock" />,
}));

describe('<CheckboxCard /> component', () => {
    const createTestComponent = (props?: Partial<ICheckboxCardProps>) => {
        const completeProps = {
            label: 'label',
            description: 'description',
            ...props,
        };

        return <CheckboxCard {...completeProps} />;
    };

    it('renders a checkbox with the specified label and description', () => {
        const label = 'checkbox';
        const description = 'checkbox-description';
        render(createTestComponent({ label, description }));
        expect(screen.getByRole('checkbox')).toBeInTheDocument();
        expect(screen.getByText(label)).toBeInTheDocument();
        expect(screen.getByText(description)).toBeInTheDocument();
    });

    it('sets a random id when id property is not set', () => {
        render(createTestComponent());
        expect(screen.getByRole('checkbox').id).toBeDefined();
    });

    it('renders the avatar when defined', () => {
        const avatar = 'https://test.com/image.png';
        render(createTestComponent({ avatar }));
        expect(screen.getByTestId('avatar-mock')).toBeInTheDocument();
    });

    it('renders the tag when specified', () => {
        const tag = { label: 'tag-label', variant: 'primary' } as const;
        render(createTestComponent({ tag }));
        expect(screen.getByText(tag.label)).toBeInTheDocument();
    });

    it('renders the unchecked state when the checkbox is not checked', () => {
        const checked = false;
        render(createTestComponent({ checked }));
        expect(screen.getByTestId(IconType.CHECKBOX)).toBeVisible();
        expect(screen.queryByTestId(IconType.CHECKBOX_INDETERMINATE)).not.toBeInTheDocument();
        expect(screen.queryByTestId(IconType.CHECKBOX_SELECTED)).not.toBeInTheDocument();
    });

    it('renders the checked state when the checkbox is checked', () => {
        const checked = true;
        render(createTestComponent({ checked }));
        expect(screen.getByTestId(IconType.CHECKBOX_SELECTED)).toBeVisible();
    });

    it('renders the indeterminate state when the checked property is set to indeterminate', () => {
        const checked = 'indeterminate';
        render(createTestComponent({ checked }));
        expect(screen.getByTestId(IconType.CHECKBOX_INDETERMINATE)).toBeVisible();
    });
});
