import {
  type Abi,
  type Address,
  type ContractFunctionArgs,
  type ContractFunctionName,
} from "viem";

import { type UnionEvaluate, type UnionOmit } from "@/services/util/wagmiTypes";
import {
  type WriteContractReturnType,
  writeContract,
  WriteContractParameters,
} from "../writeContract";
import { WalletInterface } from "../../wallets/walletInterface";

type stateMutability = "nonpayable" | "payable";

export type CreateWriteContractParameters<
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

export type CreateWriteContractReturnType<
  abi extends Abi | readonly unknown[],
  address extends Address | Record<number, Address> | undefined,
  functionName extends ContractFunctionName<abi, stateMutability> | undefined,
> = <
  walletInterface extends WalletInterface,
  name extends functionName extends ContractFunctionName<abi, stateMutability>
    ? functionName
    : ContractFunctionName<abi, stateMutability>,
  args extends ContractFunctionArgs<abi, stateMutability, name>,
  omittedProperties extends "abi" | "address" | "functionName" =
    | "abi"
    | (address extends undefined ? never : "address")
    | (functionName extends undefined ? never : "functionName"),
>(
  walletInterface: walletInterface,
  parameters: UnionEvaluate<
    UnionOmit<WriteContractParameters<abi, name, args>, omittedProperties>
  >,
  addressOverride?: `0x${string}`,
) => Promise<WriteContractReturnType>;

export function createWriteContract<
  const abi extends Abi | readonly unknown[],
  const address extends
    | Address
    | Record<number, Address>
    | undefined = undefined,
  functionName extends
    | ContractFunctionName<abi, stateMutability>
    | undefined = undefined,
>(
  c: CreateWriteContractParameters<abi, address, functionName>,
): CreateWriteContractReturnType<abi, address, functionName> {
  return (walletInterface, parameters, addressOverride) => {
    return writeContract(walletInterface, {
      ...(parameters as any),
      ...(c.address ? { address: c.address } : {}),
      ...(addressOverride ? { address: addressOverride } : {}),
      ...(c.functionName ? { functionName: c.functionName } : {}),
      abi: c.abi,
    });
  };
}
