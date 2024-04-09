import type { Abi, ContractEventName } from "viem";
import {
  type WatchContractEventParameters as viem_WatchContractEventParameters,
  type WatchContractEventReturnType as viem_WatchContractEventReturnType,
} from "viem/actions";

export type WatchContractEventParameters<
  abi extends Abi | readonly unknown[] = Abi,
  eventName extends ContractEventName<abi> | undefined = ContractEventName<abi>,
  strict extends boolean | undefined = undefined,
> = viem_WatchContractEventParameters<abi, eventName, strict>;

export type WatchContractEventReturnType = viem_WatchContractEventReturnType;

export function watchContractEvent<
  const abi extends Abi | readonly unknown[],
  eventName extends ContractEventName<abi> | undefined,
  strict extends boolean | undefined = undefined,
>(parameters: WatchContractEventParameters<abi, eventName, strict>) {
  let unwatch: WatchContractEventReturnType | undefined;
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

  // set up subscriber for connected chain changes
  // let unsubscribe: (() => void) | undefined
  // if (syncConnectedChain && !parameters.chainId)
  //   unsubscribe = config.subscribe(
  //     ({ chainId }) => chainId,
  //     async (chainId) => listener(chainId),
  //   )

  // return () => {
  //   unlisten?.()
  //   unsubscribe?.()
  // }
  return () => {};
}
