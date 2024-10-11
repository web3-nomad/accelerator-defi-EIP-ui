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
import { EvmAddress, InputRefProps } from "@/types/types";
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
import { IdentityItem } from "../ManageRegistry";

type ManageAgentsProps = {
  setUpdateTxResult: (res?: string) => void;
  setUpdateTxError: (err?: string) => void;
  onClose: () => void;
  registry?: EvmAddress;
  identityItems: IdentityItem[];
};

export function ManageAgents({
  setUpdateTxResult,
  setUpdateTxError,
  registry,
  identityItems,
  onClose,
}: ManageAgentsProps) {
  const [selectedAgentToAdd, setSelectedAgentToAdd] = useState<EvmAddress>();
  const [selectedAgent, setSelectedAgent] = useState<EvmAddress>();
  const inputRef = useRef<HTMLInputElement>(null);
  const [agentManualError, setAgentManualError] = useState<string>();
  const [agentSelectError, setAgentSelectError] = useState<string>();
  const { walletInterface, accountEvm } = useWalletInterface();
  const { filteredAgents, filteredNotAgentsYet } =
    useTokenIdentityRegistryAgents(
      registry,
      identityItems.map((agent) => agent.identity as EvmAddress),
    );
  const accountIdentity = identityItems.find(
    (item) => item.wallet === accountEvm,
  );
  const isAccountAgentAdmin = filteredNotAgentsYet?.includes(
    accountIdentity?.identity as EvmAddress,
  );

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

  const addNewUserAgentAsAdmin = async () => {
    if (filteredAgents.includes(selectedAgentToAdd)) {
      setAgentSelectError("Agent already exists");

      return;
    } else {
      setAgentSelectError(undefined);
    }

    if (selectedAgentToAdd && ethers.isAddress(selectedAgentToAdd)) {
      try {
        const txHash = await mutateIdentityRegistryAddAgent(selectedAgentToAdd);
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
      setAgentSelectError("Address is empty or not an EVM address");
    }
  };

  const addNewUserAgent = async () => {
    const newUserAgentAddress = (inputRef.current as unknown as InputRefProps)
      ?.value;

    if (filteredAgents.includes(newUserAgentAddress)) {
      setAgentManualError("Agent already exists");

      return;
    } else {
      setAgentManualError(undefined);
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
      setAgentManualError("Address is empty or not an EVM address");
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
            size="md"
            ref={inputRef}
            placeholder="Paste user agent address manually"
          />
          <Button
            width="28%"
            onClick={addNewUserAgent}
            isLoading={isAddAgentPending}
          >
            Add new agent
          </Button>
        </Flex>
        <Alert status={agentManualError ? "error" : "success"} mt="2">
          {agentManualError ? (
            <>
              <AlertIcon />
              <AlertDescription fontSize={12}>
                {agentManualError}
              </AlertDescription>
            </>
          ) : (
            <AlertDescription fontSize="12">
              Somebody who can perform update / delete operations on{" "}
              {"identity"} wallet.
            </AlertDescription>
          )}
        </Alert>
        {isAccountAgentAdmin && !!filteredNotAgentsYet && (
          <Flex direction="column" mt="7">
            <MenuSelect
              data={
                filteredNotAgentsYet.map((agent) => ({
                  value: agent,
                  label: agent,
                })) as unknown as GroupBase<string | number>[]
              }
              label="Select agent to add (only for admin)"
              onTokenSelect={(value) =>
                setSelectedAgentToAdd(value as EvmAddress)
              }
            />
            <Alert status={agentSelectError ? "error" : "success"} mt="2">
              {agentSelectError ? (
                <>
                  <AlertIcon />
                  <AlertDescription fontSize={12}>
                    {agentSelectError}
                  </AlertDescription>
                </>
              ) : (
                <AlertDescription fontSize="12">
                  Somebody who can perform update / delete operations on{" "}
                  {"identity"} wallet.
                </AlertDescription>
              )}
            </Alert>
            {selectedAgentToAdd && (
              <>
                <Text fontWeight="bold" style={{ fontSize: 14 }} mt="2">
                  Selected agent: {selectedAgentToAdd}
                </Text>
                <Button
                  width="50%"
                  onClick={addNewUserAgentAsAdmin}
                  mt="2"
                  isLoading={isAddAgentPending}
                >
                  Add selected agent
                </Button>
              </>
            )}
          </Flex>
        )}
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
