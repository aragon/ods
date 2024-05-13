import { render } from '@testing-library/react';
import { Props } from './tabsContent';

describe('tabsContent', () => {
    const defaultProps: Props = {};

    it('should render', () => {
        const props = { ...defaultProps };
        const { asFragment, queryByText } = render(<tabsContent {...props} />);

        expect(asFragment()).toMatchSnapshot();
        expect(queryByText('tabsContent')).toBeTruthy();
    });
});
