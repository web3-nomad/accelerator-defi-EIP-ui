import { type Abi } from "viem";
import type { ContractFunctionArgs, ContractFunctionName } from "viem";
import {
  type ReadContractParameters as viem_ReadContractParameters,
  type ReadContractReturnType as viem_ReadContractReturnType,
} from "viem/actions";
import { ethers } from "ethers";

export type ReadContractParameters<
  abi extends Abi | readonly unknown[] = Abi,
  functionName extends ContractFunctionName<
    abi,
    "pure" | "view"
  > = ContractFunctionName<abi, "pure" | "view">,
  args extends ContractFunctionArgs<
    abi,
    "pure" | "view",
    functionName
  > = ContractFunctionArgs<abi, "pure" | "view", functionName>,
> = viem_ReadContractParameters<abi, functionName, args>;

export type ReadContractReturnType<
  abi extends Abi | readonly unknown[] = Abi,
  functionName extends ContractFunctionName<
    abi,
    "pure" | "view"
  > = ContractFunctionName<abi, "pure" | "view">,
  args extends ContractFunctionArgs<
    abi,
    "pure" | "view",
    functionName
  > = ContractFunctionArgs<abi, "pure" | "view", functionName>,
> = viem_ReadContractReturnType<abi, functionName, args>;

export async function readContract<
  const abi extends Abi | readonly unknown[],
  functionName extends ContractFunctionName<abi, "pure" | "view">,
  args extends ContractFunctionArgs<abi, "pure" | "view", functionName>,
>(
  parameters: ReadContractParameters<abi, functionName, args>,
): Promise<ReadContractReturnType<abi, functionName, args>> {
  const contractInterface = new ethers.Interface(parameters.abi as []);
  const data = contractInterface.encodeFunctionData(
    parameters.functionName,
    parameters.args as [],
  );

  // // create contract instance for the contract id
  // // to call the function, use contract[functionName](...functionParameters, ethersOverrides)
  // const contract = new ethers.Contract(
  //   parameters.address,
  //   parameters.abi as [],
  //   null,
  // );

  // const res = await contract[parameters.functionName]();
  // console.log('res', res);
  // return res;

  const response = await fetch(
    "https://testnet.mirrornode.hedera.com/api/v1/contracts/call",
    {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        block: "latest",
        data: data,
        estimate: false,
        from: "0000000000000000000000000000000000000000",
        gas: 15000000,
        gasPrice: 1,
        to: parameters.address,
        value: 0,
      }),
    },
  );
  const result = (await response.json()).result;
  return contractInterface.decodeFunctionResult(
    parameters.functionName,
    result,
  ) as any;
}
