import { ethers } from "ethers";

export function readContractCallResult({ callResult, functionName, abi }: any) {
  const contractInterface = new ethers.Interface(abi as []);

  let result = contractInterface.decodeFunctionResult(functionName, callResult);

  console.log("L13 readContractCallResult result ===", result);

  return result;
}
