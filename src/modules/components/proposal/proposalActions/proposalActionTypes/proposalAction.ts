export interface IProposalActionInputDataParameter {
  /**
   * The name of the parameter
   */
  type: string;
  /**
   * The value of the parameter
   */
  value: string;
}

export interface IProposalActionInputData {
  /**
   * The function to call from proposal action
   */
  function: string;
  /**
   * The contract address to call
   */
  contract: string;
  /**
   * The parameters to pass to the function
   */
  parameters: IProposalActionInputDataParameter[];
}

export interface IProposalAction {
  /**
   * The address to send the transaction from
   */
  from: string;
  /**
   * The address to send the transaction to
   */
  to: string;
  /**
   * The data to send with the transaction
   */
  data: string;
  /**
   * The value to send with the transaction
   */
  value: string;
  /**
   * The type of the proposal action
   */
  type: string;
  /**
   * The input data for the proposal action
   */
  inputData: IProposalActionInputData | null;
}