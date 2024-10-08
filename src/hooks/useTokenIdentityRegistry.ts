import { useEffect, useState } from "react";
import { TokenNameItem, EvmAddress } from "@/types/types";
import { WatchContractEventReturnType } from "@/services/contracts/watchContractEvent";
import {
  readTokenIdentityRegistry,
  watchIdentityRegistryIdentityRegisteredEvent,
} from "@/services/contracts/wagmiGenActions";

export function useTokenIdentityRegistry(tokenSelected?: TokenNameItem) {
  const [registry, setRegistry] = useState<EvmAddress>();
  const [registryIdentities, setRegistryIdentities] = useState<
    { identityAddress: EvmAddress; walletAddress: EvmAddress }[]
  >([]);

  useEffect(() => {
    let unsub: WatchContractEventReturnType | null = null;

    tokenSelected &&
      readTokenIdentityRegistry({ args: [] }, tokenSelected.address).then(
        (res: any) => {
          setRegistry(res[0]);
          setRegistryIdentities([]);
          unsub = watchIdentityRegistryIdentityRegisteredEvent(
            {
              onLogs: (data) => {
                setRegistryIdentities((prev) => {
                  return [
                    ...prev,
                    ...data
                      .map((item: any) => ({
                        walletAddress: item.args[0],
                        identityAddress: item.args[1],
                      }))
                      .filter(
                        (item) =>
                          !prev.find(
                            (itemExists) =>
                              itemExists.identityAddress ===
                              item.identityAddress,
                          ),
                      ),
                  ];
                });
              },
            },
            res[0] as EvmAddress,
          );
        },
      );
    return () => {
      unsub && unsub();
    };
  }, [tokenSelected]);

  return { registryIdentities, registry };
}
