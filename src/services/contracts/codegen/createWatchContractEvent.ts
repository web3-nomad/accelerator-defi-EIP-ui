import { type Abi, type Address, type ContractEventName } from "viem";

export type CreateWatchContractEventParameters<
  abi extends Abi | readonly unknown[],
  address extends Address | Record<number, Address> | undefined = undefined,
  eventName extends ContractEventName<abi> | undefined = undefined,
> = {
  abi: abi | Abi | readonly unknown[];
  address?: address | Address | Record<number, Address> | undefined;
  eventName?: eventName | ContractEventName<abi> | undefined;
};

export function createWatchContractEvent<
  const abi extends Abi | readonly unknown[],
  const address extends
    | Address
    | Record<number, Address>
    | undefined = undefined,
  eventName extends ContractEventName<abi> | undefined = undefined,
>(c: CreateWatchContractEventParameters<abi, address, eventName>): any {
  // todo
  return () => {
    console.log("createWatchContractEvent");
    console.log(c);
  };
  // return watchContractEvent(config, {
  //   ...(parameters as any),
  //   ...(c.address ? { address: c.address } : {}),
  //   ...(c.eventName ? { functionName: c.eventName } : {}),
  //   abi: c.abi,
  // })
}
