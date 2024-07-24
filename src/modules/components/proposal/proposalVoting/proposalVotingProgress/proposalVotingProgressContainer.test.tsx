import { render } from '@testing-library/react';
import {
    type IProposalVotingProgressContainerProps,
    ProposalVotingProgressContainer,
} from './proposalVotingProgressContainer';

describe('<ProposalVotingProgressContainer /> component', () => {
    const createTestComponent = (props?: Partial<IProposalVotingProgressContainerProps>) => {
        const completeProps: IProposalVotingProgressContainerProps = { ...props };

        return <ProposalVotingProgressContainer {...completeProps} />;
    };

    it('renders the progress items in row direction when direction property is set to row', () => {
        const direction = 'row';
        const { container } = render(createTestComponent({ direction }));
        // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
        expect(container.querySelector('div')?.className).toContain('md:flex-row');
    });

    it('renders the progress items in col direction when direction property is set to row', () => {
        const direction = 'col';
        const { container } = render(createTestComponent({ direction }));
        // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
        const wrapperClasses = container.querySelector('div')?.className;
        expect(wrapperClasses).not.toContain('md:flex-row');
        expect(wrapperClasses).toContain('flex-col');
    });

    it('defaults progress items direction to row when direction property is not set', () => {
        const direction = undefined;
        const { container } = render(createTestComponent({ direction }));
        // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
        expect(container.querySelector('div')?.className).toContain('md:flex-row');
    });
});
