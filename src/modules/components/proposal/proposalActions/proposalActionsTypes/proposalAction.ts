export interface IProposalActionInputDataParameter {
    /**
     * The type of the parameter (e.g. address, uint256, uint32, ..).
     */
    type: string;
    /**
     * The value of the parameter.
     */
    value: string;
}

export interface IProposalActionInputData {
    /**
     * Name of the function to call from proposal action.
     */
    function: string;
    /**
     * The name of the contract to interact with.
     */
    contract: string;
    /**
     * The parameters to pass to the function.
     */
    parameters: IProposalActionInputDataParameter[];
}

export interface IProposalAction {
    /**
     * The address to send the transaction from.
     */
    from: string;
    /**
     * The address to send the transaction to.
     */
    to: string;
    /**
     * The data to send with the transaction.
     */
    data: string;
    /**
     * The native currency value to send with the transaction.
     */
    value: string | null;
    /**
     * The type of the proposal action.
     */
    type: string;
    /**
     * The input data for the proposal action.
     */
    inputData: IProposalActionInputData | null;
}
