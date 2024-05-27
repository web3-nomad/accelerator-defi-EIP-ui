import { useEffect, useState } from "react";
import {
  hederaVaultAddress,
  readHederaVaultAsset,
  readHederaVaultAssetTotalSupply,
  readHederaVaultBalanceOf,
  readHederaVaultDecimals,
  readHederaVaultMaxMint,
  readHederaVaultOwner,
} from "@/services/contracts/wagmiGenActions";
import { VaultInfo } from "@/components/eip4626/user/VaultInfo";
import { EvmAddress } from "@/types/types";
import { VaultDeposit } from "@/components/eip4626/user/VaultDeposit";
import { Divider } from "@chakra-ui/react";
import { VaultWithdraw } from "@/components/eip4626/user/VaultWithdraw";
import DeployedVaultsList from "@/components/eip4626/user/DeployedVaultsList";

export default function User() {
  useEffect(() => {
    readHederaVaultAsset({}).then((res) => {
      console.log("vault asset", res.toString());
    });

    readHederaVaultAssetTotalSupply({}).then((res) => {
      console.log("vault total supply", res.toString());
    });

    readHederaVaultDecimals({}).then((res) => {
      console.log("vault decimals", res.toString());
    });

    readHederaVaultOwner({}).then((res) => {
      console.log("vault owner", res.toString());
    });
  }, []);

  //@TODO add vault switching functionality or show as the list
  const [vaultAddress, setVaultAddress] = useState(
    hederaVaultAddress as EvmAddress,
  );

  return (
    <>
      <VaultInfo vaultAddress={vaultAddress} />
      <Divider my={10} />
      <VaultDeposit vaultAddress={vaultAddress} />
      <Divider my={10} />
      <VaultWithdraw vaultAddress={vaultAddress} />
      <Divider my={10} />
      <DeployedVaultsList />
    </>
  );
}
