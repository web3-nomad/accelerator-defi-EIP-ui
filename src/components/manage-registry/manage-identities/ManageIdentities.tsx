import { Button, Flex, Input, Box } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { ethers } from "ethers";
import { EvmAddress, UpdateIdentityCountryProps } from "@/types/types";
import { MenuSelect } from "@/components/MenuSelect";
import {
  writeIdentityRegistryDeleteIdentity,
  writeIdentityRegistryUpdateCountry,
  writeIdentityRegistryUpdateIdentity,
} from "@/services/contracts/wagmiGenActions";
import { useWalletInterface } from "@/services/wallets/useWalletInterface";
import { WalletInterface } from "@/services/wallets/walletInterface";
import { GroupBase } from "react-select";
import { useReadIdentityRegistryInvestorCountry } from "@/hooks/eip3643/useReadIdentityRegistryInvestorCountry";

export const investorCountriesItems = [
  {
    value: 840,
    label: "US",
  },
  {
    value: 0,
    label: "Non US",
  },
];

type ManageIdentitiesProps = {
  setUpdateTxResult: (res?: string) => void;
  setUpdateTxError: (err?: string) => void;
  onClose: () => void;
  registry?: EvmAddress;
  selectedIdentity?: {
    walletAddress: EvmAddress;
    identityAddress: EvmAddress;
  };
};

export function ManageIdentities({
  setUpdateTxError,
  setUpdateTxResult,
  registry,
  selectedIdentity,
  onClose,
}: ManageIdentitiesProps) {
  const [selectedCountryValue, setSelectedCountryValue] = useState<{
    value: number;
    label: string;
  }>();
  const [newIdentityAddress, setNewIdentityAddress] = useState<string>();
  const { data: identityRegistryInvestorCountry } =
    useReadIdentityRegistryInvestorCountry(
      registry as EvmAddress,
      selectedIdentity?.walletAddress as EvmAddress,
    );
  const { walletInterface } = useWalletInterface();

  const {
    mutateAsync: mutateDeleteIdentity,
    isPending: isDeleteIdentityPending,
  } = useMutation({
    mutationFn: async () => {
      return writeIdentityRegistryDeleteIdentity(
        walletInterface as WalletInterface,
        { args: [selectedIdentity?.walletAddress as EvmAddress] },
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
        { args: [selectedIdentity?.walletAddress as EvmAddress, country] },
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
            selectedIdentity?.walletAddress as EvmAddress,
            newIdentityAddress as EvmAddress,
          ],
        },
        registry as EvmAddress,
      );
    },
  });

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
    const selectedCountry = investorCountriesItems.find(
      (country) => country.value === Number(value),
    );
    setSelectedCountryValue(selectedCountry);
  };

  const handleUpdateCountry = async () => {
    try {
      const txHash = await mutateUpdateIdentityCountry({
        country: Number(selectedCountryValue?.value),
      });
      setUpdateTxResult(txHash);
      setUpdateTxError(undefined);
    } catch (err: any) {
      setUpdateTxError(err.message);
      setUpdateTxResult(undefined);
    }
    onClose();
  };

  useEffect(() => {
    if (identityRegistryInvestorCountry) {
      setSelectedCountryValue(
        investorCountriesItems.find(
          (country) =>
            country.value ===
            Number(identityRegistryInvestorCountry?.toString()),
        ),
      );
    }
  }, [identityRegistryInvestorCountry]);

  return (
    <Flex direction="column" gap="7" pb="6">
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
      <Flex direction="row" gap="2">
        <Box width="70%">
          <MenuSelect
            data={
              investorCountriesItems as unknown as GroupBase<string | number>[]
            }
            selectedValue={selectedCountryValue}
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
      <Flex>
        <Button
          width="50%"
          onClick={handleDeleteIdentity}
          isLoading={isDeleteIdentityPending}
        >
          Remove identity
        </Button>
      </Flex>
    </Flex>
  );
}
