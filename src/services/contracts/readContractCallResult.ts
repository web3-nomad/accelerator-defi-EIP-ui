import { ethers } from "ethers";

export function readContractCallResult({ callResult, functionName, abi }: any) {
  const contractInterface = new ethers.Interface(abi as []);

  return contractInterface.decodeFunctionResult(functionName, callResult);
}
