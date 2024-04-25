import { render, screen } from '@testing-library/react';
import { MajorityVotingResult, type IMajorityVotingResultProps } from './majorityVotingResult';

describe('<MajorityVotingResult /> component', () => {
    const createTestComponent = (props?: Partial<IMajorityVotingResultProps>) => {
        const completeProps: IMajorityVotingResultProps = {
            option: 'yes',
            voteAmount: '100 wAnt',
            votePercentage: 10,
            ...props,
        };

        return <MajorityVotingResult {...completeProps} />;
    };

    it('renders the given winning option, vote amount, vote percentage and a corresponding progressbar', () => {
        const mockProps: IMajorityVotingResultProps = {
            option: 'yes',
            voteAmount: '100k wAnt',
            votePercentage: 15,
        };

        render(createTestComponent(mockProps));

        expect(screen.getByText(mockProps.option)).toBeInTheDocument();
        expect(screen.getByText(mockProps.voteAmount)).toBeInTheDocument();
        expect(screen.getByText(mockProps.votePercentage, { exact: false })).toBeInTheDocument();
        expect(screen.getByRole('progressbar')).toBeInTheDocument();
    });

    it('renders the stage title and stage id when provided', () => {
        const stage = {
            title: 'Test Stage',
            id: '3',
        };

        render(createTestComponent({ stage }));

        expect(screen.getByText(stage.title)).toBeInTheDocument();
        expect(screen.getByText(stage.id)).toBeInTheDocument();
    });

    it('renders the default stage title when not provided', () => {
        render(createTestComponent());

        expect(screen.getByText(/winning option/i)).toBeInTheDocument();
    });
});
