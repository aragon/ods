import { render, screen } from '@testing-library/react';

import { Icon, type IIconProps } from './icon';
import { IconType } from './iconType';

describe('<Icon /> component', () => {
    const createTestComponent = (props?: Partial<IIconProps>) => {
        const completeProps: IIconProps = {
            icon: IconType.PLUS,
            ...props,
        };

        return <Icon {...completeProps} />;
    };

    it('renders an icon', () => {
        const icon = IconType.BLOCKCHAIN_BLOCKCHAIN;
        render(createTestComponent({ icon }));
        expect(screen.getByTestId(icon)).toBeInTheDocument();
    });
});
