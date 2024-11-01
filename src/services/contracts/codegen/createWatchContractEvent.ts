import { type Abi, type Address, type ContractEventName } from "viem";

import { type UnionEvaluate, type UnionOmit } from "@/services/util/wagmiTypes";
import {
  type WatchContractEventParameters,
  type WatchContractEventReturnType,
  watchContractEvent,
} from "../watchContractEvent";

export type CreateWatchContractEventParameters<
  abi extends Abi | readonly unknown[],
  address extends Address | Record<number, Address> | undefined = undefined,
  eventName extends ContractEventName<abi> | undefined = undefined,
> = {
  abi: abi | Abi | readonly unknown[];
  address?: address | Address | Record<number, Address> | undefined;
  eventName?: eventName | ContractEventName<abi> | undefined;
};

export type CreateWatchContractEventReturnType<
  abi extends Abi | readonly unknown[],
  address extends Address | Record<number, Address> | undefined,
  eventName extends ContractEventName<abi> | undefined,
  ///
  omittedProperties extends "abi" | "address" | "eventName" =
    | "abi"
    | (address extends undefined ? never : "address")
    | (eventName extends undefined ? never : "eventName"),
> = <
  name extends eventName extends ContractEventName<abi>
    ? eventName
    : ContractEventName<abi>,
  strict extends boolean | undefined = undefined,
>(
  parameters: UnionEvaluate<
    UnionOmit<
      WatchContractEventParameters<abi, name, strict>,
      omittedProperties
    >
  > &
    (address extends Record<number, Address>
      ? { chainId?: keyof address | undefined }
      : unknown),
  addressOverride?: `0x${string}`,
) => WatchContractEventReturnType;

export function createWatchContractEvent<
  const abi extends Abi | readonly unknown[],
  const address extends
    | Address
    | Record<number, Address>
    | undefined = undefined,
  eventName extends ContractEventName<abi> | undefined = undefined,
>(
  c: CreateWatchContractEventParameters<abi, address, eventName>,
): CreateWatchContractEventReturnType<abi, address, eventName> {
  return (parameters, addressOverride) => {
    return watchContractEvent({
      ...(parameters as any),
      ...(c.address ? { address: c.address } : {}),
      ...(addressOverride ? { address: addressOverride } : {}),
      ...(c.eventName ? { eventName: c.eventName } : {}),
      abi: c.abi,
    }) as any;
  };
}
