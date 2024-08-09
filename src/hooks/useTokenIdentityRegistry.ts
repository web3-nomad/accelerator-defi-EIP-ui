import { useEffect, useState } from "react";
import { TokenNameItem } from "@/types/types";
import { WatchContractEventReturnType } from "@/services/contracts/watchContractEvent";
import {
  readTokenIdentityRegistry,
  watchIdentityRegistryIdentityRegisteredEvent,
} from "@/services/contracts/wagmiGenActions";

export function useTokenIdentityRegistry(tokenSelected?: TokenNameItem) {
  const [registry, setRegistry] = useState("");
  const [registryAgents, setRegistryAgents] = useState<string[]>([]);

  useEffect(() => {
    let unsub: WatchContractEventReturnType | null = null;

    tokenSelected &&
      readTokenIdentityRegistry({ args: [] }, tokenSelected.address).then(
        (res) => {
          setRegistry(res[0]);
          setRegistryAgents([]);
          unsub = watchIdentityRegistryIdentityRegisteredEvent(
            {
              onLogs: (data) => {
                setRegistryAgents((prev: any) => {
                  return [
                    ...prev,
                    ...data
                      .map((item: any) => item.args[0])
                      .filter((item) => !prev.includes(item)),
                  ];
                });
              },
            },
            res[0] as `0x${string}`,
          );
        },
      );
    return () => {
      unsub && unsub();
    };
  }, [tokenSelected]);

  return { registryAgents, registry };
}
