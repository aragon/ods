import { render, renderHook, screen } from '@testing-library/react';
import { act } from 'react';
import { testLogger } from '../../../../../core/test';
import { ProposalActionsProvider, useProposalActionsContext } from './proposalActionsContext';

describe('ProposalActionsContext', () => {
    it('provides default values', () => {
        const { result } = renderHook(() => useProposalActionsContext(), {
            wrapper: ProposalActionsProvider,
        });

        expect(result.current.activeTab).toBe('basic');
    });

    it('updates activeTab value correctly', () => {
        const { result } = renderHook(() => useProposalActionsContext(), {
            wrapper: ProposalActionsProvider,
        });

        act(() => {
            result.current.setActiveTab('composer');
        });

        expect(result.current.activeTab).toBe('composer');
    });

    it('throws an error when used outside the provider', () => {
        testLogger.suppressErrors();

        expect(() => renderHook(() => useProposalActionsContext())).toThrow();
    });

    it('renders children correctly', () => {
        render(
            <ProposalActionsProvider>
                <div>Test Child</div>
            </ProposalActionsProvider>,
        );

        expect(screen.getByText('Test Child')).toBeInTheDocument();
    });
});
