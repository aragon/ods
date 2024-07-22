import type { IProposalAction } from '../../proposalActionsTypes';

export const generateProposalAction = (action?: Partial<IProposalAction>): IProposalAction => ({
    type: 'unknownType',
    from: '0xFrom',
    to: '0xTo',
    data: '',
    value: '0',
    inputData: null,
    ...action,
});
