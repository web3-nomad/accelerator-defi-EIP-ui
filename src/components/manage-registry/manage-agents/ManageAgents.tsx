import {
  Button,
  Flex,
  Text,
  Input,
  Alert,
  AlertDescription,
} from "@chakra-ui/react";
import { GroupBase } from "react-select";
import { useState, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { ethers } from "ethers";
import { EvmAddress } from "@/types/types";
import { MenuSelect } from "@/components/MenuSelect";
import {
  writeIdentityRegistryAddAgent,
  watchIdentityRegistryAgentAddedEvent,
  watchIdentityRegistryAgentRemovedEvent,
  writeIdentityRegistryRemoveAgent,
} from "@/services/contracts/wagmiGenActions";
import { useWalletInterface } from "@/services/wallets/useWalletInterface";
import { WalletInterface } from "@/services/wallets/walletInterface";
import { WatchContractEventReturnType } from "@/services/contracts/watchContractEvent";

type Props = {
  setUpdateTxResult: (res?: string) => void;
  setUpdateTxError: (err?: string) => void;
  isOpen: boolean;
  onClose: () => void;
  registry?: EvmAddress;
};

export const ManageAgents = ({
  setUpdateTxResult,
  setUpdateTxError,
  registry,
  isOpen,
  onClose,
}: Props) => {
  const [addedAgents, setAddedAgents] = useState<Array<string>>([]);
  const [selectedAgent, setSelectedAgent] = useState<EvmAddress>();
  const [newUserAgentAddress, setNewUserAgentAddress] = useState<string>();
  const { walletInterface } = useWalletInterface();

  const {
    mutateAsync: mutateIdentityRegistryRemoveAgent,
    isPending: isRemoveAgentPending,
  } = useMutation({
    mutationFn: async () => {
      return writeIdentityRegistryRemoveAgent(
        walletInterface as WalletInterface,
        { args: [selectedAgent as EvmAddress] },
        registry as EvmAddress,
      );
    },
  });

  const {
    mutateAsync: mutateIdentityRegistryAddAgent,
    isPending: isAddAgentPending,
  } = useMutation({
    mutationFn: async () => {
      return writeIdentityRegistryAddAgent(
        walletInterface as WalletInterface,
        { args: [newUserAgentAddress as EvmAddress] },
        registry as EvmAddress,
      );
    },
  });

  const addNewUserAgent = async () => {
    if (ethers.isAddress(newUserAgentAddress)) {
      try {
        const txHash = await mutateIdentityRegistryAddAgent();
        setUpdateTxResult(txHash);
        setUpdateTxError(undefined);
      } catch (err: any) {
        setUpdateTxResult(undefined);
        setUpdateTxError(err);
      }
    } else {
      setUpdateTxError("User agent address is incorrect");
      setUpdateTxResult(undefined);
    }
    onClose();
    setNewUserAgentAddress(undefined);
  };

  const handleAgentSelect = (agent: string) => {
    setSelectedAgent(agent as EvmAddress);
  };

  const removeUserAgent = async () => {
    try {
      const txHash = await mutateIdentityRegistryRemoveAgent();
      setUpdateTxResult(txHash);
      setUpdateTxError(undefined);
    } catch (err: any) {
      setUpdateTxResult(undefined);
      setUpdateTxError(err);
    }
    onClose();
    setSelectedAgent(undefined);
  };

  useEffect(() => {
    if (registry && isOpen) {
      setAddedAgents([]);
      const unsubAgentsAdded: WatchContractEventReturnType =
        watchIdentityRegistryAgentAddedEvent(
          {
            onLogs: (data) => {
              setAddedAgents(((prev: any) => {
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
  }, [registry, isOpen]);

  useEffect(() => {
    if (addedAgents?.length && registry && isOpen) {
      const unsubAgentsRemoved: WatchContractEventReturnType =
        watchIdentityRegistryAgentRemovedEvent(
          {
            onLogs: (data) => {
              const agents = data.map((log: any) => log.args[0]);

              if (agents.find((agent) => addedAgents.includes(agent))) {
                setAddedAgents((prev) =>
                  prev.filter((agent) => !agents.includes(agent)),
                );
              }
            },
          },
          registry as `0x${string}`,
        );

      return () => {
        unsubAgentsRemoved();
      };
    }
  }, [addedAgents, registry, isOpen]);

  return (
    <>
      <Flex direction="column" pb="6">
        <Flex direction="row" gap="2">
          <Input
            width="70%"
            value={newUserAgentAddress}
            placeholder="User agent address"
            onChange={(e) => setNewUserAgentAddress(e.target.value)}
          />
          <Button
            width="28%"
            onClick={addNewUserAgent}
            isLoading={isAddAgentPending}
          >
            Add new agent
          </Button>
        </Flex>
        <Alert status="success" mt="2">
          <AlertDescription fontSize="12">
            Somebody who can perform update / delete operations on {"identity"}{" "}
            wallet.
          </AlertDescription>
        </Alert>
        {!!addedAgents && (
          <Flex direction="column" mt="7">
            <MenuSelect
              data={
                addedAgents.map((agent) => ({
                  value: agent,
                  label: agent,
                })) as unknown as GroupBase<string | number>[]
              }
              label="Select agent"
              onTokenSelect={handleAgentSelect}
            />
            {selectedAgent && (
              <>
                <Text fontWeight="bold" style={{ fontSize: 14 }} mt="2">
                  Selected agent: {selectedAgent}
                </Text>
                <Button
                  width="50%"
                  onClick={removeUserAgent}
                  mt="2"
                  isLoading={isRemoveAgentPending}
                >
                  Remove selected agent
                </Button>
              </>
            )}
          </Flex>
        )}
      </Flex>
    </>
  );
};
