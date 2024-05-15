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
      WIP
      <VaultInfo vaultAddress={vaultAddress} />
    </>
  );
}
