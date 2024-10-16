import {
  Button,
  Flex,
  Text,
  Input,
  Alert,
  AlertDescription,
  AlertIcon,
} from "@chakra-ui/react";
import { GroupBase } from "react-select";
import { useRef, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";
import { EvmAddress } from "@/types/types";
import { QueryKeys } from "@/hooks/types";
import { MenuSelect } from "@/components/MenuSelect";
import {
  writeIdentityRegistryAddAgent,
  writeIdentityRegistryRemoveAgent,
} from "@/services/contracts/wagmiGenActions";
import { useWalletInterface } from "@/services/wallets/useWalletInterface";
import { WalletInterface } from "@/services/wallets/walletInterface";
import { useTokenIdentityRegistryAgents } from "@/hooks/useTokenIdentityRegistryAgents";
import { ethers } from "ethers";

type ManageAgentsProps = {
  setUpdateTxResult: (res?: string) => void;
  setUpdateTxError: (err?: string) => void;
  onClose: () => void;
  registry?: EvmAddress;
};

type InputRefProps = {
  value: string;
  setValue: (value?: string) => void;
};

export function ManageAgents({
  setUpdateTxResult,
  setUpdateTxError,
  registry,
  onClose,
}: ManageAgentsProps) {
  const [selectedAgent, setSelectedAgent] = useState<EvmAddress>();
  const inputRef = useRef();
  const [agentExistsError, setAgentExistsError] = useState<string>();
  const { walletInterface } = useWalletInterface();
  const { filteredAgents } = useTokenIdentityRegistryAgents(registry);
  const queryClient = useQueryClient();

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
    mutationFn: async (newUserAgentAddress: string) => {
      return writeIdentityRegistryAddAgent(
        walletInterface as WalletInterface,
        { args: [newUserAgentAddress as EvmAddress] },
        registry as EvmAddress,
      );
    },
  });

  const addNewUserAgent = async () => {
    const newUserAgentAddress = (inputRef.current as unknown as InputRefProps)
      ?.value;

    if (filteredAgents.includes(newUserAgentAddress)) {
      setAgentExistsError("Agent already exists");

      return;
    } else {
      setAgentExistsError(undefined);
    }

    if (newUserAgentAddress && ethers.isAddress(newUserAgentAddress)) {
      try {
        const txHash =
          await mutateIdentityRegistryAddAgent(newUserAgentAddress);
        setUpdateTxResult(txHash);
        setUpdateTxError(undefined);
        setTimeout(() => {
          queryClient.invalidateQueries({
            queryKey: [QueryKeys.ReadAgentInRegistry],
          });
        }, 1000);
      } catch (err: any) {
        setUpdateTxResult(undefined);
        setUpdateTxError(err);
      }

      onClose();
      (inputRef.current as unknown as InputRefProps)?.setValue(undefined);
    } else {
      setAgentExistsError("Address is empty or not an EVM address");
    }
  };

  const handleAgentSelect = (agent: string) => {
    setSelectedAgent(agent as EvmAddress);
  };

  const removeUserAgent = async () => {
    try {
      const txHash = await mutateIdentityRegistryRemoveAgent();
      setUpdateTxResult(txHash);
      setUpdateTxError(undefined);
      setTimeout(() => {
        queryClient.invalidateQueries({
          queryKey: [QueryKeys.ReadAgentInRegistry],
        });
      }, 1000);
    } catch (err: any) {
      setUpdateTxResult(undefined);
      setUpdateTxError(err);
    }

    onClose();
    setSelectedAgent(undefined);
  };

  return (
    <>
      <Flex direction="column" pb="6">
        <Flex direction="row" gap="2">
          <Input
            width="70%"
            ref={inputRef as any}
            placeholder="User agent address"
          />
          <Button
            width="28%"
            onClick={addNewUserAgent}
            isLoading={isAddAgentPending}
          >
            Add new agent
          </Button>
        </Flex>
        <Alert status={agentExistsError ? "error" : "success"} mt="2">
          {agentExistsError ? (
            <>
              <AlertIcon />
              <AlertDescription fontSize={12}>
                {agentExistsError}
              </AlertDescription>
            </>
          ) : (
            <AlertDescription fontSize="12">
              Somebody who can perform update / delete operations on{" "}
              {"identity"} wallet.
            </AlertDescription>
          )}
        </Alert>
        {!!filteredAgents && (
          <Flex direction="column" mt="7">
            <MenuSelect
              data={
                filteredAgents.map((agent) => ({
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
}
