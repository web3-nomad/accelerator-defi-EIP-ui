import { type Abi, type Address, type ContractFunctionName } from "viem";

type stateMutability = "nonpayable" | "payable";

export type CreateSimulateContractParameters<
  abi extends Abi | readonly unknown[],
  address extends Address | Record<number, Address> | undefined = undefined,
  functionName extends
    | ContractFunctionName<abi, stateMutability>
    | undefined = undefined,
> = {
  abi: abi | Abi | readonly unknown[];
  address?: address | Address | Record<number, Address> | undefined;
  functionName?:
    | functionName
    | ContractFunctionName<abi, stateMutability>
    | undefined;
};

export function createSimulateContract<
  const abi extends Abi | readonly unknown[],
  const address extends
    | Address
    | Record<number, Address>
    | undefined = undefined,
  functionName extends
    | ContractFunctionName<abi, stateMutability>
    | undefined = undefined,
>(c: CreateSimulateContractParameters<abi, address, functionName>): any {
  // TODO
  // return simulateContract(config, {
  //   ...(parameters as any),
  //   ...(c.address ? { address: c.address } : {}),
  //   ...(c.functionName ? { functionName: c.functionName } : {}),
  //   abi: c.abi,
  // })
}
