import {
  Button,
  Flex,
  Text,
  Input,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Table,
  Tbody,
  Thead,
  Tr,
  Th,
  Td,
  Box,
  Modal,
  ModalOverlay,
  ModalCloseButton,
  ModalContent,
  ModalBody,
  ModalHeader,
  ModalFooter,
  Divider,
  useDisclosure,
} from "@chakra-ui/react";
import { useContext, useState, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { ethers } from "ethers";
import {
  EvmAddress,
  TokenNameItem,
  UpdateIdentityCountryProps,
} from "@/types/types";
import { Eip3643Context } from "@/contexts/Eip3643Context";
import { MenuSelect } from "@/components/MenuSelect";
import {
  readTokenName,
  readTokenOwner,
  writeIdentityRegistryDeleteIdentity,
  writeIdentityRegistryUpdateCountry,
  writeIdentityRegistryUpdateIdentity,
  writeIdentityRegistryAddAgent,
  watchIdentityRegistryAgentAddedEvent,
  watchIdentityRegistryAgentRemovedEvent,
  writeIdentityRegistryRemoveAgent,
} from "@/services/contracts/wagmiGenActions";
import { useTokenIdentityRegistry } from "@/hooks/useTokenIdentityRegistry";
import { useWalletInterface } from "@/services/wallets/useWalletInterface";
import { WalletInterface } from "@/services/wallets/walletInterface";
import { WatchContractEventReturnType } from "@/services/contracts/watchContractEvent";
import { GroupBase } from "react-select";

export enum CountryCodesISO {
  US = 840,
  NON_US = 0,
}
export const investorCountriesItems = [
  {
    value: CountryCodesISO.US,
    label: "US",
  },
  {
    value: CountryCodesISO.NON_US,
    label: "Non US",
  },
];

export function ManageIdentities() {
  const [addedAgents, setAddedAgents] = useState<Array<string>>([]);
  const [ownTokens, setOwnTokens] = useState<Array<TokenNameItem>>([]);
  const [updateTxResult, setUpdateTxResult] = useState<string>();
  const [updateTxError, setUpdateTxError] = useState<string>();
  const { deployedTokens } = useContext(Eip3643Context);
  const { accountEvm } = useWalletInterface();
  const [selectedIdentity, setSelectedIdentity] = useState<EvmAddress>();
  const [selectedToken, setSelectedToken] = useState<TokenNameItem>();
  const [selectedAgent, setSelectedAgent] = useState<EvmAddress>();
  const [selectedCountry, setSelectedCountry] = useState<string>();
  const [newIdentityAddress, setNewIdentityAddress] = useState<string>();
  const [newUserAgentAddress, setNewUserAgentAddress] = useState<string>();
  const { registry, registryAgents } = useTokenIdentityRegistry(selectedToken);
  const { walletInterface } = useWalletInterface();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const {
    mutateAsync: mutateDeleteIdentity,
    isPending: isDeleteIdentityPending,
  } = useMutation({
    mutationFn: async () => {
      return writeIdentityRegistryDeleteIdentity(
        walletInterface as WalletInterface,
        { args: [selectedIdentity as EvmAddress] },
        registry as EvmAddress,
      );
    },
  });

  const {
    mutateAsync: mutateUpdateIdentityCountry,
    isPending: isUpdateIdentityCountryPending,
  } = useMutation({
    mutationFn: async ({ country }: UpdateIdentityCountryProps) => {
      return writeIdentityRegistryUpdateCountry(
        walletInterface as WalletInterface,
        { args: [selectedIdentity as EvmAddress, country] },
        registry as EvmAddress,
      );
    },
  });

  const {
    mutateAsync: mutateUpdateIdentity,
    isPending: isUpdateIdentityPending,
  } = useMutation({
    mutationFn: async () => {
      return writeIdentityRegistryUpdateIdentity(
        walletInterface as WalletInterface,
        {
          args: [
            selectedIdentity as EvmAddress,
            newIdentityAddress as EvmAddress,
          ],
        },
        registry as EvmAddress,
      );
    },
  });

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

  const handleTokenSelect = (tokenAddr: string) => {
    setSelectedToken(
      ownTokens.find((token) => token.address === (tokenAddr as string)),
    );
  };

  const handleUpdateIdentity = async () => {
    if (ethers.isAddress(newIdentityAddress)) {
      try {
        const txHash = await mutateUpdateIdentity();
        setUpdateTxResult(txHash);
        setUpdateTxError(undefined);
      } catch (err: any) {
        setUpdateTxError(err);
        setUpdateTxResult(undefined);
      }
    } else {
      setUpdateTxError("New identity address is incorrect");
      setUpdateTxResult(undefined);
    }
    onClose();
    setNewIdentityAddress(undefined);
  };

  const handleDeleteIdentity = async () => {
    try {
      const txHash = await mutateDeleteIdentity();
      setUpdateTxResult(txHash);
      setUpdateTxError(undefined);
    } catch (err: any) {
      setUpdateTxError(err);
      setUpdateTxResult(undefined);
    }
    onClose();
  };

  const handleIdentityCountrySelect = (value: string) => {
    setSelectedCountry(
      investorCountriesItems.find((country) => country.value === Number(value))
        ?.label,
    );
  };

  const handleAgentSelect = (agent: string) => {
    setSelectedAgent(agent as EvmAddress);
  };

  const handleUpdateCountry = async () => {
    try {
      const txHash = await mutateUpdateIdentityCountry({
        country: Number(
          investorCountriesItems.find(
            (country) => country.label === selectedCountry,
          )?.value,
        ),
      });
      setUpdateTxResult(txHash);
      setUpdateTxError(undefined);
    } catch (err: any) {
      setUpdateTxError(err.message);
      setUpdateTxResult(undefined);
    }
    onClose();
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
    (deployedTokens as any).map((item: any) => {
      const tokenAddress = item["args"]?.[0];
      tokenAddress &&
        readTokenOwner({}, tokenAddress).then((resOwner) => {
          resOwner[0].toString().toLowerCase() === accountEvm?.toLowerCase() &&
            readTokenName({}, tokenAddress).then((resName) => {
              setOwnTokens((prev) => {
                return [
                  ...prev.filter((itemSub) => itemSub.address !== tokenAddress),
                  {
                    address: tokenAddress,
                    name: resName[0],
                  },
                ];
              });
            });
        });
    });
  }, [accountEvm, deployedTokens, setOwnTokens]);

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

  const registryDetailsModal = (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent width="80%" pt="8">
        <ModalHeader>
          <Text fontSize={16} fontWeight="800" align="center">
            Manage identity {selectedIdentity}
          </Text>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Flex direction="column" gap="2">
            <Flex direction="row" gap="2">
              <Input
                width="70%"
                value={newIdentityAddress}
                placeholder="Identity wallet address to update"
                onChange={(e) => setNewIdentityAddress(e.target.value)}
              />
              <Button
                width="28%"
                onClick={handleUpdateIdentity}
                isLoading={isUpdateIdentityPending}
              >
                Update address
              </Button>
            </Flex>
            <Flex>
              <Button
                width="50%"
                onClick={handleDeleteIdentity}
                isLoading={isDeleteIdentityPending}
              >
                Remove identity
              </Button>
            </Flex>
            <Flex direction="row" gap="2">
              <Box width="70%">
                <MenuSelect
                  data={
                    investorCountriesItems as unknown as GroupBase<
                      string | number
                    >[]
                  }
                  label="Select country"
                  onTokenSelect={handleIdentityCountrySelect}
                />
              </Box>
              <Button
                width="28%"
                onClick={handleUpdateCountry}
                isLoading={isUpdateIdentityCountryPending}
              >
                Update country
              </Button>
            </Flex>
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
              <AlertDescription fontSize="13">
                Somebody who can perform update / delete operations on{" "}
                {"identity"} wallet.
              </AlertDescription>
            </Alert>
            {!!addedAgents && (
              <Flex direction="column">
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
        </ModalBody>
        <ModalFooter backgroundColor="ButtonFace">
          <Button colorScheme="blue" onClick={onClose}>
            Cancel modal
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );

  const onEditRegistry = (registryAgent: string) => {
    onOpen();
    setSelectedIdentity(registryAgent as EvmAddress);
  };

  return (
    <>
      {registryDetailsModal}
      <Flex direction="column" gap="2" pt="8">
        <Flex direction="column">
          <Text fontSize={20} fontWeight="800" mb="5">
            Select Token
          </Text>
          <Box width="50%">
            <MenuSelect
              loadingInProgress={!ownTokens?.length}
              styles={{
                container: (base) => ({
                  ...base,
                  width: "45%",
                }),
              }}
              data={
                ownTokens.map((tok) => ({
                  value: tok.address,
                  label: tok.name,
                })) as unknown as GroupBase<string | number>[]
              }
              label="Select token to manage identities"
              onTokenSelect={handleTokenSelect}
            />
          </Box>
          {selectedToken && (
            <Text fontWeight="bold" mt="2" style={{ fontSize: 14 }}>
              Selected token: {selectedToken?.name} ({selectedToken?.address})
            </Text>
          )}
        </Flex>
        <Divider my={10} />
        <Flex direction="column">
          {registryAgents?.length ? (
            <Flex direction="column">
              <Text fontSize={20} fontWeight="800" mb="4">
                Token Identities
              </Text>
              <Table>
                <Thead>
                  {registryAgents.map((agent) => (
                    <Tr key={agent}>
                      {["token", "actions"].map((column) => (
                        <Th key={column}>
                          <Text fontWeight="800">{column}</Text>
                        </Th>
                      ))}
                    </Tr>
                  ))}
                </Thead>
                <Tbody>
                  {registryAgents.map((agent) => (
                    <Tr key={agent}>
                      <Td>
                        <Text fontSize={14}>{agent}</Text>
                      </Td>
                      <Td>
                        <Button onClick={() => onEditRegistry(agent)}>
                          Edit identity
                        </Button>
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </Flex>
          ) : (
            <></>
          )}
        </Flex>
        <Flex direction="column">
          {updateTxResult && (
            <Alert status="success">
              <AlertIcon />
              <AlertTitle>Update success!</AlertTitle>
              <AlertDescription>TxId: {updateTxResult}</AlertDescription>
            </Alert>
          )}
          {updateTxError && (
            <Alert status="error">
              <AlertIcon />
              <AlertTitle>Update error!</AlertTitle>
              <AlertDescription>Reason: {updateTxError}</AlertDescription>
            </Alert>
          )}
        </Flex>
      </Flex>
    </>
  );
}
