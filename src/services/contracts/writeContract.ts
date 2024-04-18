import type { Abi, ContractFunctionArgs, ContractFunctionName } from "viem";
import {
  type WriteContractParameters as viem_WriteContractParameters,
  type WriteContractReturnType as viem_WriteContractReturnType,
} from "viem/actions";

import type { Evaluate } from "@/services/util/wagmiTypes";
import { WalletInterface } from "../wallets/walletInterface";
import { ContractFunctionParameterBuilder } from "../wallets/contractFunctionParameterBuilder";
import { ContractId } from "@hashgraph/sdk";

export type WriteContractParameters<
  abi extends Abi | readonly unknown[] = Abi,
  functionName extends ContractFunctionName<
    abi,
    "nonpayable" | "payable"
  > = ContractFunctionName<abi, "nonpayable" | "payable">,
  args extends ContractFunctionArgs<
    abi,
    "nonpayable" | "payable",
    functionName
  > = ContractFunctionArgs<abi, "nonpayable" | "payable", functionName>,
> =
  // TODO: test if typechecks run ok after implementing write contract functionality
  Evaluate<viem_WriteContractParameters<abi, functionName, args>>;

export type WriteContractReturnType = viem_WriteContractReturnType;

export async function writeContract<
  const abi extends Abi | readonly unknown[],
  functionName extends ContractFunctionName<abi, "pure" | "view">,
  args extends ContractFunctionArgs<abi, "pure" | "view", functionName>,
>(
  walletInterface: WalletInterface,
  parameters: WriteContractParameters<abi, functionName, args>,
): Promise<WriteContractReturnType> {
  const abiFunc: any = parameters.abi.find(
    (item: any) =>
      item.type === "function" && item.name === parameters.functionName,
  );
  let index = 0;
  const args = parameters.args as [];
  const functionParameters = new ContractFunctionParameterBuilder();
  abiFunc.inputs?.forEach((input: any) => {
    functionParameters.addParam({
      type: input.type,
      name: input.name,
      value: args?.[index],
    });
    index++;
  });

  // TODO: test write function
  return new Promise((resolve) => {
    walletInterface
      .executeContractWriteFunction(
        ContractId.fromEvmAddress(0, 0, parameters.address as "0x{string}"),
        parameters.abi,
        parameters.functionName as string,
        functionParameters,
        0,
      )
      .then((txId: any) => resolve(txId));
  });
}
