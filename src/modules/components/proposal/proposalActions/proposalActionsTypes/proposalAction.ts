export interface IProposalActionInputDataParameter {
    /**
     * The name of the parameter being passed.
     */
    name: string;
    /**
     * The value of the argument being passed.
     */
    value: string | number;
    /**
     * The NatSpec comment for the parameter on the contract.
     */
    comment?: string;
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
     * The value to send with the transaction.
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
