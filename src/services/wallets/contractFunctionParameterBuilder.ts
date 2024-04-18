// Since we're not using Hashgraph SDK to build func parameters due to tuples,
// This code is used solely for backwards compatibility with token transfer funcs of WalletInterface

export interface ContractFunctionParameterBuilderParam {
  type: string;
  name: string;
  value: any;
}

export class ContractFunctionParameterBuilder {
  private params: ContractFunctionParameterBuilderParam[] = [];

  public addParam(
    param: ContractFunctionParameterBuilderParam,
  ): ContractFunctionParameterBuilder {
    this.params.push(param);
    return this;
  }

  // Purpose: Build the ABI function parameters
  // Reason: The abi function parameters are required to construct the ethers.Contract object for calling a contract function using ethers
  // Works as fallback if full ABI is not provided
  public buildAbiFunctionParams(): string {
    const res = this.params
      .map((param) => `${param.type} ${param.name}`)
      .join(", ");
    return res;
  }

  // Purpose: Build the ethers compatible contract function call params
  public buildEthersParams(): string[] {
    const res = this.params.map((param) => param.value);
    return res;
  }
}
