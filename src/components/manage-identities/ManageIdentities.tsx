import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  Text,
  Input,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from "@chakra-ui/react";
import { useContext, useState, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { ethers } from "ethers";
import { EvmAddress, TokenNameItem, UpdateCountryProps } from "@/types/types";
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

const investorCountriesItems = [
  {
    value: 840,
    label: "US",
  },
  {
    value: 0,
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
  const [selectedToken, setSelectedToken] = useState<TokenNameItem>();
  const [selectedAgent, setSelectedAgent] = useState<EvmAddress>();
  const [selectedIdentity, setSelectedIdentity] = useState<EvmAddress>();
  const [newIdentityAddress, setNewIdentityAddress] = useState<string>();
  const [newUserAgentAddress, setNewUserAgentAddress] = useState<string>();
  const { registry, registryAgents } = useTokenIdentityRegistry(selectedToken);
  const { walletInterface } = useWalletInterface();

  const { mutateAsync: mutateDeleteIdentity } = useMutation({
    mutationFn: async () => {
      return writeIdentityRegistryDeleteIdentity(
        walletInterface as WalletInterface,
        { args: [selectedIdentity as EvmAddress] },
        registry as EvmAddress,
      );
    },
  });

  const { mutateAsync: mutateUpdateIdentityCountry } = useMutation({
    mutationFn: async ({ country }: UpdateCountryProps) => {
      return writeIdentityRegistryUpdateCountry(
        walletInterface as WalletInterface,
        { args: [selectedIdentity as EvmAddress, country] },
        registry as EvmAddress,
      );
    },
  });

  const { mutateAsync: mutateUpdateIdentity } = useMutation({
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

  const { mutateAsync: mutateIdentityRegistryRemoveAgent } = useMutation({
    mutationFn: async () => {
      return writeIdentityRegistryRemoveAgent(
        walletInterface as WalletInterface,
        { args: [selectedAgent as EvmAddress] },
        registry as EvmAddress,
      );
    },
  });

  const { mutateAsync: mutateIdentityRegistryAddAgent } = useMutation({
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
  };

  const handleTokenSelect = (tokenAddr: string) => {
    setSelectedToken(
      ownTokens.find((token) => token.address === (tokenAddr as string)),
    );
  };

  const handleIdentitySelect = (value: string) => {
    setSelectedIdentity(value as `0x${string}`);
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
  };

  const handleUpdateIdentityCountry = async (value: string) => {
    try {
      const txHash = await mutateUpdateIdentityCountry({
        country: Number(value),
      });
      setUpdateTxResult(txHash);
      setUpdateTxError(undefined);
    } catch (err: any) {
      setUpdateTxError(err);
      setUpdateTxResult(undefined);
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
    } catch (err: any) {
      setUpdateTxResult(undefined);
      setUpdateTxError(err);
    }
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
    if (registry) {
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
  }, [registry]);

  useEffect(() => {
    if (addedAgents?.length && registry) {
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
  }, [addedAgents, registry]);

  return (
    <>
      <Flex
        gap="4"
        pt="4"
        flexDirection={{
          xl: "row",
          base: "column",
        }}
      >
        <Flex
          direction="column"
          width={{
            xl: "49%",
            base: "80%",
          }}
        >
          <Box width="62%">
            <MenuSelect
              data={ownTokens.map((tok) => ({
                value: tok.address,
                label: tok.name,
              }))}
              label="Select tokens to manage identities"
              onTokenSelect={handleTokenSelect}
            />
          </Box>
          <Box mt="4" width="62%">
            <MenuSelect
              data={registryAgents.map((identity) => ({
                value: identity,
                label: identity,
              }))}
              label="Select identity wallet to manage"
              onTokenSelect={handleIdentitySelect}
            />
          </Box>
          <Flex direction="column" mt="9">
            <Text fontWeight="bold" style={{ fontSize: 14 }}>
              Selected identity wallet: {selectedIdentity}
            </Text>
            {!!selectedIdentity && (
              <>
                <Input
                  value={newIdentityAddress}
                  placeholder="Identity wallet address to update"
                  onChange={(e) => setNewIdentityAddress(e.target.value)}
                />
                <ButtonGroup mt="2">
                  <Button minWidth="30%" onClick={handleUpdateIdentity}>
                    Update to address
                  </Button>
                  <MenuSelect
                    buttonProps={{
                      variant: "outline",
                    }}
                    data={investorCountriesItems}
                    label="Update country"
                    onTokenSelect={handleUpdateIdentityCountry}
                  />
                  <Button minWidth="20%" onClick={handleDeleteIdentity}>
                    Remove
                  </Button>
                </ButtonGroup>
              </>
            )}
          </Flex>
        </Flex>
        <Flex
          direction="column"
          width="49%"
          className="modify-identities-container-section"
        >
          <Flex direction="column">
            <Input
              value={newUserAgentAddress}
              placeholder="User agent address"
              onChange={(e) => setNewUserAgentAddress(e.target.value)}
            />
            <Alert status="success" mt="2">
              <AlertDescription fontSize="13">
                Somebody who can perform update / delete operations on{" "}
                {"identity"} wallet.
              </AlertDescription>
            </Alert>
            <Button width="30%" onClick={addNewUserAgent} mt="2">
              Add new agent
            </Button>
          </Flex>
          {addedAgents?.length ? (
            <Flex direction="column" mt="9">
              <MenuSelect
                buttonProps={{
                  variant: "outline",
                }}
                data={addedAgents.map((agent) => ({
                  value: agent,
                  label: agent,
                }))}
                label="Select agent"
                onTokenSelect={handleAgentSelect}
              />
              <Text fontWeight="bold" style={{ fontSize: 14 }} mt="2">
                Selected agent: {selectedAgent}
              </Text>
              <Button width="30%" onClick={removeUserAgent} mt="2">
                Remove agent
              </Button>
            </Flex>
          ) : (
            <></>
          )}
        </Flex>
      </Flex>
      <Flex direction="column" width="90%" mt="8">
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
    </>
  );
}
