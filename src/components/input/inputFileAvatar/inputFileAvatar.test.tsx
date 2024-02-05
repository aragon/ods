import { render } from '@testing-library/react';
import { Props } from './inputFileAvatar';

describe('inputFileAvatar', () => {
    const defaultProps: Props = {};

    it('should render', () => {
        const props = { ...defaultProps };
        const { asFragment, queryByText } = render(<inputFileAvatar {...props} />);

        expect(asFragment()).toMatchSnapshot();
        expect(queryByText('inputFileAvatar')).toBeTruthy();
    });
});
