import {
  type Abi,
  type Address,
  type ContractFunctionArgs,
  type ContractFunctionName,
} from "viem";

import {
  type UnionEvaluate,
  type UnionOmit,
} from "@/services/util/wagmi-types";
import {
  type ReadContractParameters,
  type ReadContractReturnType,
  readContract,
} from "../readContract";

type stateMutability = "pure" | "view";

export type CreateReadContractParameters<
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

export type CreateReadContractReturnType<
  abi extends Abi | readonly unknown[],
  address extends Address | Record<number, Address> | undefined,
  functionName extends ContractFunctionName<abi, stateMutability> | undefined,
  ///
  omittedProperties extends "abi" | "address" | "functionName" =
    | "abi"
    | (address extends undefined ? never : "address")
    | (functionName extends undefined ? never : "functionName"),
> = <
  name extends functionName extends ContractFunctionName<abi, stateMutability>
    ? functionName
    : ContractFunctionName<abi, stateMutability>,
  args extends ContractFunctionArgs<abi, stateMutability, name>,
>(
  parameters: UnionEvaluate<
    UnionOmit<ReadContractParameters<abi, name, args>, omittedProperties>
  >,
) => Promise<ReadContractReturnType<abi, name, args>>;

export function createReadContract<
  const abi extends Abi | readonly unknown[],
  const address extends
    | Address
    | Record<number, Address>
    | undefined = undefined,
  functionName extends
    | ContractFunctionName<abi, stateMutability>
    | undefined = undefined,
>(
  c: CreateReadContractParameters<abi, address, functionName>,
): CreateReadContractReturnType<abi, address, functionName> {
  return (parameters) => {
    return readContract({
      ...(parameters as any),
      ...(c.address ? { address: c.address } : {}),
      ...(c.functionName ? { functionName: c.functionName } : {}),
      abi: c.abi,
    });
  };
}
