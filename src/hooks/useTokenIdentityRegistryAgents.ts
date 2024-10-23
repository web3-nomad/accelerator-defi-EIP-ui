import {
  readIdentityRegistryIsAgent,
  watchIdentityRegistryAgentAddedEvent,
} from "@/services/contracts/wagmiGenActions";
import { EvmAddress } from "@/types/types";
import { removeEvmAddressesDuplicates } from "@/services/util/helpers";
import { useQueries, UseQueryResult } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { WatchContractEventReturnType } from "viem";
import { QueryKeys } from "./types";

const combineIdentityRegistryAgentsOnlyAgentsResult = (
  result: UseQueryResult<{ agent: string; isAgent: boolean }, Error>[],
) => {
  return result
    .filter((agent) => !!(agent.data?.isAgent as unknown as string[])?.["0"])
    .map((agent) => agent.data?.agent);
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
