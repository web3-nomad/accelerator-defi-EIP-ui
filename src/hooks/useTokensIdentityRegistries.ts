import { useEffect, useState } from "react";
import { EvmAddress, TokenNameItem } from "@/types/types";
import { WatchContractEventReturnType } from "@/services/contracts/watchContractEvent";
import {
  readTokenIdentityRegistry,
  watchIdentityRegistryIdentityRegisteredEvent,
} from "@/services/contracts/wagmiGenActions";

export function useTokensIdentityRegistries(tokens?: TokenNameItem[]) {
  const [registriesAgents, setRegistriesAgents] = useState<{
    [address: string]: string[];
  }>();

  useEffect(() => {
    let unsubs: WatchContractEventReturnType[] = [];

    if (tokens?.length) {
      tokens.forEach((token) => {
        readTokenIdentityRegistry({ args: [] }, token.address).then((res) => {
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
                      [token.address]: data.map((item: any) => item.args[0]),
                    };
                  });
                },
              },
              res[0] as EvmAddress,
            ),
          );
        });
      });
    }

    return () => {
      unsubs?.length && unsubs.forEach((unsub) => unsub());
    };
  }, [tokens]);

  return { registriesAgents };
}
