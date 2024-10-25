import { useEffect, useState } from "react";
import { WatchContractEventReturnType } from "@/services/contracts/watchContractEvent";
import { watchIdentityRegistryIdentityRegisteredEvent } from "@/services/contracts/wagmiGenActions";
import { TokenRegistry } from "@/types/types";

export function useTokensIdentityRegistries(
  tokenRegistries: TokenRegistry[],
  loadComplete = false,
) {
  const [registriesAgents, setRegistriesAgents] = useState<{
    [address: string]: string[];
  }>();

  useEffect(() => {
    let unsubs: WatchContractEventReturnType[] = [];

    if (loadComplete) {
      tokenRegistries.map((tokenRegistry) => {
        unsubs.push(
          watchIdentityRegistryIdentityRegisteredEvent(
            {
              onLogs: (data) => {
                setRegistriesAgents((prev) => {
                  if (!prev) {
                    prev = {};
                  }

                  return {
                    ...prev,
                    [tokenRegistry.tokenAddress]: data.map(
                      (item: any) => item.args[0],
                    ),
                  };
                });
              },
            },
            tokenRegistry.registryAddress,
          ),
        );
      });
    }

    return () => {
      unsubs?.length && unsubs.forEach((unsub) => unsub());
    };
  }, [tokenRegistries, loadComplete]);

  return { registriesAgents };
}
