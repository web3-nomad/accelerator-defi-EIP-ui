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
  let timeOut = 0;
  let isActive = true;
  let lastTimestamp = 0;

  let unwatch: WatchContractEventReturnType | undefined = () => {
    isActive = false;
    clearTimeout(timeOut);
  };

  const poll = async () => {
    // https://testnet.mirrornode.hedera.com/api/v1/docs/#/contracts/listContractLogs
    const response = await fetch(
      `https://testnet.mirrornode.hedera.com/api/v1/contracts/${parameters.address}/results/logs?timestamp=gte:${lastTimestamp}&order=asc`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      },
    );
    const result = (await response.json()).logs;

    if (result && result.length > 0) {
      lastTimestamp = parseInt(result.slice(-1)[0].timestamp) + 1 || 0;
      const decodeResults = result.map((item: any) => {
        return contractInterface.parseLog(item);
      });
      const decodeResultsFiltered = decodeResults.filter((item: any) => {
        return item.name === parameters.eventName;
      });
      if (decodeResultsFiltered && isActive) {
        parameters.onLogs(decodeResultsFiltered);
      }
    }
    if (isActive) {
      setTimeout(poll, 2000);
    }
  };

  const listener = () => {
    if (unwatch) unwatch();
    isActive = true;
    poll();
    return unwatch;
  };
  const unlisten = listener();

  return () => {
    unlisten?.();
  };
}
