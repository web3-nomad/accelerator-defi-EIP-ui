import type { Abi, ContractEventName } from "viem";
import {
  type WatchContractEventParameters as viem_WatchContractEventParameters,
  type WatchContractEventReturnType as viem_WatchContractEventReturnType,
} from "viem/actions";
import { ethers } from "ethers";

export type WatchContractEventParameters<
  abi extends Abi | readonly unknown[] = Abi,
  eventName extends ContractEventName<abi> | undefined = ContractEventName<abi>,
  strict extends boolean | undefined = undefined,
> = viem_WatchContractEventParameters<abi, eventName, strict>;

export type WatchContractEventReturnType = viem_WatchContractEventReturnType;

export async function watchContractEvent<
  const abi extends Abi | readonly unknown[],
  eventName extends ContractEventName<abi> | undefined,
  strict extends boolean | undefined = undefined,
>(parameters: WatchContractEventParameters<abi, eventName, strict>) {
  const contractInterface = new ethers.Interface(parameters.abi as []);
  let unwatch: WatchContractEventReturnType | undefined;

  console.log("EVENT", parameters);

  // https://testnet.mirrornode.hedera.com/api/v1/docs/#/contracts/listContractLogs
  const response = await fetch(
    `https://testnet.mirrornode.hedera.com/api/v1/contracts/${parameters.address}/results/logs`,
    {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    },
  );
  const result = (await response.json()).logs;
  console.log("EVENT result", result);

  const decodeResults = result.map((item: any) => {
    return contractInterface.parseLog(item);
  });

  console.log("EVENT result decoded", decodeResults);

  const decodeResultsFiltered = decodeResults.filter((item: any) => {
    return item.name === parameters.eventName;
  }); /*.map((item: any) => {
    const res: any = {};
    for (let i = 0; i < item.fragment.inputs.length; i++) {
      res[item.fragment.inputs[i].name as string] = item.args[i];
    }
    return res;
  });*/

  console.log("EVENT result decoded & filtered", decodeResultsFiltered);

  const listener = () => {
    if (unwatch) unwatch();

    // const client = config.getClient({ chainId })
    // const action = getAction(
    //   client,
    //   viem_watchContractEvent,
    //   'watchContractEvent',
    // )
    // unwatch = action(rest as unknown as viem_WatchContractEventParameters)
    return unwatch;
  };

  // // set up listener for transaction changes
  const unlisten = listener();

  return () => {
    unlisten?.();
  };
}
