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
import { TokenNameItem, UpdateCountryProps } from "@/types/types";
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

export function ManageTokensList() {
  const [_addedAgents, setAddedAgents] = useState([] as Array<string>);
  const [ownTokens, setOwnTokens] = useState([] as Array<TokenNameItem>);
  const [updateTxResult, setUpdateTxResult] = useState<string>();
  const [updateTxError, setUpdateTxError] = useState<string>();
  const { deployedTokens } = useContext(Eip3643Context);
  const { accountEvm } = useWalletInterface();
  const [selectedToken, setSelectedToken] = useState<TokenNameItem | null>(
    null,
  );
  const [selectedIdentity, setSelectedIdentity] = useState<`0x${string}`>("0x");
  const [newIdentityAddress, setNewIdentityAddress] = useState<string>();
  const [newUserAgentAddress, setNewUserAgentAddress] = useState<string>();
  const { registry, registryAgents } = useTokenIdentityRegistry(selectedToken);
  const { walletInterface } = useWalletInterface();
  const { mutateAsync: mutateDeleteIdentity } = useMutation({
    mutationFn: async () => {
      return writeIdentityRegistryDeleteIdentity(
        walletInterface as WalletInterface,
        { args: [selectedIdentity] },
        registry as `0x${string}`,
      );
    },
  });
  const { mutateAsync: mutateUpdateIdentityCountry } = useMutation({
    mutationFn: async ({ country }: UpdateCountryProps) => {
      return writeIdentityRegistryUpdateCountry(
        walletInterface as WalletInterface,
        { args: [selectedIdentity, country] },
        registry as `0x${string}`,
      );
    },
  });
  const { mutateAsync: mutateUpdateIdentity } = useMutation({
    mutationFn: async () => {
      return writeIdentityRegistryUpdateIdentity(
        walletInterface as WalletInterface,
        { args: [selectedIdentity, newIdentityAddress as `0x${string}`] },
        registry as `0x${string}`,
      );
    },
  });
  const { mutateAsync: mutateIdentityRegistryAddAgent } = useMutation({
    mutationFn: async () => {
      return writeIdentityRegistryAddAgent(
        walletInterface as WalletInterface,
        { args: [newUserAgentAddress as `0x${string}`] },
        registry as `0x${string}`,
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

  const handleTokenSelect = (tokenAddr: string | number) => {
    setSelectedToken(
      ownTokens.find((tok) => tok.address === (tokenAddr as string)) || null,
    );
  };

  const handleIdentitySelect = (value: string | number) => {
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

  const handleUpdateIdentityCountry = async (value: string | number) => {
    try {
      const txHash = await mutateUpdateIdentityCountry({
        country: value as number,
      });
      setUpdateTxResult(txHash);
      setUpdateTxError(undefined);
    } catch (err: any) {
      setUpdateTxError(err);
      setUpdateTxResult(undefined);
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
    // TODO: find out why this event does not working
    if (registry) {
      const unsubAgentAdded: WatchContractEventReturnType =
        watchIdentityRegistryAgentAddedEvent({
          onLogs: (data) => {
            setAddedAgents(((prev: any) => {
              return [...prev, ...data];
            }) as any);
          },
        });
      return () => {
        unsubAgentAdded();
      };
    }
  }, [registry]);

  return (
    <Flex direction="column">
      <Flex direction="column" width="50%">
        <MenuSelect
          data={ownTokens.map((tok) => ({
            value: tok.address,
            label: tok.name,
          }))}
          label="Select tokens to manage identities"
          onTokenSelect={handleTokenSelect}
        />
        <Box mt="4">
          <MenuSelect
            data={registryAgents.map((identity) => ({
              value: identity,
              label: identity,
            }))}
            label="Select identity wallet to manage"
            onTokenSelect={handleIdentitySelect}
          />
        </Box>
        {selectedIdentity && (
          <Flex direction="column" mt="6">
            <Text fontWeight="bold">
              Selected identity wallet: {selectedIdentity}
            </Text>
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
          </Flex>
        )}
      </Flex>
      <Flex mt="6" direction="column" width="50%">
        <Text fontWeight="bold">Add new agent to identity registry</Text>
        <Input
          value={newUserAgentAddress}
          placeholder="User agent address"
          onChange={(e) => setNewUserAgentAddress(e.target.value)}
        />
        <Button width="30%" onClick={addNewUserAgent} mt="2">
          Submit agent
        </Button>
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
    </Flex>
  );
}
