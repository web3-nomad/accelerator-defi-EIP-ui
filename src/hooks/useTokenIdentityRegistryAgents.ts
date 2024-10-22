import {
  readIdentityRegistryIsAgent,
  watchIdentityRegistryAgentAddedEvent,
} from "@/services/contracts/wagmiGenActions";
import { EvmAddress } from "@/types/types";
import { removeEvmAddressesDuplicates } from "@/services/util/helpers";
import { useQueries } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { WatchContractEventReturnType } from "viem";
import { QueryKeys } from "./types";

const combineIdentityRegistryAgentsOnlyAgentsResult = (result: any[]) => {
  return result
    .filter(
      (agent: { data: { isAgent: { "0": boolean } } }) =>
        !!agent.data?.isAgent?.["0"],
    )
    .map((agent: { data: { agent?: EvmAddress } }) => agent.data?.agent);
};

export function useTokenIdentityRegistryAgents(registry?: EvmAddress) {
  const [uniqueAgents, setUniqueAgents] = useState<Array<string>>([]);

  useEffect(() => {
    if (registry) {
      setUniqueAgents([]);
      const unsubAgentsAdded: WatchContractEventReturnType =
        watchIdentityRegistryAgentAddedEvent(
          {
            onLogs: (data) => {
              const newAgents = data.map((log: any) => log.args[0]);

              setUniqueAgents((prev) =>
                removeEvmAddressesDuplicates([...prev, ...newAgents]),
              );
            },
          },
          registry as EvmAddress,
        );
      return () => {
        unsubAgentsAdded();
      };
    }
  }, [registry]);

  const filteredAgentsQueryResult = useQueries({
    queries: uniqueAgents.map((agent) => ({
      queryKey: [QueryKeys.ReadAgentInRegistry, agent],
      enabled: !!registry,
      queryFn: async () => {
        const isAgent = await readIdentityRegistryIsAgent(
          { args: [agent as EvmAddress] },
          registry,
        );

        return {
          agent,
          isAgent,
        };
      },
      staleTime: Infinity,
    })),
    combine: combineIdentityRegistryAgentsOnlyAgentsResult,
  });

  return {
    filteredAgents: filteredAgentsQueryResult,
  };
}
