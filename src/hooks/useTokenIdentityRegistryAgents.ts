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

export function useTokenIdentityRegistryAgents(
  registry?: EvmAddress,
  identityItems?: EvmAddress[],
) {
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

  const filteredNotAgentsYetQueryResult = useQueries({
    queries: (identityItems ?? []).map((agent) => ({
      queryKey: [QueryKeys.ReadAgentInRegistry, agent],
      enabled: !!identityItems?.length && !!registry,
      queryFn: async () => {
        const isAgent = await readIdentityRegistryIsAgent(
          { args: [agent] },
          registry,
        );

        return {
          agent,
          isAgent,
        };
      },
      staleTime: Infinity,
    })),
    combine: (result) => {
      return result
        .filter(
          (agent) =>
            !(agent.data?.isAgent as unknown as { "0": boolean })?.["0"],
        )
        .map((agent) => agent.data?.agent);
    },
  });

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
    combine: (result) => {
      return result
        .filter(
          (agent) =>
            !!(agent.data?.isAgent as unknown as { "0": boolean })?.["0"],
        )
        .map((agent) => agent.data?.agent);
    },
  });

  return {
    filteredAgents: filteredAgentsQueryResult,
    filteredNotAgentsYet: filteredNotAgentsYetQueryResult,
  };
}
