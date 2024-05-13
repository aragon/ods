import { render } from '@testing-library/react';
import { Props } from './tabsRoot';

describe('tabs', () => {
    const defaultProps: Props = {};

    it('should render', () => {
        const props = { ...defaultProps };
        const { asFragment, queryByText } = render(<tabs {...props} />);

        expect(asFragment()).toMatchSnapshot();
        expect(queryByText('tabs')).toBeTruthy();
    });
});
