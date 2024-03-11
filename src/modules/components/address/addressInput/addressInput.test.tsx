import { render, screen } from '@testing-library/react';
import { OdsModulesProvider } from '../../odsModulesProvider';
import { AddressInput, type IAddressInputProps } from './addressInput';

describe('<AddressInput /> component', () => {
    const createTestComponent = (props?: Partial<IAddressInputProps>) => {
        const completeProps = {
            ...props,
        };

        return (
            <OdsModulesProvider>
                <AddressInput {...completeProps} />
            </OdsModulesProvider>
        );
    };

    it('renders an input field', () => {
        render(createTestComponent());
        expect(screen.getByRole('textbox')).toBeInTheDocument();
    });
});
