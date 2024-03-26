import { type Abi } from "viem";
import type { ContractFunctionArgs, ContractFunctionName } from "viem";
import {
  type ReadContractParameters as viem_ReadContractParameters,
  type ReadContractReturnType as viem_ReadContractReturnType,
} from "viem/actions";
import { WalletInterface } from "../wallets/walletInterface";
import { ContractFunctionParameterBuilder } from "../wallets/contractFunctionParameterBuilder";
import { ContractId } from "@hashgraph/sdk";
import { appConfig } from "../../config";

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

export function readContract<
  const abi extends Abi | readonly unknown[],
  functionName extends ContractFunctionName<abi, "pure" | "view">,
  args extends ContractFunctionArgs<abi, "pure" | "view", functionName>,
>(
  walletInterface: WalletInterface,
  parameters: ReadContractParameters<abi, functionName, args>,
): Promise<ReadContractReturnType<abi, functionName, args>> {
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

  // // TODO: currently all calls are made via write func; actually we have to return read result instead of txId here
  return new Promise((resolve) => {
    walletInterface
      .executeContractWriteFunction(
        ContractId.fromEvmAddress(0, 0, parameters.address as "0x{string}"),
        parameters.functionName as string,
        functionParameters,
        appConfig.constants.METAMASK_GAS_LIMIT_TRANSFER_FT,
      )
      .then((txId: any) => resolve(txId));
  });
}
