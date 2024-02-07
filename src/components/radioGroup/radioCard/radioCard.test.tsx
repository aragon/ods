import { fireEvent, render, screen } from '@testing-library/react';
import { RadioGroup } from '..';
import { IconType } from '../../icon';
import { RadioCard, type IRadioCardProps } from './radioCard';

describe('<RadioCard/> component', () => {
    const createTestComponent = (props?: Partial<IRadioCardProps>) => {
        const completeProps = { label: 'test label', value: 'test value', description: 'test description', ...props };

        return (
            <RadioGroup name="Test Group">
                <RadioCard {...completeProps} />;
            </RadioGroup>
        );
    };

    const originalGlobalImage = global.Image;

    beforeAll(() => {
        (window.Image as unknown) = class MockImage {
            onload: () => void = () => {};
            src: string = '';
            constructor() {
                setTimeout(() => {
                    this.onload();
                }, 100);
            }
        };
    });

    afterAll(() => {
        global.Image = originalGlobalImage;
    });

    it('renders with avatar, label, description, tag, and unchecked radio button', async () => {
        const avatar = 'avatar';
        const description = 'Test Description';
        const label = 'Test Label';
        const tag = { label: 'Tag Label' };

        render(createTestComponent({ avatar, description, label, tag }));

        const radioButton = screen.getByRole('radio');

        expect(radioButton).toBeInTheDocument();
        expect(radioButton).not.toBeChecked();
        expect(screen.getByText(label)).toBeInTheDocument();
        expect(screen.getByText(description)).toBeInTheDocument();
        expect(screen.getByText(tag.label)).toBeInTheDocument();
        expect(await screen.findByRole('img')).toBeInTheDocument();
    });

    it('renders the RADIO_DEFAULT icon when unchecked', () => {
        render(createTestComponent());

        const uncheckedIcon = screen.getByTestId(IconType.RADIO_DEFAULT);

        expect(uncheckedIcon).toBeVisible();
        expect(screen.getByRole('radio')).not.toBeChecked();
    });

    it('renders the RADIO_CHECK icon when checked', () => {
        render(createTestComponent());

        const radioButton = screen.getByRole('radio');

        fireEvent.click(radioButton);
        const checkedIcon = screen.getByTestId(IconType.RADIO_CHECK);

        expect(checkedIcon).toBeVisible();
        expect(screen.getByRole('radio')).toBeChecked();
    });

    it('disables the radio button when disabled prop is true', () => {
        render(createTestComponent({ disabled: true }));

        expect(screen.getByRole('radio')).toBeDisabled();
    });

    it('sets the radio button value correctly', () => {
        const value = 'Test value';

        render(createTestComponent({ value }));

        expect(screen.getByRole('radio')).toHaveValue(value);
    });
});
