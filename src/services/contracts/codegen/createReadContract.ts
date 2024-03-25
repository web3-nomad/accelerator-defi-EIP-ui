import {
  type Abi,
  type Address,
  type ContractFunctionName,
  ContractFunctionArgs,
} from "viem";
import { type ReadContractParameters as viem_ReadContractParameters } from "viem/actions";

import { ContractId } from "@hashgraph/sdk";
import { convertAccountIdToSolidityAddress } from "@/services/util/helpers";
//const { accountId, walletName, walletInterface } = useWalletInterface();
import { ContractFunctionParameterBuilder } from "@/services/wallets/contractFunctionParameterBuilder";
import { hashConnectWallet } from "../../wallets/hashconnect/hashconnectClient";
import { appConfig } from "@/config";

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

export function createReadContract<
  const abi extends Abi | readonly unknown[],
  const address extends
    | Address
    | Record<number, Address>
    | undefined = undefined,
  functionName extends
    | ContractFunctionName<abi, stateMutability>
    | undefined = undefined,
>(c: CreateReadContractParameters<abi, address, functionName>) {
  // return
  // <
  //     const abi extends Abi | readonly unknown[],
  //     functionName extends ContractFunctionName<abi, 'pure' | 'view'>,
  //     args extends ContractFunctionArgs<abi, 'pure' | 'view', functionName>,
  //   >
  return async (
    walletInterface: any,
    parameters: any = [], //: ReadContractParameters<abi, functionName, args>,
  ) => {
    const abiFunc: any = c.abi.find(
      (item: any) => item.type === "function" && item.name === c.functionName,
    );
    let index = 0;
    const functionParameters = new ContractFunctionParameterBuilder();
    abiFunc.inputs?.forEach((input: any) => {
      functionParameters.addParam({
        type: input.type,
        name: input.name,
        value: parameters?.[index],
      });
      index++;
    });

    // TODO: currently all calls are made via write func
    const txId = await walletInterface.executeContractWriteFunction(
      ContractId.fromEvmAddress(0, 0, c.address as "0x{string}"),
      c.functionName as string,
      functionParameters,
      appConfig.constants.METAMASK_GAS_LIMIT_TRANSFER_FT,
    );
    return txId;
  };
}
