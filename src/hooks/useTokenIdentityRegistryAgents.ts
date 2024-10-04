import {
  readIdentityRegistryIsAgent,
  watchIdentityRegistryAgentAddedEvent,
} from "@/services/contracts/wagmiGenActions";
import { EvmAddress } from "@/types/types";
import { useQueries } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { WatchContractEventReturnType } from "viem";
import { QueryKeys } from "./types";

export function useTokenIdentityRegistryAgents(registry?: EvmAddress) {
  const [agents, setAgents] = useState<Array<string>>([]);
  const [uniqueAgents, setUniqueAgents] = useState<Array<string>>([]);

  useEffect(() => {
    if (registry) {
      setAgents([]);
      const unsubAgentsAdded: WatchContractEventReturnType =
        watchIdentityRegistryAgentAddedEvent(
          {
            onLogs: (data) => {
              setAgents(((prev: any) => {
                return [...prev, ...data.map((log: any) => log.args[0])];
              }) as any);
            },
          },
          registry as `0x${string}`,
        );
      return () => {
        unsubAgentsAdded();
      };
    }
  }, [registry]);

  useEffect(() => {
    if (agents?.length) {
      setUniqueAgents(
        agents.reduce((acc: Array<string>, item) => {
          if (!acc.includes(item)) {
            return [...acc, item];
          }

          return acc;
        }, []),
      );
    }
  }, [agents]);

  const agentsQueryResult = useQueries({
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
  });

  return {
    filteredAgents: agentsQueryResult
      .filter(
        (agent) =>
          !!(agent.data?.isAgent as unknown as { "0": boolean })?.["0"],
      )
      .map((agent) => agent.data?.agent),
  };
}
