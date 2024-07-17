import type { IProposalAction } from '../../proposalActionsTypes';

export const generateProposalActionGeneric = (
    action?: Partial<IProposalAction>,
): IProposalAction => ({
  type: 'unknownType',
  contractAddress: '0xContract',
  from: '0xFrom',
  to: '0xTo',
  data: '',
  value: '0',
  inputData: null,
    ...action,
});
