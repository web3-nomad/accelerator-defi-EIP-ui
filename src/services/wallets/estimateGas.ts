import { ContractId } from "@hashgraph/sdk";
import { ethers } from "ethers";
import { ContractFunctionParameterBuilder } from "../wallets/contractFunctionParameterBuilder";

export async function estimateGas(
  from: string,
  contractId: ContractId,
  abi: readonly any[],
  functionName: string,
  args: any[],
) {
  const contractInterface = new ethers.Interface(abi as []);

  const data = contractInterface.encodeFunctionData(functionName, args as []);
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
        data,
        estimate: true,
        from,
        gas: 15000000,
        gasPrice: 1,
        to: `0x${contractId.toSolidityAddress()}`,
        value: 0,
      }),
    },
  );
  return await response.json();
}
